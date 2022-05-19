import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/movieCardTheater.css"
import "./../css/updateShowTime.css"
import UpdateShowTimeModalll from "./../modals/updateShowTime";
import Swal from "sweetalert2";
import GetRating from "../../../imdb_api/getRatingByImdbMovieId";

export default function MovieCardTheater(props) {
    let theaterId = props.theaterID;
    let movieID = "627b7d9444c5e224032feeb4";
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let movieDetails = props.movieDetails;
    let showTimeDetails = props.showTimeDetails;
    let [showTimeStatus, setShowTimeStatus] = useState('');
    let [mainImage, setMainImage] = useState("https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg")
    let [ratings, setRatings] = useState("")


    //modal content
    let [selectedMovie, setSelectedMovie] = useState("");
    let [selectShowTime, setSelectShowTime] = useState("");
    let [selectedMovieObj, setSelectedMovieObj] = useState({});
    let [movieData, setMovieData] = useState([]);
    let [movieError, setMovieError] = useState((""))
    let [showTimeError, setShowTimeError] = useState((""))


    useEffect(()=> {
        setShowTimeStatus(showTimeDetails.status)
        setSelectShowTime(showTimeDetails.show_time)
        setSelectedMovie(movieDetails.id)
        getImdbRatings(movieDetails.imdb_key)

        getMovieDetails()
        setMovieObj()
        setMainImage(movieDetails.image)
    }, [])

    useEffect(()=> {

    }, [selectShowTime, selectedMovie])

    async function deleteShowtime(){
        Swal.fire({
            title: "Are you sure you want to delete this?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    url: `http://localhost:8093/api/showtimes/${showTimeDetails.id}`,
                    method: 'DELETE',
                    headers: {"x-auth-token":userToken}
                }).then((res) => {
                    showAlerts(1, "Show time deleted successfully")
                    props.getDetailsFunction2()


                }).catch(async (err) => {
                    await showAlerts(2, err)

                })

            }
        })
    }


    async function changeStatus(){

        if(showTimeStatus == 1){
            deactivateShowtime()
        }else{
            activateShowTime()
        }

    }

    function deactivateShowtime(){
        Swal.fire({
            title: "Are you sure you want to deactivate this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, deactivate it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    url: `http://localhost:8093/api/showtimes/${showTimeDetails.id}/status`,
                    method: 'PATCH',
                    headers: {"x-auth-token":userToken},
                }).then((res)=>{
                    showAlerts(1, "Show time deactivated")
                    showTimeStatus ==1 ? setShowTimeStatus(2) : setShowTimeStatus(1)

                }).catch((err) => {
                    alert(err);
                    showAlerts(2, err)
                })

            }

        })
    }

    function activateShowTime(){
        Swal.fire({
            title: "Are you sure you want to activate this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, activate it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    url: `http://localhost:8093/api/showtimes/${showTimeDetails.id}/status`,
                    method: 'PATCH',
                    headers: {"x-auth-token":userToken},
                }).then((res)=>{
                    showAlerts(1, "Show time activated")
                    showTimeStatus ==1 ? setShowTimeStatus(2) : setShowTimeStatus(1)

                }).catch((err) => {
                    alert(err);
                    showAlerts(2, err)
                })

            }

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

    //Modal functions
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

    async function getImdbRatings(key){
        console.log(key)
        await GetRating(key).then((res)=>{
            console.log(res)
            setRatings(res)
        }).catch((err)=> {
            showAlerts(2, err)
        })
    }

    function setMovieObj() {
        let rating = 0;

        let movieObj = {
            image: movieDetails.image,
            storyline: movieDetails.story_line,
            duration: movieDetails.duration,
            imdbRating: rating
        }

        setSelectedMovieObj(movieObj);
    }

    async function updateShowTimes(){

        if(selectShowTime != "" && selectedMovie != ""){
            let movieObj = {
                theater_id: theaterId,
                movie_id: selectedMovie,
                show_time: selectShowTime
            }
            console.log(movieObj)
            await axios({
                url: `http://localhost:8093/api/showtimes/${showTimeDetails.id}`,
                method: 'PUT',
                headers: {"x-auth-token":userToken},
                data:  movieObj
            }).then((res)=>{
                showAlerts(1, "Show time updated successfully")
                document.getElementById('closeModalBtn2').click()
                props.getDetailsFunction2()
            }).catch((err) => {
                alert(err);
                showAlerts(2, err)
            })
        }

        if(selectedMovie == ""){
            setMovieError("You must select a movie")
        }else{
            setMovieError("")
        }
        if(selectShowTime == ""){
            setShowTimeError("You must select a showtime")
        }else{
            setShowTimeError("")
        }

    }


    function fillModal(){

        setSelectShowTime(showTimeDetails.show_time)
        let movieObj = {
            id: movieDetails.id,
            image: movieDetails.image,
            storyline: movieDetails.story_line,
            duration: movieDetails.duration
        }

        setSelectedMovieObj(movieObj);

    }

    return (
        <div className="MovieCardTheater">
            <div className="card">
                <h3 className="text-center time">{showTimeDetails.show_time}</h3>
                <img src={mainImage} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h4 className="card-title">{movieDetails.name}</h4>
                        </div>

                        <div className="col-4">

                            <img src="./../images/imdb.png" className="imdb"/>
                            <div className="row">
                                <div className="col"><img src="./../images/star.png" className="star"/></div>
                                <div className="col"><h6 className="rating">{ratings}/10</h6></div>
                            </div>

                        </div>
                    </div>
                    <p className="text">{movieDetails.duration}</p>
                    <p className="status">{movieDetails.showing? "Now Showing": "Coming soon"}</p><br/>
                    <div className="text-center">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            {/*<UpdateShowTimeModalll  showTimeDetails = {showTimeDetails} movieDetails = {movieDetails}/>*/}


                            <button onClick = {()=> {
                                fillModal()
                            }}
                                    data-toggle="modal" data-target={`#${showTimeDetails.id}`} type="button" className="btn grp1">
                                <img src="./../images/edit (1).png" className="icon" alt="..."/>
                            </button>
                            <button onClick = {()=> deleteShowtime()} type="button" className="btn grp1"><img src="./../images/delete.png"
                                                                                                              className="icon"
                                                                                                              alt="..."/></button>


                        </div>

                    </div>
                </div>
                <div className="text-center">
                    <label className="switch">

                        {showTimeStatus == "1" ? <input
                            type="checkbox"
                            onClick = {()=> changeStatus()}
                            checked="checked"

                        />: <input
                            type="checkbox"
                            onClick = { (e)=> {e.preventDefault(); changeStatus()}}
                        />}

                        <span className="slider round"/>
                    </label>
                </div>
                <br/>
            </div>


            {/*Modal*/}
            <div className="updateShow">
                <div className="modal fade" id={showTimeDetails.id} tabIndex="-1" role="dialog"
                     aria-labelledby="modal2label"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h2 className="modal-title" id="modal2label">Update Show Time</h2>
                                <button type="button" id = "closeModalBtn2" className="closebtn" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="container">

                                    <form>


                                        <div className="mb-3">
                                            <label htmlFor="ShowTime" className="form-label">Show Time</label>
                                            <input type="time"
                                                   className="form-control" id="ShowTime" value = {selectShowTime} onChange={(e) => {
                                                setSelectShowTime(e.target.value)
                                            }} placeholder="9.00 AM"/>
                                            <label htmlFor="ShowTime" className="form-label text-danger">{showTimeError}</label>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="movie" className="form-label movie">Movie</label><br/>
                                            <select name="movie" value={selectedMovieObj.id} id="movie"
                                                    className="form-select" onChange={(e) => {
                                                fillMovieData(e.target.value);
                                            }}>
                                                <option value="">Select a Movie</option>
                                                {movieData.map((post) => {
                                                    return (
                                                        <option key={post.id} value={post.id}>{post.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="ShowTime" className="form-label text-danger">{movieError}</label>

                                        </div>


                                        <div className="row">
                                            <div className="column left">
                                                <div className="box1">
                                                    <img className="z-depth-2 Img1" alt="100x100"
                                                         src={selectedMovieObj.image}
                                                         data-holder-rendered="true"/>
                                                </div>
                                            </div>

                                            <div className="column right">
                                                <p className="story">{selectedMovieObj.storyline}</p>

                                                <p className="duration"> {selectedMovieObj.duration}</p>
                                                <img className="imdb" alt="imdb" src="./../images/imdb (2).png"/>
                                                <p className="rating1"><img className="star1" alt="star"
                                                                           src="./../images/star.png"/> {selectedMovieObj.imdbRating}/10</p>
                                            </div>
                                        </div>


                                    </form>
                                </div>


                                <br/>


                            </div>
                            <div className="modal-footer border-0">
                                <div className="row text-center">
                                    <div className="col">
                                        <button type="button" onClick={() => updateShowTimes()}
                                                className="btn5 btn-lg">Update
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button type="button" onClick={() => deleteShowtime()}
                                                className="btn6 btn-lg">Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}
