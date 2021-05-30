import React, {FC, useState, useEffect} from "react";
import {gql, useQuery} from "@apollo/client";
import axios from "axios";
import styled from "@emotion/styled";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import ReturnCities from "../searchCity/searchCity"
import "bootstrap/dist/css/bootstrap.min.css";

interface IProps{
    searchElem: string,
    toDisplay : boolean,
}

interface ICountries {
    countries: Array<ICountry>,
}

interface ICountry{
    name: string,
    alpha2Code: string;
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

interface IWeather {
    weather: Array<{
        description: string
    }>
    main: {
        temp: number
    }
}

const ReturnCountries: FC<IProps> = (props) => {
    const [dropDownDisplay, setDropDownDisplay] = useState<boolean>(false);
    const [dropDownDisplay2, setDropDownDisplay2] = useState<boolean>(false);
    const [weatherData, setWeatherData] = useState<IWeather|undefined>(undefined);
    const COUNTRIES = gql`
    query MyQuery {
        countries(where: {name: {eq: "${props.searchElem}"}}) {
            name
            alpha2Code
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
    useEffect(() => {
        axios.get<IWeather>(`${process.env.REACT_APP_API2_URL}=${props.searchElem}&appid=${process.env.REACT_APP_API2_KEY}`)
        .then((response) => {
            setWeatherData(response.data);
        })
    }, [props.searchElem])

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
    if(props.toDisplay){
        return(
            <div>
                {data?.countries.map((elem) => {
                    return <div>
                        <div>{elem.name}</div>
                        <div><strong>Population: </strong>{elem.population}</div>
                        <div><strong>Capital: </strong>{elem.capital?.name}</div>
                        <div><strong>Capital Weather: </strong> <br/>
                            <strong>Temp: </strong>{weatherData && (weatherData?.main.temp - 273.15).toFixed()} °C<br/>
                            <strong>Description: </strong> {weatherData && weatherData.weather.map((elem2) => {
                                return <div>
                                    {elem2.description}
                                </div>
                            })}
                        </div>
                        <div><strong>Lenguages: </strong><br />{elem.languages.map((elem2) => {
                            return <div>
                                {elem2.name}
                            </div>
                        })}
                        </div>
                        <div><strong>Currencies: </strong><br />{elem.currencies.map((elem3) => {
                            return <div>
                                {elem3.name}
                            </div>
                        })}</div>
                        <div><strong>Continent: </strong>{elem.continent.name}</div>
                        <div><img src={`https://www.countryflags.io/${elem.alpha2Code}/shiny/64.png`} /></div>
                    </div>
                })}
            </div>
        )
    }else{
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
                            <DropdownItem><strong> Capital Weather: </strong> <br/>
                                <strong>Temp: </strong>{weatherData && (weatherData?.main.temp - 273.15).toFixed()} °C<br/>
                                <strong>Description: </strong> {weatherData && weatherData.weather.map((elem2) => {
                                return <div>
                                    {elem2.description}
                                </div>
                            })}</DropdownItem>
                            <DropdownMenu>
                                <DropdownItem>{<ReturnCities searchElem={elem.capital?.name} toDisplay={true}/>}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <DropdownItem><strong>Lenguajes: </strong> {elem.languages.map((elem2) => {
                            return <DropdownItem>{elem2.name}</DropdownItem>
                        })}</DropdownItem>
                        <DropdownItem><strong>Continent:</strong> {elem.continent.name}</DropdownItem>
                        <DropdownItem><strong>Currencies:</strong> <br /> {elem.currencies.map((elem3) => {
                            return <DropdownItem>{elem3.name}</DropdownItem>
                        })}</DropdownItem>
                        <DropdownItem><img src={`https://www.countryflags.io/${elem.alpha2Code}/shiny/64.png`} /></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                })}
            </CountryContainer>
        )
    }
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