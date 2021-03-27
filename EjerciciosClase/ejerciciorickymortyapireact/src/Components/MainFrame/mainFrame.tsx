import React, {FC, useState, useEffect} from "react"
import axios, {AxiosResponse} from "axios";
import TextComponent from "../Text/text";
import DataFrame from "../dataFrame/dataFrame";

const MainFrame: FC = () =>{
    const [dataLink, setDataLink] = useState<string>("");
    const onClickLink = (link: string) =>{
        setDataLink("" + link);
    }
    return(
        <div>
            <TextComponent click = {onClickLink}/>
            <DataFrame link = {dataLink}/>
        </div>        
    )
}

export default MainFrame;