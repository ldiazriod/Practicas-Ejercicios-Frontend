import React, {FC, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import "./dataFrame.css";


interface IDataFrameProps{
    links: string;
    types: string;
}

interface IPeople{
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

interface IPlanets{
    name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	population: string;
}

interface IFilms{
    created: string;
    director: string;
    edited: string;
    episode_id: string;
    producer: string;
    release_date: string;
    title: string;
}

interface IDataType{
    count: number;
    next: string;
    previous: string;
    results: [IPeople]
}

//Dibujar lo que quiero. Evitar bucles infitinos. 

const DataFrame: FC<IDataFrameProps> = (props) =>{
    const [dataLink1, setDataLink1] = useState<AxiosResponse[]>([]);
    const [toSearch, setToSearch] = useState<string>("");
    const [searchType, setSearchType] = useState<boolean>(false);
    const [searchType2, setSearchType2] = useState<boolean>(false);
    const [displayMode, setDisplayMode] = useState<number>(0);

    useEffect(() =>{
        setDataLink1([])
        setSearchType(false);
        const aux1 = async(myLink: string) =>{
            const response = await axios.get(myLink)
            const data: AxiosResponse = await response;
            if(data !== null){
                if(displayMode === 0){
                    setDataLink1((elem) => [...elem, data]);
                }else{
                    let typeOfSort: number = 0;
                    if(displayMode === 1){
                        typeOfSort = 1;
                    }else if(displayMode === 2){
                        typeOfSort = -1;
                    }else{
                        console.log("Oh no...");
                    }
                    const sorted = data.data.results.sort((a: {[key: string]:string}, b: {[key:string]:string}) => {
                        let aU: string = "";
                        let bU: string = "";
                        if(props.types === "people" || props.types === "planets"){
                            aU = a.name.toLowerCase();
                            bU = b.name.toLowerCase();
                        }else if(props.types === "films"){
                            aU = a.title.toLowerCase();
                            bU = b.title.toLowerCase();
                        }else{
                            console.log("Oh no...")
                        }
                        if(aU < bU){
                            return (typeOfSort - (typeOfSort * 2));
                        }
                        if(aU > bU){
                            return typeOfSort;
                        }
                        return 0;
                    })
                    const aux: AxiosResponse = {
                        config: data.config,
                        data: {
                            count: data.data.count,
                            next: data.data.next,
                            previous: data.data.previous,
                            results: sorted
                        },
                        headers: data.headers,
                        request: data.request,
                        status: data.status,
                        statusText: data.statusText
                    }
                    setDataLink1((elem) => [...elem, aux]);               
                }
            }
            if(data.data.next !== null){
                aux1(data.data.next);
            }else{
                if(displayMode === 1){

                }
            }
        }
        if(searchType2){
            const clearId = setTimeout(() => {              
                aux1(props.links + `?search=${toSearch}`)
            }, 1000);
            return () => clearTimeout(clearId);
        }else{
            aux1(props.links);
        }
    }, [props.links, toSearch, displayMode]);

    const displayAll = () => {
        if(props.types === "people"){
            return(
                <div className="cardFrame">
                    {
                        dataLink1.map((elem) => elem.data.results.map((elem2:IPeople) => 
                            (
                                <div className="singleCard">
                                    <strong>Name:       </strong> {elem2.name} <br/>
                                    <strong>Height:     </strong> {elem2.height} <br/>
                                    <strong>Mass:       </strong> {elem2.mass} <br/>
                                    <strong>Hair color: </strong> {elem2.hair_color} <br/>
                                    <strong>Skin color: </strong> {elem2.skin_color} <br/>
                                    <strong>Eye color:  </strong> {elem2.eye_color} <br/>
                                    <strong>Birth year: </strong> {elem2.birth_year} <br/>
                                    <strong>Gender:     </strong> {elem2.gender} <br/>
                                </div>
                            )))
                    }
                </div>
            )
        }else if(props.types === "planets"){
            return(
                <div className="cardFrame">
                     {
                        dataLink1.map((elem) => elem.data.results.map((elem2:IPlanets) => 
                            (
                                <div className="singleCard">
                                    <strong>Name:            </strong> {elem2.name} <br/>
                                    <strong>Rotation period: </strong> {elem2.rotation_period} <br/>
                                    <strong>Orbital period:  </strong> {elem2.orbital_period} <br/>
                                    <strong>Diameter:        </strong> {elem2.diameter} <br/>
                                    <strong>Climate:         </strong> {elem2.climate} <br/>
                                    <strong>Gravity:         </strong> {elem2.gravity} <br/>
                                    <strong>Terrain:         </strong> {elem2.terrain} <br/>
                                    <strong>Surface Water:   </strong> {elem2.surface_water} <br/>
                                    <strong>Population:      </strong> {elem2.population} <br/>
                                </div>
                            )))
                    }
                </div>
            )
        }else if(props.types === "films"){
            return(
                <div className="cardFrame">
                    {
                        dataLink1.map((elem) => elem.data.results.map((elem2:IFilms) => 
                            (
                                <div className="singleCard">
                                   <strong>Title:        </strong> {elem2.title} <br/>
                                   <strong>Director:     </strong> {elem2.director} <br/>
                                   <strong>Producer:     </strong> {elem2.producer} <br/>
                                   <strong>Episode id:   </strong> {elem2.episode_id} <br/>
                                   <strong>Created:      </strong> {elem2.created} <br/>
                                   <strong>Edited:       </strong> {elem2.edited} <br/>
                                   <strong>Release date: </strong> {elem2.release_date} <br/>
                                </div>
                            )))
                    }
                </div>
            )
        }else{
            return(
                <div>
                    Oh no...
                </div>
            )
        }
    }

    const waitOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToSearch(e.target.value)
    }

    const onChangeSetState = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === ""){
            setSearchType2(false);
        }else{
            setSearchType2(true)
        }
    }

    //console.log(dataLink1)

    return (
        <div className="dataFrame">
            <div className="searchMode">
                <button onClick={(e) => setDisplayMode(0)}>Default</button>
                <button onClick={(e) => setDisplayMode(1)}>A-Z</button>
                <button onClick={(e) => setDisplayMode(2)}>Z-A</button>
                <button onClick={(e) => [setSearchType(true), setSearchType2(false)]}> View All</button>
                <input type="text" onChange={(e) => [waitOnChange(e), onChangeSetState(e)]}/>
            </div>
            {searchType && displayAll()}
            {searchType2 && displayAll()}
        </div>
    )
}

export default DataFrame;