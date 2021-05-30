import React, { FC, useState } from "react";
import { from, gql, useQuery } from "@apollo/client";
import axios from "axios";
import styled from "@emotion/styled";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReturnCountries from "../searchCountry/searchCountry"

interface IProps {
    searchElem: string;
    toDisplay : boolean;
}

interface ICities{
    cities: Array<ICity>
}

interface ICity{
    name: string
    population: number
    country: {
        name: string
        alpha2Code: string
    }
    timeZone: {
        name: string
    }
}

const ReturnCities: FC<IProps> = (props) => {
    const [dropDownDisplay, setDropDownDisplay] = useState<boolean>(false);
    const [dropDownDisplay2, setDropDownDisplay2] = useState<boolean>(false);

    const CITIES = gql`
    query MyQuery {
        cities(where: {name: {eq: "${props.searchElem}"}}) {
            name
            population
            country {
                name
                alpha2Code
            }
            timeZone {
                name
            }
        }
    }
`
    const changeDropDownState = () => {
        setDropDownDisplay(!dropDownDisplay);
    }

    const changeDropDownState2 = () => {
        setDropDownDisplay2(!dropDownDisplay2);
    }

    const { data, loading, error } = useQuery<ICities>(CITIES)
    if(loading){
        return <div>Charging...</div>
    }
    if(error){
        console.log(error)
        return <div>There has been an error</div>
    }

    if(props.toDisplay){
        return(
            <div>
                {data?.cities.map((elem) => {
                    return <div>
                        <div>{elem.name}</div>
                        <div><strong>Population: </strong>{elem.population}</div>
                        <div><strong>Country: </strong>{elem.country.name}</div>
                        <div><strong>TimeZone: </strong>{elem.timeZone.name}</div>
                        <div><img src={`https://www.countryflags.io/${elem.country.alpha2Code}/shiny/64.png`}/></div>
                    </div>
                })}
            </div>
        )
    }else{
        return (
            <CityContainer>
                {data?.cities.map((elem) => {
                    return  <Dropdown isOpen={dropDownDisplay} toggle={changeDropDownState} direction="down">
                    <DropdownToggle>
                        {elem.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><strong>Population:</strong> {elem.population}</DropdownItem>
                        <Dropdown isOpen={dropDownDisplay2} toggle={changeDropDownState2} direction="left" >
                            <DropdownToggle style={{backgroundColor: "transparent", color: "black", borderColor:"transparent"}}>
                                <strong>Country: </strong> {elem.country.name}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><ReturnCountries searchElem={elem.country.name} toDisplay={true}/></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <DropdownItem><strong>Time zone:</strong> {elem.timeZone?.name}</DropdownItem>
                        <DropdownItem><img src={`https://www.countryflags.io/${elem.country.alpha2Code}/shiny/64.png`}/></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                })}
            </CityContainer>
        )
    }
}

export default ReturnCities;

const CityContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 20px;
    padding: 20px;
`