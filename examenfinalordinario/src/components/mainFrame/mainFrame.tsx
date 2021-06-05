import React, {FC, useState} from "react";
import SearchFrame from "../searchFrame/searchFram"

const MainFrame: FC<{}> = () => {
    const [searchValue, setSearchValue] = useState<string>("")
    const [search, setSearch] = useState<boolean>(false)
    return(
        <div>
            <div>
                <input type="text" value={searchValue} onChange={(e) => [setSearchValue(e.target.value), setSearch(false)]} placeholder="Search quote by character name"/>
                <button onClick={(e) => setSearch(true)}>Search</button>
            </div>
            <div>
                {search && <SearchFrame characterS={searchValue} search={search}/>}
            </div>
        </div>
    )
}

export default MainFrame
