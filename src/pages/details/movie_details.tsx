import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Movie_Details {
    name : string;
    original_title: string;
    genre_name: string;
    poster_path: string;
    release_date: string;
    overview: string;
}

export const Movie_Details = () => {

    const{ id, type } = useParams();
    console.log(id)

    const [ movieDetails, setMovieDetails ] = useState<Movie_Details | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/${type}/${id}`;
    const TV_DETAILS_URL = `https://api.themoviedb.org/3/${type}/${id}`;
    
    console.log(type);
    let get_url:string;

    if(type==='movie'){
        get_url = MOVIE_DETAILS_URL;
    }
    else if(type==='tv'){
        get_url = TV_DETAILS_URL;
    }
    else if(type==='search'){
        get_url = `https://api.themoviedb.org/3/movie/${id}`;
    }
    else{
        get_url = `https://api.themoviedb.org/3/movie/${id}`;
    }
    
    const get_movie_details = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(get_url, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWM5NjQ2ZTc0ZmI3ZjM5ZmJiZTYxZjZjYjk0MjMxYiIsInN1YiI6IjYwMWMxYjc0Yjk3NDQyMDAzYzI2OWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wTICqTO-n5JAftANQ5xtZRHecHSj4CeKcQmXsiH2fSU'
                }
            });
            setMovieDetails(response.data);
            console.log(response.data);
        }
        catch(error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        get_movie_details();
    }, [id]);

    return (
        <div>
            <br />
            <div className='text-center mt-4 mb-4 banner'><h1>{type?.toUpperCase()} Details Page</h1></div>
            
            <div className='container d-flex justify-content-center'>
            <div className="card" style={{width: '50%'}}>
            <img src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`} alt={movieDetails?.name} className="movie-card__image" />
                <div className="card-body">
                    <h2 className="card-title">{movieDetails?.original_title}</h2>
                    <p className="card-text">Release Date: {movieDetails?.release_date}</p>
                    <p className="card-text">{movieDetails?.overview}</p>
                </div>
            </div>
            </div>
        </div>
    );
}