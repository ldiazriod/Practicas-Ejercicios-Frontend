import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";

interface IProps {
    searchElem: string;
}

interface ICities{
    cities: Array<ICity>
}

interface ICity{
    name: string
    population: number
    country: {
        name: string
    }
    timeZone: {
        name: string
    }
}

const ReturnCities: FC<IProps> = (props) => {
    const CITIES = gql`
    query MyQuery {
        cities(where: {name: {eq: "${props.searchElem}"}}) {
            name
            population
            country {
                name
            }
            timeZone {
                name
            }
        }
    }
`
    const { data, loading, error } = useQuery<ICities>(CITIES)
    if(loading){
        return <div>Charging...</div>
    }
    if(error){
        console.log(error)
        return <div>There has been an error</div>
    }
    return (
        <CityContainer>
            {data?.cities.map((elem) => {
                return <City>
                    <div>{elem.name}</div>
                    <div><strong>Population:</strong> {elem.population}</div>
                    <ClickableCountry><strong>Country:</strong> {elem.country.name}</ClickableCountry>
                    <div><strong>Time zone:</strong> {elem.timeZone?.name}</div>
                </City>
            })}
        </CityContainer>
    )
}

export default ReturnCities;

const ClickableCountry = styled.div`
    color: black; 
    &:hover{
        color: green
    }
`
const City = styled.div`
    width: 300px;
    border-radius: 5px;
    background-color: rgba(128, 128, 128, 0.308);
    color: black;
`

const CityContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 20px;
    padding: 20px;
`

