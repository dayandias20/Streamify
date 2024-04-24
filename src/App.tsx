import './App.css';
import { Navbar } from './components/navbar';
import Loading from './components/loading';
import { Genre_Obj, Genre_Template } from './components/genres_template';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Movies } from './pages/movies/movies';
import { Home } from './pages/home/home';
import { TV_Shows } from './pages/tv_shows/tv_shows';
import { Login } from './pages/auth/login';
import { Movie_Details } from './pages/details/movie_details';
import { Person_Details } from './pages/person_details/person_details';
import { Search_Page } from './pages/search/search';

function App() {
  const GENRES_URL: string = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

  const [ genres, setGenres ] = useState<Genre_Obj[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  
  const fetchGenres = async () => {
    setIsLoading(true);
    try {
      const headers = {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWM5NjQ2ZTc0ZmI3ZjM5ZmJiZTYxZjZjYjk0MjMxYiIsInN1YiI6IjYwMWMxYjc0Yjk3NDQyMDAzYzI2OWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wTICqTO-n5JAftANQ5xtZRHecHSj4CeKcQmXsiH2fSU'
      };
      const requestConfig = { 
        headers: headers
      };
      const genre_list = await axios.get(GENRES_URL, requestConfig);
      setGenres(genre_list.data.genres); 
       
    } catch (error) {
      console.error('Error fetching genres:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchGenres(); 
  }, []);

  return (
    <div  className="app-container" style={{ width:"100%", justifyContent:"center", flexGrow:1}}>
      
      <div className='content bg_black'> 
       
      <Router>
        <Navbar/>              
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/*" element={<Home/>} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/genre/movies" element={<Movies/>} />
            <Route path="/tv_shows" element={<TV_Shows/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="movies/:type/:id" element={<Movie_Details/>} />
            <Route path="tv_shows/:type/:id" element={<Movie_Details/>} />
            <Route path="trending/:type/:id" element={<Movie_Details/>} />
            <Route path=':type/:id' element={<Movie_Details/>}/>
            <Route path='search/:searchQuery/search/:id' element={<Movie_Details/>}/>
            <Route path='search/:searchQuery/movie/:id' element={<Movie_Details/>}/>  
            <Route path='search/tv_shows/:searchQuery/:id' element={<Movie_Details/>}/>
            <Route path='person/:personName' element={<Person_Details />} />
            <Route path='person/:personName/:type/:id' element={ <Movie_Details /> } />
            <Route path='search/:queryString' element={<Search_Page />}/>
            <Route path='search/' element={<Search_Page/>}/>
          </Routes>
          <br />
        <div style={{ width:'100%'}}>
          { isLoading ? (<Loading></Loading>) :  
          (<Genre_Template genre_obj={genres}></Genre_Template>)}
        </div>
                    
      </Router>
        
        </div>  

    </div>
  );
}

export default App;
