import React, {useState} from "react";
import axios from "axios";
import "./../css/selectedMovie.css"
import SelectedMovieCard from "../cards/selectedMovieCard";


export default function SelectedMovie() {

    return (
        <div className="SelectedMovie">
            <h1 className="movieName">THE BATMAN</h1>
            <img src="./../images/batman1.jpeg" className="img-fluid batman" alt="Responsive image"/>

            <h2 className="story"> Story Line</h2>
            <p className="storyline">In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own
                family while facing a serial killer known as the Riddler.</p>

            <div className="row">
                <div className="col">
                    <h2 className="genre"> Genres</h2>
                    <p className="genres"> ACTION CRIME DRAMA</p>
                </div>

                <div className="col">
                    <h2 className="duration">Duration</h2>
                    <p className="durations"> 2 HR 30 MIN</p>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h2 className="language">Language</h2>
                    <p className="lang">English</p>
                </div>

                <div className="col">
                    <h2 className="duration">IMDB Ratings</h2>
                    <img src="./../images/imdb.png" className="imdb"/>
                    <p>  <img src="./../images/star.png" className="star"/>
                    <h6 className="rating">8.1/10</h6></p>
                </div>
            </div>

<div className="crdss">

    <SelectedMovieCard/>

    <SelectedMovieCard/>
</div>

        </div>


    );
}