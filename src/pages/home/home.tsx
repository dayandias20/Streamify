import { useEffect, useState } from 'react';
import axios from 'axios';
import { Genre_Obj, Genre_Template } from '../../components/genres_template';
import { Row_Template } from '../../components/row_template';
import { Carousel } from '../../components/carousel';
import { People_Row_Template } from '../../components/people_row_template';
import Loading from '../../components/loading';
import '../pages.css';

export const Home = () => {
    
    const MOVIES_URL: string = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    // const GENRES_URL: string = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const TRENDING_URL: string = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
    // const TRENDING_MOVIES_URL: string = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const TRENDING_TV_SHOWS_URL: string = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
    const TRENDING_PEOPLE: string = 'https://api.themoviedb.org/3/trending/person/day?language=en-US';

    const [ moviedata, setMoviedata ] = useState([]);
    // const [ genres, setGenres ] = useState<Genre_Obj[]>([]);
    const [ trending, setTrending ] = useState([]);
    const [ trendingTvShows, setTrendingTvShows ] = useState([]);
    const [ trendingPeople, setTrendingPeople ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
  
    const fetchAll = async() => {
      setIsLoading(true);
      try{
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWM5NjQ2ZTc0ZmI3ZjM5ZmJiZTYxZjZjYjk0MjMxYiIsInN1YiI6IjYwMWMxYjc0Yjk3NDQyMDAzYzI2OWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wTICqTO-n5JAftANQ5xtZRHecHSj4CeKcQmXsiH2fSU'
        };
        const requestConfig = { 
          headers: headers
        }
        const movie_list = axios.get(MOVIES_URL, requestConfig);
        // const genre_list = axios.get(GENRES_URL, requestConfig);
        const trending_list = axios.get(TRENDING_URL,requestConfig);
        const trending_tv_list = axios.get(TRENDING_TV_SHOWS_URL, requestConfig);
        const trending_people_list = axios.get(TRENDING_PEOPLE, requestConfig);

        const [ response_movies, response_trending, response_trending_tv, response_trending_people ] = await Promise.all([ movie_list, trending_list, trending_tv_list, trending_people_list ]);

        setMoviedata(response_movies.data.results);
        // setGenres(response_genres.data.genres); 
        setTrending(response_trending.data.results);
        setTrendingTvShows(response_trending_tv.data.results);
        setTrendingPeople(response_trending_people.data.results);
        
        console.log(response_trending_people.data.results);
      }
      catch(error){
        console.error(error);
      }
      setIsLoading(false);
    }
      useEffect(() => {
        fetchAll();
      },[]);

    return (
      <div style={{ width:"100%" }}> 
        <div className='row row-cols-1'>
          <Carousel></Carousel>
            <br></br> 
            
            <div className='container row-background'>
            {
              isLoading ? (<Loading/>) : (<Row_Template trending_item={trending} type="movie"></Row_Template>)
            }
            </div>
            
            <br /><br />

            <div className='container row-background'>
              {
                isLoading ? (<Loading/>) : (<Row_Template trending_item={trendingTvShows} type="tv"></Row_Template>)
}
            </div>
            <br /><br />

            <div className='container row-background'>
              {
                isLoading ? (<Loading/>) : (<People_Row_Template items={trendingPeople} type="people"></People_Row_Template>)
              }
            </div>
            <br />
            
        </div>
      </div>
        
      
    );

}

