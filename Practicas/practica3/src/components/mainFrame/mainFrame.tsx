import React, {FC, useState} from "react";
import DataFrame from "../dataFrame/dataFrame";
import Selector from "../selector/selector";
import './mainFrame.css'

//TODO: ¿Como se van a ver cada elemento? Nombre + Onclick ó Toda la información 

const MainFrame: FC = () =>{

    const [link, setLink] = useState<string>("");
    const [type, setType] = useState<string>("");

    return(
        <div className="mainFrame">
            <div className="textMainFrame">
                <h1>Star Wars Web</h1>
                <p><strong>Made by:</strong> Luis Díaz del Río Delgado</p>
                <p>
                <strong>How to use the web: </strong><br/>
                Press the button that represents what you want to search for. -People, Planets or Films- <br/>
                Press "view all" to se all the data. <br/>
                Type in the search bar if you want to search a specific data. <br/>
                </p>
            </div>
            <Selector links={setLink} type={setType}/>
            {link.length !== 0 && type.length !== 0 && <DataFrame links={link} types={type}/>}
        </div>
    )
}

export default MainFrame;