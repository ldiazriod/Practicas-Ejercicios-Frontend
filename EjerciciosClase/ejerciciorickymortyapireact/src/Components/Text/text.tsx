import React, {FC, useEffect, useState} from "react";
import axios, { AxiosResponse } from "axios";

interface ITextProps{
    click: Function;
}

const TextComponent: FC<ITextProps> = (props) => {
    const [data, setData] = useState<AxiosResponse>();
    useEffect(() => {
        axios.get("https://rickandmortyapi.com/api").then((response) => {
            setData(response);
        })
    }, []);

    console.log(data);
    return (
        <div>
            {!data && "Loading..."}
            {data && (
                <div>
                    <div onClick={(e) => props.click(data.data.characters)}>{data.data.characters}</div>
                    <div onClick={(e) => props.click(data.data.episodes)}>{data.data.episodes}</div>
                    <div onClick={(e) => props.click(data.data.locations)}>{data.data.locations}</div>
                </div>    
            )}
        </div>
    );
}

export default TextComponent;