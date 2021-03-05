import React, {FC} from "react";
import "./fullImage.css"

interface IFullImageProps{
    url: string;
}

const FullImage:FC<IFullImageProps> = (urlImg) => {
    if(urlImg.url.length !== 0){
        return(
            <div className="fullImage">
                <img src={urlImg.url} className="imageFormat"/>
            </div>
        )
    }else{
        return(
            <div className="fullImageWelcome">
                <div className="myText">
                    <strong>WELCOME!</strong><br/>
                    Select one image from the carousel to see it in full screen. <br/>
                    Made by Luis Díaz del Río Delgado. <br/>
                </div>
            </div>
        )
    }
} 

export default FullImage