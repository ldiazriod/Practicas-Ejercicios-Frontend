import React, {FC} from "react";
import "./carousel.css"
import carousel1 from "../../assets/carousel1.jpg";
import carousel2 from "../../assets/carousel2.jpg";
import carousel3 from "../../assets/carousel3.jpg";
import carousel4 from "../../assets/carousel4.jpg";
import nextButton from "../../assets/nextButton.png";
import prevButton from "../../assets/prevButton.png";

interface ICarouselProps{
    counter: number;
    change : Function;
    click  : Function;
}

const Carousel:FC<ICarouselProps> = (props) => {
    const urls: string[] = [`${carousel1}`, `${carousel2}`, `${carousel3}`, `${carousel4}`]
    return(
        <div className="carousel-flexbox">
            <img src={prevButton} alt="" className="arrows" onClick={(e) => props.change("prev")}/>
            <img src={urls[props.counter]} alt="" className="imageFormat2" onClick={(e) => props.click(urls[props.counter])}/>
            <img src={nextButton} alt="" className="arrows" onClick={(e) => props.change("next")}/>
        </div>
    )   
}

export default Carousel;