import React, {FC, useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReturnCities from "../searchCity/searchCity" 
import ReturnCountries from "../searchCountry/searchCountry"
import styled from "@emotion/styled";

const SearchFrame: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [typeOfSearch, setTypeOfSearch] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false);
    const [dropDownDisplay, setDropDownDisplay] = useState<boolean>(false);

    const changeDropDownState = () => {
        setDropDownDisplay(!dropDownDisplay);
    }

    const displaySearch = () => {
        console.log(typeOfSearch)
        return(
            <div>
                {!typeOfSearch && <ReturnCountries searchElem={searchValue} toDisplay={false}/>}
                {typeOfSearch && <ReturnCities searchElem={searchValue} toDisplay={false}/>}
            </div>
        )
    }

    return(
        <div>
           <div>
               <input type="text" value={searchValue} onChange={(e) => [setSearchValue(e.target.value), setSearch(false)]} placeholder="Buscar por nombre"/>
               <Button onClick={(e) => setSearch(true)}>Buscar</Button>
           </div>
           <Dropdown isOpen={dropDownDisplay} toggle={changeDropDownState} direction="down">
               <DropdownToggle>
                   Search by:
               </DropdownToggle>
               <DropdownMenu>
                   <DropdownItem onClick={(e) => [setTypeOfSearch(false), setSearch(false)]}>Country</DropdownItem>
                   <DropdownItem onClick={(e) => [setTypeOfSearch(true), setSearch(false)]}>City</DropdownItem>
               </DropdownMenu>
           </Dropdown>
           {search && displaySearch()}
        </div>
    )
}

export default SearchFrame;

const Button = styled.button`
    border: 1px solid black;
    background-color: greenyellow;
`