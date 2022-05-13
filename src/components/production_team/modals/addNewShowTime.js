import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/addNewShowTime.css"
import Swal from "sweetalert2";

export default function AddNewShowTime(props) {
    let theaterID = props.theaterID;
    const passedMovieID = props.movieID;


    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let [movieData, setMovieData] = useState([]);
    let [selectedMovie, setSelectedMovie] = useState("");
    let [selectShowTime, setSelectShowTime] = useState("");

    let [selectedMovieObj, setSelectedMovieObj] = useState({});
    let [showTimeError, setShowTimeError] = useState("");
    let [movieError, setMovieError] = useState("");


    useEffect(() => {
        console.log(passedMovieID)
        getAllMovies()
    }, [])

    async function getAllMovies(){
        await axios({
            url: 'http://localhost:8093/api/movies',
            method: 'GET',
            headers: {"x-auth-token":userToken}
        }).then((res)=>{
            setMovieData(res.data);
        }).catch((err) => {
            alert(err);
            showAlerts(2, err)
        })

    }

    async function addShowTime(){
        if(selectShowTime != "" && selectedMovie != ""){

            let showTimeObj = {
                theater_id: theaterID,
                movie_id: selectedMovie,
                show_time: selectShowTime
            }

            console.log(showTimeObj)
            let result = await axios({
                url: "http://localhost:8093/api/showtimes",
                method: "POST",
                headers: {"x-auth-token":userToken},
                data: showTimeObj
            }).then((res)=> {
                showAlerts(1, "Show time added successfully")
            }).catch((err)=> {
                showAlerts(2, err)
            })
            console.log(result)

            document.getElementById('closeModalbtn').click()

        }
        if(selectShowTime == ""){
            setShowTimeError("Please select a showtime")
        }else{
            setShowTimeError("")
        }
        if(selectedMovie == ""){
            setMovieError("Please select a movie")
        }else{
            setMovieError("")
        }


    }

    async function fillMovieData(e){
        let movieID = e
        let movieObj = {}
        setSelectedMovie(movieID);

        if(e == ""){
            movieObj = {
                image: "",
                storyline: "",
                duration: ""
            }
        }else{
            let result = await axios({
                url: `http://localhost:8093/api/movies/${movieID}`,
                method: "GET",
                header: userToken,
            }).catch((err)=> {
                alert(err)
            })
            movieObj = {
                image: result.data.image,
                storyline: result.data.story_line,
                duration: result.data.duration
            }
        }

        setSelectedMovieObj(movieObj);



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
        <div className="addShow">
            {passedMovieID != "" ?
                <button type="button" data-toggle="modal" data-target="#exampleModal" className="btn  grp1"><img src="./../images/edit (1).png"  className="icon" alt="..."/></button>
                :
                <button type="button" className="btn btn-lg ADD" data-toggle="modal" data-target="#exampleModal">Add new Showtime</button> }


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h2 className="modal-title" id="exampleModalLabel">Add Show Time</h2>
                            <button type="button" id = "closeModalbtn" className="closebtn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form>

                                    <div className="mb-3">
                                        <label for="showTime" className="form-label">Show Time</label>
                                        <input type="time" className="form-control" id="Mtime" placeholder="9.00 AM" required
                                               onChange={(e)=> {
                                                   setSelectShowTime(e.target.value)
                                                }}/>
                                        <label htmlFor="showTime" className="form-label text-danger">{showTimeError}</label>

                                    </div>

                                    <div className="mb-3">
                                        <label for="movie" className="form-label movie">Movie</label><br/>
                                        <select name="movie" id="movie" className="form-select"  required
                                                onChange={(e) => {
                                                fillMovieData(e.target.value);
                                        }}>
                                            <option value = "">Select a Movie</option>
                                            {movieData.map((post) => {
                                                return (
                                                    <option key = {post.id} value = {post.id}>{post.name}</option>
                                                )
                                            })}

                                        </select>
                                        <label htmlFor="showTime" className="form-label text-danger">{movieError}</label>

                                    </div>


                                    <div className="row">
                                        <div className="column left">
                                            <div className="box">
                                                <img className="z-depth-2 Img1" alt="100x100"
                                                     src="./../images/sonic.jpg"
                                                     data-holder-rendered="true"/>
                                            </div>
                                        </div>

                                        <div className="column right">
                                            <p className="story">{selectedMovieObj.storyline}</p>

                                            <p className="duration"> {selectedMovieObj.duration}</p>
                                            <img className="imdb" alt="imdb" src="./../images/imdb%20(2).png"/>
                                            <p className="rating"><img className="star" alt="star"
                                                                       src="./../images/star.png"/> 8.1/10</p>
                                        </div>
                                    </div>

                                    <div className="modal-footer border-0">

                                        {
                                            passedMovieID != "" ?
                                            <button onClick={()=> addShowTime()} type="button" className="btn-lg btn5">{passedMovieID}</button>
                                            :
                                            <button onClick={()=> addShowTime()} type="button" className="btn-lg btn5">{passedMovieID}</button> }
                                    </div>
                                </form>
                            </div>


                            <br/>


                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
