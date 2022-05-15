import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/updateShowTime.css"
import Swal from "sweetalert2";


export default function UpdateShowTime(props) {
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let showTimeDetails = props.showTimeDetails;
    let movieDetails = props.movieDetails;

    let [movieData, setMovieData] = useState([]);
    let [selectedMovie, setSelectedMovie] = useState("");
    let [selectShowTime, setSelectShowTime] = useState("");
    let [selectedMovieObj, setSelectedMovieObj] = useState({});

    useEffect(()=> {
        console.log(showTimeDetails)
        getMovieDetails()
        setMovieObj()
    }, [])

    async function getMovieDetails(){
        await axios({
            url: "http://localhost:8093/api/movies",
            method: "GET",
            headers: {"x-auth-token":userToken}

        }).then((res)=>{
            setMovieData(res.data);

        }).catch((err)=> {
            showAlerts(2, err);
        })
    }

    function setMovieObj(){
        let movieObj = {
            image: movieDetails.image,
            storyline: movieDetails.story_line,
            duration: movieDetails.duration
        }

        setSelectedMovieObj(movieObj);
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
    async function updateShowTimes(){
        alert("asd")
        await axios({
            url: `http://localhost:8093/api/showtimes/${showTimeDetails.id}`,
            method: 'PUT',
            headers: {"x-auth-token":userToken},
            data:  selectedMovieObj
        }).then((res)=>{
            showAlerts(1, "Show time updated successfully")

        }).catch((err) => {
            alert(err);
            showAlerts(2, err)
        })
    }

    function deleteShowTime(){

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
        <div className="updateShow">

            <button data-toggle="modal" data-target="#modal2" type="button" className="btn  grp1">
                <img src="./../images/edit (1).png" className="icon" alt="..."/>
            </button>


            <div className="modal fade" id="modal2" tabIndex="-1" role="dialog"
                 aria-labelledby="modal2label"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h2 className="modal-title" id="modal2label">Update Show Time</h2>
                            <button type="button" className="closebtn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="container">

                                <form>


                                    <div className="mb-3">
                                        <label for="ShowTime" className="form-label">Show Time</label>
                                        <input type="text" value = {showTimeDetails.show_time} className="form-control" id="ShowTime" onChange={(e)=> {
                                            setSelectShowTime(e.target.value)
                                        }}  placeholder="9.00 AM"/>

                                    </div>

                                    <div className="mb-3">
                                        <label for="movie" className="form-label movie">Movie</label><br/>
                                        <select name="movie" value = {movieDetails.id} id="movie"  className="form-select" onChange={(e) => {
                                            fillMovieData(e.target.value);
                                        }}>
                                            <option value = "">Select a Movie</option>
                                            {movieData.map((post) => {
                                                return (
                                                    <option key = {post.id} value = {post.id}>{post.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>


                                    <div className="row">
                                        <div className="column left">
                                            <div className="box">
                                                <img className="z-depth-2 Img1" alt="100x100"
                                                     src={selectedMovieObj.image}
                                                     data-holder-rendered="true"/>
                                            </div>
                                        </div>

                                        <div className="column right">
                                            <p className="story">{selectedMovieObj.storyline}</p>

                                            <p className="duration"> {selectedMovieObj.duration}</p>
                                            <img className="imdb" alt="imdb" src="./../images/imdb (2).png"/>
                                            <p className="rating"><img class="star" alt="star"
                                                                       src="./../images/star.png"/> 8.1/10</p>
                                        </div>
                                    </div>


                                </form>
                            </div>


                            <br/>


                        </div>
                        <div className="modal-footer border-0">
                            <div className="row text-center">
                                <div className="col">
                                    <button type="button" onClick = {()=> deleteShowTime()} className="btn5 btn-lg">Update</button>
                                </div>
                                <div className="col">
                                    <button type="button" onClick = {()=> updateShowTimes()} className="btn6 btn-lg">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
