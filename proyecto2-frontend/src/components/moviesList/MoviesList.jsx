import React from "react";
import MovieCard from "../movieCard/MovieCard";

import './MoviesList.scss';


const MoviesList = ({list=[]}) => {
    return(
        <div className="movies-list-component-container">
            {
                list.map((movie, index) => {
                    return(
                        <MovieCard key={index} movie={movie}/>
                    )
                })
            }
        </div>
    )

}

export default MoviesList;