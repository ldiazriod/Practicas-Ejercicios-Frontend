import React, {FC, useState} from "react"

interface ISearchBarProps{
    setSearchP: Function;
}


const SearchBar: FC<ISearchBarProps> = (prop) => {
    const [toSearch, setToSearch] = useState<string>("");

    const setTotalToSearch = (e: string) => {
        let auxE = "http://openlibrary.org/search.json?q=";
        e.split(" ").forEach((elem) => {
            auxE += `${elem}+`
        })
        setToSearch(auxE);
        auxE = "http://openlibrary.org/search.json?q=";
    }

    return(
        <div>
            <input type="text" onChange={(e) => setTotalToSearch(e.target.value)}/>
            <button onClick={prop.setSearchP(toSearch)}>Search</button>
        </div>
    )
}

export default SearchBar;