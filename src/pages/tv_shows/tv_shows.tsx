import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid_Template } from '../../components/grid_template';


export const TV_Shows = () => {

    const [ moviedata, setMoviedata ] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWM5NjQ2ZTc0ZmI3ZjM5ZmJiZTYxZjZjYjk0MjMxYiIsInN1YiI6IjYwMWMxYjc0Yjk3NDQyMDAzYzI2OWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wTICqTO-n5JAftANQ5xtZRHecHSj4CeKcQmXsiH2fSU'
            }
          });
          setMoviedata(response.data.results);
          console.log(response.data.results);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        fetchData();
      },[]);

    return (
        <div>
            <Grid_Template items={moviedata} type="tv"></Grid_Template>
        </div>
    );

}

