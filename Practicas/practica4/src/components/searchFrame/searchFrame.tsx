import axios from "axios";
import React, {FC, useState} from "react";
import BookFrame from "../bookFrame/bookFrame"
import ClipLoader from "react-spinners/ClipLoader"
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
    const [dropDownMode, setDropDownMode] = useState<boolean>(false);
    const [dropDownType, setDropDownType] = useState<boolean[]>([true, false, false, false, false])
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

    const changeStateDropDown = () =>{
        setDropDownMode(!dropDownMode)
    }

    return(
        <div className="allComponents">
            <div>
                <input type="text" value={auxSearchValue[0]} onChange={(e) => [setSearchValue(e.target.value), setAuxSearchValue([e.target.value, ""])]} placeholder="Search by title"/>
                <input type="text" value={auxSearchValue[1]} onChange={(e) => [setSearchValue(e.target.value), setAuxSearchValue(["", e.target.value])]} placeholder="Search by author"/>
                <button onClick = {(e) => [search(manageUrl()), setApiPage(1), setPage(0)]}>Buscar</button>
                {searching && <div><ClipLoader color="#0000ff" size="20"/></div>}
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
                </button>)}
            </div>
                <div>
                    <button onClick={(e) => [setTypeOfSearch(true), setClassName("rowsCardsFrame")]}>Cuadrículas</button>
                    <button onClick={(e) => [setTypeOfSearch(false), setClassName("allRowData")]}>Filas</button>
                    <Dropdown isOpen={dropDownMode} toggle={changeStateDropDown} direction="right">
                        <DropdownToggle>
                            Ordenar por
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={(e) => setDropDownType([true, false, false, false, false])}>Estándar</DropdownItem>
                            <DropdownItem onClick={(e) => setDropDownType([false, true, false, false, false])}>Alfabético ascendente</DropdownItem>
                            <DropdownItem onClick={(e) => setDropDownType([false, false, true, false, false])}>Alfabético descendente</DropdownItem>
                            <DropdownItem onClick={(e) => setDropDownType([false, false, false, true, false])}>Año publicación ascendente</DropdownItem>
                            <DropdownItem onClick={(e) => setDropDownType([false, false, false, false, true])}>Año publicación descendente</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div className={`${className}`}>
                        {data && dropDownType[0] && data.docs.slice((page*20)%100, (page*20)%100+20).map((book:IBook) => {
                            return <BookFrame book={book} typeOfSearch={typeOfSearch}/>
                        })}
                        {data && dropDownType[1] && data.docs.slice((page*20)%100, (page*20)%100+20).sort((a: {title:string}, b: {title:string}) => 
                            a.title.localeCompare(b.title)
                        ).map((book:IBook) => {
                            return <BookFrame book={book} typeOfSearch={typeOfSearch}/>
                        })}
                        {data && dropDownType[2] && data.docs.slice((page*20)%100, (page*20)%100+20).sort((a: {title:string}, b: {title:string}) => 
                            b.title.localeCompare(a.title)
                        ).map((book:IBook) => {
                            return <BookFrame book={book} typeOfSearch={typeOfSearch}/>
                        })}
                        {data && dropDownType[3] && data.docs.slice((page*20)%100, (page*20)%100+20).sort((a: {publish_year: number[]}, b: {publish_year:number[]})=> {
                           if(a.publish_year !== undefined && b.publish_year !== undefined){
                               if(a.publish_year[0] > b.publish_year[0]){
                                   return 1
                               }
                               if(a.publish_year[0] < b.publish_year[0]){
                                   return -1
                               }
                               return 0
                           }else{
                               return 0;
                           }
                        }).map((book:IBook) => {
                            return <BookFrame book={book} typeOfSearch={typeOfSearch}/>
                        })}
                        {data && dropDownType[4] && data.docs.slice((page*20)%100, (page*20)%100+20).sort((a: {publish_year: number[]}, b: {publish_year:number[]})=> {
                           if(a.publish_year !== undefined && b.publish_year !== undefined){
                               if(a.publish_year[0] < b.publish_year[0]){
                                   return 1
                               }
                               if(a.publish_year[0] > b.publish_year[0]){
                                   return -1
                               }
                               return 0
                           }else{
                               return 0;
                           }
                        }).map((book:IBook) => {
                            return <BookFrame book={book} typeOfSearch={typeOfSearch}/>
                        })}
                </div>
        </div>
    )
}

export default SearchFrame;

