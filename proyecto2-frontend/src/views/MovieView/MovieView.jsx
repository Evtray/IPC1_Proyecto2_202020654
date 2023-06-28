import React, {useState, useEffect} from 'react';
import Movie from '../../components/movie/Movie';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Header from '../../components/header/Header';

import './MovieView.scss'

const MovieView = () => {
    const { id } = useParams();
    const MOVIES = useSelector(state => state.movies);
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        console.log(movie, 'movie')
        console.log(id, 'id')
        if(MOVIES?.movies) {
            const movies = MOVIES?.movies;
            const movieSelected = movies?.find((movie) => movie.id === id); 
            console.log(movieSelected, 'movieSelected')
            setMovie(movieSelected) 
        }
      }, [MOVIES])


    return (
        <div className='movie-view-container'>
            <Movie movie={movie}/>
        </div>
    );
}

export default MovieView;