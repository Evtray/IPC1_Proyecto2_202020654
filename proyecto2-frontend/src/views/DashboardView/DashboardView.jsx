import React from "react";
import MoviesList from "../../components/moviesList/MoviesList";

const DashboardView = () => {
    return(
        <div className="dashboard-view-container">
            <MoviesList list={[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,3]}/>
        </div>
    );
};

export default DashboardView;