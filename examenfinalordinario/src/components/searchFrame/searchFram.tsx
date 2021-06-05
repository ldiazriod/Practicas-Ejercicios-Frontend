import React, {FC, useEffect, useState} from "react"
import axios from "axios"
import gollumNotFound from "../../Assets/notFoundGollum.jpg"

interface IProps{
    characterS: string
    search: boolean
}

interface IQuote {
    dialog: string
    movie: string
}

interface IQuotes{
    docs: Array<IQuote>
}

interface IMovie{
    name: string;
}

interface IMovies{
    docs: Array<IMovie>
}

interface ICharacter{
    _id: string
}

interface ICharacters{
    docs: Array<ICharacter>
}


//https://the-one-api.dev/v2/quote?sort=Gandalf:desc
//`https://the-one-api.dev/v2/quote?sort=${props.characterS}:desc`


const SearchFrame : FC<IProps> = (props) => {
    const [data, setData] = useState<IQuote | undefined>(undefined)
    const [dataM, setDataM] = useState<IMovie | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false);
    //const [data2, setData2] = useState<IMovies | undefined>(undefined)

    useEffect(() => {
        if(props.search){
            setLoading(true)
            axios.get<ICharacters>(`${process.env.REACT_APP_API_URL}?name=${props.characterS}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: process.env.REACT_APP_API_KEY
                }
            }).then((response) => {
                if(response.data.docs[0] !== undefined){
                    axios.get<IQuotes>(`${process.env.REACT_APP_API_URL}/${response.data.docs[0]._id}/quote`, {
                        headers: {
                            Accept: "application/json",
                            Authorization: process.env.REACT_APP_API_KEY
                        }
                    }).then((response) => {
                        setLoading(true)
                        const random = Math.floor(Math.random() * response.data.docs.length)
                        setData(response.data.docs[random])
                        axios.get<IMovies>(`${process.env.REACT_APP_API_URL2}/${response.data.docs[random].movie}`, {
                            headers: {
                                Accept: "application/json",
                                Authorization: process.env.REACT_APP_API_KEY
                            }
                        }).then((response) => {
                            setDataM(response.data.docs[0])
                            setLoading(false)
                        })
                    })
                }else{
                    setLoading(false)
                    setData(undefined)
                }
            })
        }
        console.log(data?.dialog)
        //console.log(props.characterS)
    }, [props.search])

    return (
        <div>
            <div>
                {loading && "...Loading"}
            </div>
            <div>
                {data && !loading && <div>
                    <strong>Quote: </strong> {data.dialog}   
                </div>}
                {dataM && !loading && <div> 
                    <strong>Film: </strong> {dataM.name}
                </div>}
                {!data?.dialog && !loading && <img src={gollumNotFound}/>}
            </div>
        </div>
    )
}

export default SearchFrame