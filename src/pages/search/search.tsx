import { useEffect, useState } from "react";
import { Grid_Template, Item } from "../../components/grid_template";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/loading";
 
export const Search_Page = () => {

    const { queryString } = useParams();

    const [ moviedata, setMoviedata ] = useState<Item[]>([]);
    const [ selectedOption, setSelectedOption ] = useState<string>("");
    const [ isSmallScreen, setIsSmallScreen ] = useState<boolean>(false);
    const [ page, setPage ] = useState(1);

    const [ isLoading, setIsLoading ] = useState(false);

    let search_string = queryString;

    console.log(queryString);

    const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    const TV_SEARCH_URL = `https://api.themoviedb.org/3/search/tv?query=${queryString}&include_adult=false&language=en-US&page=${page}`
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${queryString}&include_adult=false&language=en-US&page=${page}`;

    let URL:string =SEARCH_URL;

    if(selectedOption==='option_movie'){
        URL = SEARCH_URL
    }
    else if (selectedOption==='option_rating'){
        URL = TOP_RATED_URL;
    }
    else if(selectedOption==='option_tv'){
        URL = TV_SEARCH_URL
    }
    const fetchSearchResults = async () => {
        setIsLoading(true);
        try{
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWM5NjQ2ZTc0ZmI3ZjM5ZmJiZTYxZjZjYjk0MjMxYiIsInN1YiI6IjYwMWMxYjc0Yjk3NDQyMDAzYzI2OWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wTICqTO-n5JAftANQ5xtZRHecHSj4CeKcQmXsiH2fSU'
                }
            }
            const response = await fetch(URL, options)
            const data = await response.json();
            setMoviedata(data.results);
            console.log(data.results);
            setIsLoading(false);
        }
        catch(error){
            console.log(error);
        }
      }
      
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
        setPage(1);
        fetchSearchResults();
    }

    const handleNextPage = () => {
        setPage(page + 1);
      };
      const handlePrevPage = () => {
        if (page > 1) {
          setPage(page - 1);
        }
      };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 995); 
        };
        fetchSearchResults();
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [queryString, page, selectedOption]);

    useEffect(() => {
        setSelectedOption("option_movie");
        
    }, [queryString])

    return(
        <>
        <center className="bg_space_3">
            <br />
            <div className="text-center mt-4 mb-4 banner">
                <h1>Search Page</h1>
            </div>

            <div className="row row-cols-3 row-cols-md-3 row-cols-lg-5 g-4 " style={{color:'white'}}>
            
            {!isSmallScreen && <div className="col"></div>}
                <div className="col">
                    <input id="option_movie" className="form-check-input" type="radio" name="search_type" value="option_movie" onChange={handleOptionChange} >
                    </input>
                    <label htmlFor="option_movie" className="form-check-label" > Movies </label>
                </div>
                
                <div className="col">
                    <input id="option_tv" className="form-check-input" type="radio" name="search_type" value="option_tv"  checked={selectedOption === 'option_tv'} onChange={handleOptionChange}>
                    </input>
                    <label htmlFor="option_tv" className="form-check-label"> TV Shows </label>
                </div>
                <div className="col">
                    <input id="option_rating" className="form-check-input" type="radio" name="search_type" value="option_rating" checked={selectedOption === 'option_rating'} onChange={handleOptionChange}>
                    </input>
                   
                    <label htmlFor="option_rating" className="form-check-label"> Rating </label>
                </div>
                {!isSmallScreen && <div className="col"></div>}
            </div>

            <br />
            <div className="container">
                <div> 
                     {selectedOption === 'option_movie' ? (<h1 style={{color:'white'}}> Search Results for  <span className="badge text-bg-dark">{queryString?.toLocaleUpperCase()}</span> Movie </h1>)
                     
                    : selectedOption === 'option_tv' ? (<h1 style={{color:'white'}}> Search Results for  <span className="badge text-bg-dark">{queryString?.toLocaleUpperCase()}</span> TV Show </h1>)  
                    : ( <h1 style={{color:'white'}}> TOP RATED TV SHOWS </h1>)
                }   
                </div>
            </div>
            <br />
            <>
                
                <div>
                    <button className='btn btn-secondary' onClick={handlePrevPage} disabled={page === 1}>Previous Page</button>
                    <button className='btn btn-secondary' onClick={handleNextPage} disabled={page===10 || moviedata.length<=10}>Next Page</button>
                </div>
                <br></br>
                
                {
                    isLoading ? ( <Loading/>) :         
                
                    (<div className="container">
                        
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 ">
                        { moviedata.map(item => (
                            <div key={item.id} className="col">
                                <Link to={`movie/${item.id}`} className="card-link custom-link" >
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
                )
                }
                <br />
                
                <div>
                    <button className='btn btn-secondary' onClick={handlePrevPage} disabled={page === 1}>Previous Page</button>
                    <button className='btn btn-secondary' onClick={handleNextPage} disabled={page===10 || moviedata.length<=10}>Next Page</button>
                </div>
                
            </>
            </center>
        </>
        );
};