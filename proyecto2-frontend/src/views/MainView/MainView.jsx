import React from "react";
import Header from "../../helpers/Header";
import './MainView.scss';
import Blog from "../../components/blog/Blog";

const MainView = () => {
    return(
        <div className="main-view-component">
            <Blog/>
        </div>
    )

};

export default MainView;