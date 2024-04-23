import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './components.css';

export interface Item {
    genre: string;
    id: number;
    original_title: string;
    release_date: string;
    popularity: number;
    poster_path: string;
    adult: boolean;
  }
interface Props {
    items: Item[];
    type: string
  }

export const Grid_Template: React.FC<Props> = ({ items, type }) => {

    console.log(items);
    const [ moviedata, setMoviedata ] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [ isLoading, setIsLoading ] = useState(false);
    
    const TV_URL = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page}`;
    const MOVIE_URL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;

    let URL :string = MOVIE_URL;

    if(type==='tv') {
        URL = TV_URL;
    }
    const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(URL, {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWM5NjQ2ZTc0ZmI3ZjM5ZmJiZTYxZjZjYjk0MjMxYiIsInN1YiI6IjYwMWMxYjc0Yjk3NDQyMDAzYzI2OWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wTICqTO-n5JAftANQ5xtZRHecHSj4CeKcQmXsiH2fSU'
            }
          });
          setMoviedata(response.data.results);
          console.log(response.data.results);
          console.log(URL)
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      };

    const handleNextPage = () => {
        setPage(page + 1);
      };
      const handlePrevPage = () => {
        if (page > 1) {
          setPage(page - 1);
        }
      };
      useEffect(() => {
        fetchData()
      },[page]);

    return(
        <>
        <br />
            <div className="text-center mt-4 mb-4 banner">
                <h1> { type.toUpperCase() } </h1>
            </div> 
            <div className="text-center">
                <button className='btn btn-secondary' onClick={handlePrevPage} disabled={page === 1}>Previous Page</button>
                <button className='btn btn-secondary' onClick={handleNextPage} disabled={page===10}>Next Page</button>
            </div>
            <br></br>
            
            {
                moviedata.length <0 ? ( <div className="container">
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 bg_black">
                    { items.map(item => (
                        <div key={item.id} className="col">
                            <Link to={`${type}/${item.id}`} className="card-link custom-link" >
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
            </div>) : ( <div className="container">
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 ">
                    { moviedata.map(item => (
                        <div key={item.id} className="col">
                            <Link to={`${type}/${item.id}`} className="card-link custom-link" >
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
            </div>)
            }
            <br />
            <div className='text-center'>
                <button className='btn btn-secondary' onClick={handlePrevPage} disabled={page === 1}>Previous Page</button>
                <button className='btn btn-secondary' onClick={handleNextPage} disabled={page===10}>Next Page</button>
            </div>
            <br />
        </>
    )
}

// there is a page dedicated for this to make the initial call to get the movie data. The pages were added to this component later on. Therefore, adding api call here again. 
// There is a way to pass data from child to parent but haven't used that here in this component.