import React, {FC, useEffect, useState} from "react"
import axios, {AxiosResponse} from "axios"

interface IDataFrameProps{
    toSearch: string
}

interface IDataBook{
    title: string;
    author_name: string[];
    publish_year: number[];
}

const DataFrame: FC<IDataFrameProps> = (props) => {
    const [data, setData] = useState<IDataBook[]>([]);
    const [lastShow, setLastShow] = useState<number>(0);
    const [pageNun, setPageNum] = useState<number>(1);

    useEffect(() => {
        axios.get(props.toSearch).then((response) => {
            if(response){
                setData(response.data)
            }else{
                return(
                    <div>Oh No... Whe can't find that book</div>
                )
            }
        })
    }, [props.toSearch])

    const pageController = (move: string) => {
        let counter = 0;
        if(move === "Prev"){
            if(pageNun !== 1){
                counter = lastShow-16;
                setPageNum(pageNun + 1)
                return(
                    <div>
                    </div>
                )
            }
        }
    }

    return(
        <div>
            <button onClick={(e) => pageController("Prev")}>Prev</button>
            {`${pageNun}`}
            <button onClick={(e) => pageController("Next")}>Next</button>
            
        </div>
    )
}

export default DataFrame;