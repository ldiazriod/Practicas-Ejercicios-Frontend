import axios from "axios";
import React, {FC, useState} from "react";
import BookFrame from "../bookFrame/bookFrame"
import ClipLoader from "react-spinners/ClipLoader"
import "./searchFrame.css"

interface IBook{
    title       : string;
    cover_i     : string;
    id_amazon?  : string[];
    author_name : string[];
    publish_year: number[];
}

interface IResult{
    numFound: number;
    start   : number;
    docs    : IBook[];
}

const SearchFrame: FC = () => {
    const [searchValue, setSearchValue] = useState<string>(""); // value
    const [className, setClassName] = useState<string>("allRowData")
    const [auxSearchValue, setAuxSearchValue] = useState<string[]>(["",""]) //auxValue
    const [data, setData] = useState<IResult | undefined>(undefined);
    const [searching, setSearching] = useState<boolean>(false);
    const [typeOfSearch, setTypeOfSearch] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [apiPage, setApiPage] = useState<number>(1);

    const search = (url: string) => {
        setSearching(true);
        axios.get<IResult>(encodeURI(`${process.env.REACT_APP_API_URL}?${url}&page=${apiPage}`))
        .then((response) => {
            setData(response.data);
            setSearching(false);
        })
    }

    const manageUrl = () => {
        if(auxSearchValue[0].length === 0){
            return `author=${searchValue}`
        }else{
            return `title=${searchValue}`
        }
    }

    return(
        <div className="allComponents">
            <div>
                <input type="text" value={auxSearchValue[0]} onChange={(e) => [setSearchValue(e.target.value), setAuxSearchValue([e.target.value, ""])]} placeholder="Search by title"/>
                <input type="text" value={auxSearchValue[1]} onChange={(e) => [setSearchValue(e.target.value), setAuxSearchValue(["", e.target.value])]} placeholder="Search by author"/>
                <button onClick = {(e) => [search(manageUrl()), setApiPage(1), setPage(0)]}>Buscar</button>
                {searching && <div><ClipLoader color="#0000ff#" size="20"/></div>}

            </div>
            
            <div>
            {page > 0 && (<button onClick={(e) => setPage(page-1)}>Anterior</button>)}
            {page < data?.numFound! / 20 && (
                <button 
                    onClick={(e) => {
                        setPage(page+1)
                        if(page * 20 > data?.start!){
                            setData(undefined)
                            setApiPage(apiPage+1);
                            search(manageUrl())
                        }
                    }}
                >
                    Siguiente
                </button>)} <br/>
            </div>
                <div>
                    <button onClick={(e) => [setTypeOfSearch(true), setClassName("rowsCardsFrame")]}>Cuadrículas</button>
                    <button onClick={(e) => [setTypeOfSearch(false), setClassName("allRowData")]}>Filas</button>
                </div>

                <div className={`${className}`}>
                        {data && data.docs.slice((page*20)%100, (page*20)%100+20).map((book:IBook) => {
                            return <BookFrame book={book} typeOfSearch={typeOfSearch}/>
                        })}
                </div>
            
        </div>
    )
}



export default SearchFrame;

