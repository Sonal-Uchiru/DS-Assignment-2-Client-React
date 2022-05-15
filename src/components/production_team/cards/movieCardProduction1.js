import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/movieCardProduction.css"
import UpdateMovieModal from "./../modals/updateMovie";
import Swal from "sweetalert2";
import GetRating from "./../../../imdb_api/getRatingByImdbMovieId"

export default function MovieCardProduction1(props) {
    let movieDetails = props.details;
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";

    let [movieImage, setMovieImage] = useState("https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg")
    let [movieID, setMovieID] = useState("")
    let [movieName, setMovieName] = useState("")
    let [movieDuration, setMovieDuration] = useState("")
    let [movieRatings, setMovieRatings] = useState("")
    let [movieLanguage, setMovieLanguage] = useState("")
    let [movieGenre, setMovieGenre] = useState("")
    let [movieStoryline, setMovieStoryline] = useState("")
    let [movieStatus, setMovieStatus] = useState(true)

    let [nameError, setNameError] = useState("")
    let [durationError, setDurationError] = useState("")
    let [ratingsError, setRatingsError] = useState("")
    let [languageError, setLanguageError] = useState("")
    let [genreError, setGenreError] = useState("")
    let [storyError, setStoryError] = useState("")
    let [ratings, setRatings] = useState("")







    useEffect(()=> {
        assignDetails()

    }, [])


    function assignDetails(){
        setMovieID(movieDetails.id)
        setMovieImage(movieDetails.image)
        setMovieName(movieDetails.name)
        setMovieDuration(movieDetails.duration)
        setMovieRatings(movieDetails.image)
        setMovieLanguage(movieDetails.language)
        setMovieGenre(movieDetails.genre)
        setMovieStoryline(movieDetails.story_line)
        movieDetails.showing ? setMovieStatus(1) : setMovieStatus(2)
        getImdbRatings(movieDetails.imdb_key)

    }

    async function getImdbRatings(key){
        await GetRating(key).then((res)=>{
            console.log(res)
            setRatings(res)
        }).catch((err)=> {
            showAlerts(2, err)
        })
    }


    function updateMovie(){
        let val = 0;
        movieName == "" ? (setNameError("Movie name cannot be empty")) : setNameError("")
        movieDuration == "" ? setDurationError("Movie duration cannot be empty"): setDurationError("")
        movieRatings == "" ? setRatingsError("Movie ratings cannot be empty"): setRatingsError("")
        movieLanguage == "" ? setLanguageError("Movie language cannot be empty"): setLanguageError("")
        movieGenre == "" ? setGenreError("Movie genre cannot be empty"): setGenreError("")
        movieStoryline == "" ? setStoryError("Movie storyline cannot be empty"): setStoryError("")

        if(movieName != "" && movieDuration != "" && movieRatings != "" && movieLanguage != "" && movieGenre != "" && movieStoryline != "" ){
            let status = false;
            console.log(movieStatus)
            movieStatus == 1 ? status = true : status = false;
            console.log(status)
            let movieObj = {
                name: movieName,
                image: movieImage,
                duration: movieDuration,
                genre: movieGenre,
                story_line: movieGenre,
                language: movieLanguage,
                imdb_key: "rating",
                isShowing: status,
            }
            axios({
                url: `http://localhost:8093/api/movies/${movieID}`,
                method: "PUT",
                headers: {"x-auth-token":userToken},
                data: movieObj
            }).then((res)=> {
                props.functionReload()
                showAlerts(1, "Movie Updated successfully")
                document.getElementById('closebtn').click()
            }).catch(async (err) => {
                await showAlerts(2, err)

            })
        }

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
        <div className="MovieCardProduction">
            <div className="card">

                <img src={movieDetails.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h4 className="card-title">{props.details.name}</h4>
                        </div>

                        <div className="col-4">
                            <img src="./../images/imdb.png" className="imdb"/>
                            <div className="row">
                                <div className="col"><img src="./../images/star.png" className="star"/></div>
                                <div className="col"><h6 className="rating">{ratings}/10</h6></div>
                            </div>
                        </div>
                    </div>

                    {props.details.showing? <p className="status">Now Showing</p> : <p className="status">Coming Soon</p>}
                    <br/>

                </div>
                <div className="text-center">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick = {() => props.functiondelete(props.details.id)} className="btn grp1"><img src="./../images/delete.png" className="icon"
                                                                        alt="..."/></button>

                        <button type="button" className="btn  grp1" data-toggle="modal" data-target={`#${props.details.id}`}><img src="./../images/edit (1).png" className="icon"
                                                                                                                         alt="..."/></button>

                    </div>
                </div>
                <br/>
            </div>

            {/*Modal*/}
            <div className="UpdateMov">
                <div className="modal fade" id={`${props.details.id}`} tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h2 className="modal-title" id="exampleModalLabel">Update Movie</h2>
                                <button type="button" id = "closebtn" className="closebtn" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="container">

                                    <form>

                                        <span>

                                            <center>
                                            <div className="box">
                                                <img className="z-depth-2 Img1" alt="100x100" src={movieImage}
                                                     data-holder-rendered="true"/>
                                            </div>
                                            </center>

                                            <div className="image-upload">
                                                <label htmlFor="file-input">
                                                    <img src={movieImage} className="Img2" id="btn4"/>
                                                </label>
                                                <input id="file-input" type="file" onChange={(e)=>{
                                                    setMovieImage(e.target.value)
                                                }}/>
                                            </div>
                                        </span>
                                        <br/>
                                        <div className="mb-3">
                                            <label htmlFor="Mname" className="form-label">Movie Name</label>
                                            <input type="text" value = {movieName} className="form-control" id="Mname" placeholder="Toy Story" onChange={(e)=>{
                                                setMovieName(e.target.value)
                                            }}/>
                                            <label htmlFor="Mname" className="form-label text-danger">{nameError}</label>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="duration" className="form-label">Duration</label>
                                            <input type="text" value = {movieDuration} className="form-control" id="duration"
                                                   placeholder="2 HR 30 MIN" onChange={(e)=>{
                                                setMovieDuration(e.target.value)
                                            }}/>
                                            <label htmlFor="Mname" className="form-label text-danger">{durationError}</label>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="rating" className="form-label">Ratings</label>
                                            <select name="rating" value = {movieRatings} id="rating" className="form-select allselect" onChange={(e)=> {
                                                setMovieRatings(e.target.value)
                                            }}>
                                                <option value="">Select the Movie from IMDB</option>
                                                <option value="batman">The Batman</option>
                                                <option value="sonic">Sonic the Hedgehog 2</option>
                                                <option value="kfg">K.G.F Chapter 2</option>
                                            </select>
                                            <label htmlFor="Mname" className="form-label text-danger">{ratingsError}</label>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="language" className="form-label">Language</label>
                                            <select name="language" value = {movieLanguage} className="form-select allselect" id="language" onChange={(e)=>{
                                                setMovieLanguage(e.target.value)
                                            }}>
                                                <option value="">Select Language</option>
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                                <option value="Telugu">Telugu</option>
                                            </select>
                                            <label htmlFor="Mname" className="form-label text-danger">{languageError}</label>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="genre" className="form-label">Genre</label>
                                            <select name="genre" value = {movieGenre} className="form-select allselect" id="genere" onChange={(e)=>{
                                                setMovieGenre(e.target.value)
                                            }}>
                                                <option value="" selected>Select Genre</option>
                                                <option value="Action">Action</option>
                                                <option value="Drama">Drama</option>
                                                <option value="Thriller">Thriller</option>
                                                <option value="Romance">Romance</option>
                                                <option value="Comedy">Comedy</option>
                                                <option value="Horror">Horror</option>
                                            </select>
                                            <label htmlFor="Mname" className="form-label text-danger">{genreError}</label>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">Status</label>
                                            <select name="status" value = {movieStatus} className="form-select allselect" id="status" onChange={(e)=>{
                                                setMovieStatus(e.target.value)
                                            }}>
                                                <option value="1" selected>Now Showing</option>
                                                <option value="2">Coming Soon</option>
                                            </select>
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="storyLine" className="form-label">Story Line</label>
                                            <textarea className="form-control" value = {movieStoryline} placeholder="Story Line" id="storyLine" onChange={(e)=>{
                                                setMovieStoryline(e.target.value)
                                            }}/>
                                            <label htmlFor="Mname" className="form-label text-danger">{storyError}</label>

                                        </div>

                                    </form>
                                </div>


                                <br/>


                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" onClick = {() => props.functiondelete(movieID)} className="btn5">Delete</button>
                                <button type="button" onClick = {(e)=> updateMovie()} className="btn6">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

        </div>

    );
}