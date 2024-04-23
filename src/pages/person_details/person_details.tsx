import { Link, useParams } from 'react-router-dom';
// import '/App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PiStarDuotone } from "react-icons/pi";

interface Movie {
    id: number;
    original_title: string;
    popularity:number;
    overview: string;
    media_type: string;
    release_date:string;
    poster_path:string
}
export interface Person {
    known_for: [Movie];
    id: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}
export const Person_Details = () => {

    const { personName } = useParams();
    const [ person, setPerson ] = useState<Person>();

    const GET_ACTOR_URL = `https://api.themoviedb.org/3/search/person?query=${personName}&include_adult=false&language=en-US&page=1`;

    const fetchActor = async () => {
        try{
            const headers = {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWM5NjQ2ZTc0ZmI3ZjM5ZmJiZTYxZjZjYjk0MjMxYiIsInN1YiI6IjYwMWMxYjc0Yjk3NDQyMDAzYzI2OWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wTICqTO-n5JAftANQ5xtZRHecHSj4CeKcQmXsiH2fSU'
            };
            const requestConfig = { 
              headers: headers
            }
            const response = await axios.get(GET_ACTOR_URL, requestConfig);
            setPerson(response.data.results[0]);
            console.log("Person : ", person);
        }
        catch(error) {
            console.error(error);
        }
        
    }

    useEffect(()=> {
        fetchActor();
    }, []);

    return(
        <>
            <br />
            <div className='container'>
                <div className='row row-col-1 row-cols-md-1 row-cols-lg-1 g-4'>
                    <div className="text-center mt-4 mb-4 banner">
                        <h1> { person?.original_name.toUpperCase() } </h1>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w300${person?.profile_path}`} />
                        </div>
                        <br />
                        <div className='row row-cols-lg-1'>
                            <PiStarDuotone />
                            <h1>{person?.popularity}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4 ">
                    { person?.known_for.map(item => (
                        <div key={item.id} className="col">
                            <Link to={`${item.media_type}/${item.id}`} className="card-link custom-link" >
                            <div className="card h-100 card-body custom-link">
                                <div className='impose'>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top card-title" alt={item.original_title} />
                                </div>
                                <div className="card-body bg_black">
                                    <h5 className="card-title">{item.original_title}</h5>
                                    <p className="card-text">Release Date: {item.release_date}</p>
                                    <p className="card-text">Popularity: {item.popularity}</p>
                                    <p className='card-text'>{ item.id} </p>
                                </div>
                            </div>
                            </Link> 
                        </div>
                    )) }
                </div>
            </div>

            
        </>
    )
}