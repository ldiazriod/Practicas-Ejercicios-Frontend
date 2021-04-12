import React, {FC, useState} from "react";
import DataFrame from "../dataFrame/dataFrame"
import SearchBar from "../searchBar/searchBar"

const MainFrame: FC = () => {
    const [toSearch, setToSearch] = useState<string>("");
    return(
        <div>
            <SearchBar setSearchP={setToSearch}/>
            <DataFrame toSearch={toSearch}/>
        </div>
    );
}

export default MainFrame