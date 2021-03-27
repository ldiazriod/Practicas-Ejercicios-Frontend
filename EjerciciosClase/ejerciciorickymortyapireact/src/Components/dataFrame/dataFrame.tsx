import React, {FC, useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";

interface IDataFrameProps{
    link: string;
}

interface ICharacter{
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
    image: string;
}

const DataFrame: FC<IDataFrameProps> = (props) =>{
    const [dataLink, setDataLink] = useState<AxiosResponse>();
    const [actualLink, setActualLink] = useState<string>("");

    useEffect(() => {
        axios.get(actualLink).then((response) => {
            setDataLink(response)
        })
    }, [actualLink]);

    if(dataLink){
        dataLink.data.results.forEach((elem:ICharacter) => {
            console.log(elem)
        })
        setActualLink(dataLink.data.info.next);
    }else{
        setActualLink(props.link)
    }

    return(
        <div></div>
    )
}

export default DataFrame;