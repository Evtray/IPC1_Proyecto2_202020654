import React from "react";
import MovieCard from "../movieCard/MovieCard";
import { useSelector } from 'react-redux';
import './MoviesList.scss';


const MoviesList = ({ list = [], filter }) => {
    const USER_PLAYLIST = useSelector(state => state.userMoviesPlaylist);
  
    return (
      <div className="movies-list-component-container">
        {list.map((movie, index) => {
          if (filter === 'all' || USER_PLAYLIST.userMoviesPlaylist.some(userMovie => userMovie.movie_uid === movie.id)) {
            return <MovieCard key={index} movie={movie} />;
          }
          return null;
        })}
      </div>
    );
  };
  

export default MoviesList;