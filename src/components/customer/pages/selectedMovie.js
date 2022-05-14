import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/selectedMovie.css"
import SelectedMovieCard from "../cards/selectedMovieCard";
import Swal from "sweetalert2";


export default function SelectedMovie() {
    let movieID = "627e949d5ec0091c8c205130";
    let theaterId = "6277e51007fed789651bd99e";

    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let [movieData, setMovieData] = useState({})
    let [theaterDetails, setTheaterDetails] = useState([])


    useEffect(()=> {
        getAllTheaters()
        getMovieDetails()
    }, [])

    async function getMovieDetails(){
        await axios({
            url: `http://localhost:8093/api/movies/${movieID}`,
            method: "GET",
            headers: {"x-auth-token":userToken}

        }).then((res)=> {
            setMovieData(res.data)
        }).catch((err)=> {
            showAlerts(2, err)
        })
    }
    async function getAllTheaters(){
        await axios({
            url: `http://localhost:8093/api/theaters`,
            method: "GET",
            headers: {"x-auth-token":userToken}

        }).then((res)=> {
            console.log(res.data)
            setTheaterDetails(res.data)
        }).catch((err)=> {
            showAlerts(2, err)
        })
    }



    function showAlerts(type, text){
        // type 1 = success, type 2 = error, type 3 = update success
        if(type == 1){
            Swal.fire({
                position: "center",
                icon: "success",
                title: text,
                showConfirmButton: false,
                timer: 1500,
            });
        }else if(type == 2){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: text,
                footer: '<p style = "color : #D0193A">Currently unavailable!',
            });
        }
    }
    return (
        <div className="SelectedMovie">
            <h1 className="movieName">{movieData.name}</h1>
            <img src="./../images/batman1.jpeg" className="img-fluid batman" alt="Responsive image"/>

            <h2 className="story"> Story Line</h2>
            <p className="storyline">{movieData.story_line}</p>

            <div className="row">
                <div className="col">
                    <h2 className="genre"> Genres</h2>
                    <p className="genres"> {movieData.genre}</p>
                </div>

                <div className="col">
                    <h2 className="duration">Duration</h2>
                    <p className="durations"> {movieData.duration}</p>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h2 className="language">Language</h2>
                    <p className="lang">{movieData.language}</p>
                </div>

                <div className="col">
                    <h2 className="duration">IMDB Ratings</h2>
                    <img src="./../images/imdb.png" className="imdb"/>
                    <p>  <img src="./../images/star.png" className="star"/>
                    <h6 className="rating">8.1/10</h6></p>
                </div>
            </div>

<div className="crdss">

    {theaterDetails.map((post)=> {
        return (    <SelectedMovieCard key = {post.id} theaterDetails = {post}/>)
    })}
</div>

        </div>


    );
}