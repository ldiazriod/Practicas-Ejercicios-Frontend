import React, {FC, useState} from "react";
import "./bookFrame.css"

interface IBook{
    title       : string;
    cover_i     : string;
    id_amazon?  : string[];
    author_name : string[];
    publish_year: number[];
}

interface IProp{
    book: IBook
    typeOfSearch: boolean
}

const BookFrame:FC<IProp> = (props) => {
    if(props.typeOfSearch){
        return(
            <div className="singleCardFrame">
                <div className="cardImg">
                    <img src={`${process.env.REACT_APP_API_COVER_URL}/${props.book.cover_i}-S.jpg`} alt="image not found"/>
                </div>
                <div>
                    <strong>Title: </strong>{props.book.title}
                </div>
                <div>
                    <strong>Author: </strong>{props.book.author_name?.[0]}
                </div>
                <div>
                    <strong>Publish year: </strong>{props.book.publish_year?.[0]}
                </div>
                {props.book.id_amazon && 
                        <button><a href={`${process.env.REACT_APP_AMAZAON_URL}/${props.book.id_amazon[0]}`} target="_blank">Amazon</a></button>
                    }
            </div>
        )
    }else{
        return(
            <div className="rowData">
                <div>
                    <strong>Title: </strong>{props.book.title}
                </div>
                <div>
                    <strong>Author: </strong>{props.book.author_name?.[0]}
                </div>
                <div>
                    <strong>Publish year: </strong>{props.book.publish_year?.[0]}
                </div>
                    {props.book.id_amazon && 
                        <button><a href={`${process.env.REACT_APP_AMAZAON_URL}/${props.book.id_amazon[0]}`} target="_blank">Amazon</a></button>
                    }
            </div>
        )
    }
}

export default BookFrame;