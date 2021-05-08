import React, {FC, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import styled from "@emotion/styled";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import ReturnCities from "../searchCity/searchCity"
import "bootstrap/dist/css/bootstrap.min.css";

interface IProps{
    searchElem: string,
}

interface ICountries {
    countries: Array<ICountry>,
}

interface ICountry{
    name: string,
    population: number,
    capital: {
        name: string
    },
    continent: {
        name: string
    },
    languages: Array<{
        name: string
    }>,
    currencies: Array<{
        name: string
    }>,
}


const ReturnCountries: FC<IProps> = (props) => {
    const [dropDownDisplay, setDropDownDisplay] = useState<boolean>(false);
    const [dropDownDisplay2, setDropDownDisplay2] = useState<boolean>(false);
    const COUNTRIES = gql`
    query MyQuery {
        countries(where: {name: {eq: "${props.searchElem}"}}) {
            name
            population
            capital {
                name
            }
            continent {
                name
            }
            languages {
                name
            }
            currencies {
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
    const {data, loading, error} = useQuery<ICountries>(COUNTRIES)
    if(error){
        console.log(error)
    }
    if(loading){
        return <div>Charging...</div>
    }
    return(
        <CountryContainer>
            {data?.countries.map((elem) => {
                return <Dropdown isOpen={dropDownDisplay} toggle={changeDropDownState} direction="down">
                <DropdownToggle>
                    {elem.name}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem><strong>Population:</strong> {elem.population}</DropdownItem>
                    <Dropdown isOpen={dropDownDisplay2} toggle={changeDropDownState2} direction="left" >
                        <DropdownToggle style={{backgroundColor: "transparent", color: "black", borderColor:"transparent"}}>
                        <strong>Capital:</strong> {elem.capital?.name}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <DropdownItem><strong>Lenguajes: </strong> {elem.languages.map((elem2) => {
                        return <DropdownItem>{elem2.name}</DropdownItem>
                    })}</DropdownItem>
                    <DropdownItem><strong>Continent:</strong> {elem.continent.name}</DropdownItem>
                    <DropdownItem><strong>Currencies:</strong> <br /> {elem.currencies.map((elem3) => {
                        return <DropdownItem>{elem3.name}</DropdownItem>
                    })}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            })}
        </CountryContainer>
    )
}

export default ReturnCountries;


const CountryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 20px;
    padding: 20px;
`