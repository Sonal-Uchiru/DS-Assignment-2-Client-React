import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/selectedMovie.css"
import SelectedMovieCard from "../cards/selectedMovieCard";
import Swal from "sweetalert2";
import LoadingDiv from "../../external_components/loading";
import GetRating from "./../../../imdb_api/getRatingByImdbMovieId"
import { useLocation } from "react-router-dom";


export default function SelectedMovie() {
    let location =useLocation();
    const movieID =location.pathname.substring(7);
    let userToken = localStorage.getItem('moon-cinema-token');


    let [movieData, setMovieData] = useState({})
    let [theaterDetails, setTheaterDetails] = useState([])
    let [noShowTime, setNoShowTime] = useState("")
    let [loadingStatus, setLoadingStatus] = useState(true)
    let [mainImage, setMainImage] = useState("https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg")
    let [ratings, setRatings] = useState("")


    useEffect(()=> {
        console.log(movieID)
        setLoadingStatus(false)
        getAllTheaters()
        getMovieDetails()
    }, [])

    async function getMovieDetails(){
        await axios({
            url: `http://localhost:8093/api/movies/${movieID}`,
            method: "GET",
            headers: {"x-auth-token":userToken}

        }).then((res)=> {
            // console.log(res.data)
            setMovieData(res.data)
            setLoadingStatus(true)
            setMainImage(res.data.image)
            getImdbRatings(res.data.imdb_key)


        }).catch((err)=> {
            showAlerts(2, err)
        })
    }

    async function getImdbRatings(key){
        await GetRating(key).then((res)=>{
            console.log(res)
            setRatings(res)
        }).catch((err)=> {
            showAlerts(2, err)
        })
    }

    async function getAllTheaters(){
        await axios({
            url: `http://localhost:8093/api/showtimes/movies/${movieID}`,
            method: "GET",
            headers: {"x-auth-token":userToken}
        }).then((res)=> {
            console.log(res.data)
            if(res.data.length > 0){
                setTheaterDetails(res.data)
                console.log(res.data)
                setNoShowTime("")
            }else{
                setNoShowTime("No showtimes available")
            }
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
            <div className= "container custom-container">
                <img src={mainImage} className="img-fluid batman" alt="Responsive image"/>
            </div>


            <div hidden = {!loadingStatus}  >
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
                            <h6 className="rating">{ratings}/10</h6></p>
                    </div>
                </div>
            </div>


            <div hidden = {loadingStatus}  className="container justify-content-center">
                <br/>
                <center>
                    <LoadingDiv type={"bars"} color={"#ECB365"} height={"50px"} width={"50px"}/>
                </center>
            </div>
            <hr/>
            <div className="crdss">
                <h4 className="lang text-danger text-center">{noShowTime}</h4>

                {theaterDetails.map((post)=> {
                    return (    <SelectedMovieCard key = {post.id} dataObject = {post} movieDetails = {movieData} />)
                })}
            </div>

        </div>


    );
}