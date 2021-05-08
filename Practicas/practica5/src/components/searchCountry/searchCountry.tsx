import React, {FC} from "react";
import {gql, useQuery} from "@apollo/client";
import styled from "@emotion/styled";

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
    const {data, loading, error} = useQuery<ICountries>(COUNTRIES)
    if(error){
        console.log(error)
    }
    console.log(data)
    return(
        <CountryContainer>
            {data?.countries.map((elem) => {
                return <Country>
                    <div>{elem.name}</div>
                    <div><strong>Population:</strong> {elem.population}</div>
                    <ClickableCapital><strong>Capital:</strong> {elem.capital?.name}</ClickableCapital>
                    <div><strong>Lenguajes:</strong> <br />{elem.languages.map((elem2) => {
                        return <div>
                            {elem2.name}
                        </div>
                        })}
                    </div>
                    <div><strong>Continent:</strong> {elem.continent.name}</div>
                    <div><strong>Currencies:</strong> <br />{elem.currencies.map((elem3) => {
                        return <div>
                            {elem3.name}
                        </div>
                        })}
                    </div>
                </Country>
            })}
        </CountryContainer>
    )
}

export default ReturnCountries;

const ClickableCapital = styled.div`
    color: black; 
    &:hover{
        color: green
    }
`
const Country = styled.div`
    width: 300px;
    border-radius: 5px;
    background-color: rgba(128, 128, 128, 0.308);
    color: black;
`

const CountryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 20px;
    padding: 20px;
`