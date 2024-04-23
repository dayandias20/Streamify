import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { Login } from '../pages/auth/login';
import { Movies } from '../pages/movies/movies';
import { TV_Shows } from '../pages/tv_shows/tv_shows';
import { Movie_Details } from '../pages/details/movie_details';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Item } from './grid_template';
import { Person_Details } from '../pages/person_details/person_details';
import { Search_Page } from '../pages/search/search';
import { useAuth } from '../pages/auth/useAuth';
import '../App.css';

export const Navbar = () => {

    const { user } = useAuth();
    
    const [ searchResults, setSearchResults ] = useState<Item[]>([]);
    const [ searchQuery, setSearchQuery ] = useState('');
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;

    const search = async () => {
        try {
            const headers = {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWM5NjQ2ZTc0ZmI3ZjM5ZmJiZTYxZjZjYjk0MjMxYiIsInN1YiI6IjYwMWMxYjc0Yjk3NDQyMDAzYzI2OWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wTICqTO-n5JAftANQ5xtZRHecHSj4CeKcQmXsiH2fSU'
            };
            const requestConfig = { 
              headers: headers
            }
            const response = await axios.get(SEARCH_URL, requestConfig);
            setSearchResults(response.data.results);
            console.log("Search Results: ", searchResults);
            console.log("Search Query :", searchQuery)
        } catch (error) {
            console.error('Error searching:', error);
        }
        
    };
    // console.log(user?.name);

    useEffect(() => {
        search();
      },[]);

    return(
        <div>
            {/* <Router> */}
                <div className="App">
                    <nav className="navbar navbar-expand-lg" >
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">Streamify</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="nav nav-tabs me-auto mb-2 mb-lg-0">
                                    
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/movies"> Movies </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/tv_shows"> TV Shows </Link>
                                    </li>
                                    <li className="nav-item"> 
                                        {user?.name}
                                    </li>
                                    
                                    { user ? ( 
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login"> Logout </Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login"> Login </Link>
                                        </li>
                                    )}
                                    
                                </ul>
                                <form className="d-flex" role="search" onChange={(e) => {
                                    if (e.target instanceof HTMLInputElement) {
                                        setSearchQuery(e.target.value);
                                    }
                                }} onSubmit={(e)=>{e.preventDefault(); search(); }}>
                                    <input className="form-control me-2" type="search" placeholder="Search Movie" aria-label="Search" value={searchQuery} />
                                    <Link to={`/search/${searchQuery}`}>
                                    <button className="btn btn-outline-success" type="submit" onSubmit={search}
                                    onClick={() => {setSearchQuery("")}}>Search</button>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </nav>
                    
                </div>
        </div>
    );
} 




