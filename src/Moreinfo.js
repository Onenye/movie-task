import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useParams, useNavigate} from "react-router-dom"


const Moreinfo = () => {
    const {id}= useParams();
    const navigate = useNavigate();
    const[loading, setloading]=useState(false);
    const[film, setFilm]=useState(null);
    const[error, setError]=useState(null);
    
    
    const fetchData=async (urls) =>{
        const results = await Promise.all(urls.map((url)=>
        axios.get(url)));
        return results.map((res)=> res.data);
    };

    useEffect(() =>{
        

        const getFilmData = async (urls) => {
           try {
                setloading(true)
                const response = await axios.get('https://swapi.dev/api/films/${id}');
                setFilm(response.data);
            

                const [characters, planets, species, starships, vehicles]=
                await Promise.all([
                    fetchData(film.characters),
                    fetchData(film.planets),
                    fetchData(film.species),
                    fetchData(film.starships),
                    fetchData(film.vehicles),
                ]);

                setFilm({
                    ...film,
                    characters,
                    planets,
                    species,
                    starships,
                    vehicles,
                });
                console.log(film)
              } catch (err){
                console.error(err.message);
                setFilm(null);
             } finally{
                setloading(false);
              }
        };


    getFilmData();
    }, [id])

    const handleClick =() =>{
        navigate(-1)
    }
 
  return (
    <div>
        <header>
            <button onClick={handleClick}>Back to list</button>

            <h2>{film.title}</h2>
            <p>Director: {film.director}</p>
            <p>Producer: {film.producer}</p>
        </header>
        <div>
            <h4>Description</h4>
            <p>{film.opening_crawl}</p>
        </div>
        <div>
            <h4>characters</h4>
            <ul>
                {film.characters.map((character) =>(
                    <li key={character.url}>{character.name}</li>
                ))}
            </ul>
        </div>
        <div>
            <h4>Planets</h4>
            <ul>
                {film.planets.map((planet) => (
                <li key={planet.url}>{planet.name}</li>
                ))}
            </ul>
        </div>
        <div>
            <h4>Species</h4>
            <ul>
                {film.species.map((specie) => (
                  <li key={specie.url}>{specie.name}</li>  
                ))}
            </ul>
        </div>
        <div>
        <h4>Starships</h4>
            <ul>
                {film.planets.map((starships) => (
                <li key={starships.url}>{starships.name}</li>
                ))}
            </ul>  
        </div>
        <div>
        <h4>Vehicles</h4>
            <ul>
                {film.vehicles.map((vehicles) => (
                <li key={vehicles.url}>{vehicles.name}</li>
                ))}
            </ul>
        </div>
</div>


)}
export default Moreinfo