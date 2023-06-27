import React, { useEffect } from "react";
import './MainView.scss';
import Blog from "../../components/blog/Blog";
import { getMovies } from "../../api";
import { useDispatch } from "react-redux";

const MainView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovies());
    }, [])
    

    return(
        <div className="main-view-component">
            <Blog/>
        </div>
    )

};

export default MainView;