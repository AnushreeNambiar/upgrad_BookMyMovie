import Header from "../../common/header/Header";
import './Home.css';
import React, { Component } from 'react';

const Home = function(){
    return(
        <div>
        <Header/>
        <div className="movies-Heading" >
            Upcoming Movies
        </div>  
        </div>     
    )
}

export default Home;