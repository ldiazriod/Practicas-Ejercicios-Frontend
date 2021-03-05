import React, {FC, useState} from "react";
import FullImage from "../FullImage/fullImage";
import Carousel from "../Carousel/carousel"
import "./mainFrame.css";


const MainFrame:FC<{}> = () => {
    const [urls, setUrsls] = useState<string>("") //URL that came from Carousel component
    const [counter, setCounter] = useState<number>(0);

    const fillImageOnClick = (url: string) => {
        if(urls.length === 0){
            setUrsls(urls + url);
        }else{
            setUrsls("" + url);
        }
    }

    const changeImageCarouselOnClick = (type: string) =>{
        if(type === "next"){
            if(counter < 3){
                setCounter(counter + 1)
            }else{
                setCounter(0)
            }
        }else{
            if(counter > 0){
                setCounter(counter - 1)
            }else{
                setCounter(3);
            }
        }
    }

    return(
        <div className="mainFrame">
            <FullImage url={urls}/>
            <Carousel counter={counter} change={changeImageCarouselOnClick} click={fillImageOnClick}/>
        </div>
    )
}

export default MainFrame;