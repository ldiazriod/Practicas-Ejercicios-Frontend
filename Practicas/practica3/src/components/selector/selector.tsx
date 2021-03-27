import React, {FC, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import "../selector/selector.css"

interface ISelectorProps{
    links: Function;
    type : Function;
}

const Selector: FC<ISelectorProps> = (props) => {
    const [dataLink, setDataLink] = useState<AxiosResponse>();

    useEffect(()=>{
        axios.get("https://swapi.dev/api/").then((response) =>{
            setDataLink(response)
        })
    }, [])
    
    return(
        <div className="selector">
            <button className="buttonSelector" onClick={(e) => [props.links(dataLink?.data.people), props.type("people")]}>People</button>
            <button className="buttonSelector" onClick={(e) => [props.links(dataLink?.data.planets), props.type("planets")]}>Planets</button>
            <button className="buttonSelector" onClick={(e) => [props.links(dataLink?.data.films), props.type("films")]}>Films</button>
        </div>
    )
}

export default Selector;