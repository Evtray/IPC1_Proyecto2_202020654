import React from "react";
import MoviesList from "../../components/moviesList/MoviesList";
import { useSelector } from 'react-redux';

const DashboardView = () => {
    const MOVIES = useSelector(state => state.movies);
    return(
        <div className="dashboard-view-container">
            {
                MOVIES.loading ? <h1>Cargando...</h1> : <MoviesList list={MOVIES.movies}/>
            }
        </div>
    );
};

export default DashboardView;