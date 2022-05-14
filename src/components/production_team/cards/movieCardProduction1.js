import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/movieCardProduction.css"
import UpdateMovieModal from "./../modals/updateMovie";

export default function MovieCardProduction1(props) {
    let movieDetails = props.details;

    let [movieImage, setMovieImage] = useState("")
    let [movieName, setMovieName] = useState("")
    let [movieDuration, setMovieDuration] = useState("")
    let [movieRatings, setMovieRatings] = useState("")
    let [movieLanguage, setMovieLanguage] = useState("")
    let [movieGenre, setMovieGenre] = useState("")
    let [movieStoryline, setMovieStoryline] = useState("")
    let [movieStatus, setMovieStatus] = useState(true)




    useEffect(()=> {
        console.log(movieDetails)
        assignDetails()
    }, [])

    function assignDetails(){
        setMovieImage(movieDetails.image)
        setMovieName(movieDetails.name)
        setMovieDuration(movieDetails.duration)
        setMovieRatings(movieDetails.image)
        setMovieLanguage(movieDetails.language)
        setMovieGenre(movieDetails.genre)
        setMovieStoryline(movieDetails.story_line)
        movieDetails.showing ? setMovieStatus(1) : setMovieStatus(2)

    }
    return (
        <div className="MovieCardProduction">
            <div className="card">

                <img src="./../images/batman.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h4 className="card-title">{props.details.name}</h4>
                        </div>

                        <div className="col-4">
                            <img src="./../images/imdb.png" className="imdb"/>
                            <div className="row">
                                <div className="col"><img src="./../images/star.png" className="star"/></div>
                                <div className="col"><h6 className="rating">8.1/10</h6></div>
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

                        <button type="button" className="btn  grp1" data-toggle="modal" data-target="#exampleModal"><img src="./../images/edit (1).png" className="icon"
                                                                                                                         alt="..."/></button>

                    </div>
                </div>
                <br/>
            </div>

            {/*Modal*/}
            <div className="UpdateMov">
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h2 className="modal-title" id="exampleModalLabel">Update Movie</h2>
                                <button type="button" className="closebtn" data-dismiss="modal" aria-label="Close">
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
                                                <input id="file-input" type="file"/>
                                            </div>
                                        </span>
                                        <br/>
                                        <div className="mb-3">
                                            <label htmlFor="Mname" className="form-label">Movie Name</label>
                                            <input type="text" value = {movieName} className="form-control" id="Mname" placeholder="Toy Story"/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="duration" className="form-label">Duration</label>
                                            <input type="text" value = {movieDuration} className="form-control" id="duration"
                                                   placeholder="2 HR 30 MIN"/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="rating" className="form-label">Ratings</label>
                                            <select name="rating" value = {movieRatings} id="rating" className="form-select allselect">
                                                <option value="">Select the Movie from IMDB</option>
                                                <option value="batman">The Batman</option>
                                                <option value="sonic">Sonic the Hedgehog 2</option>
                                                <option value="kfg">K.G.F Chapter 2</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="language" className="form-label">Language</label>
                                            <select name="language" value = {movieLanguage} className="form-select allselect" id="language">
                                                <option value="">Select Language</option>
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                                <option value="Telugu">Telugu</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="genre" className="form-label">Genre</label>
                                            <select name="genre" value = {movieGenre} className="form-select allselect" id="genere">
                                                <option value="" selected>Select Genre</option>
                                                <option value="Action">Action</option>
                                                <option value="Drama">Drama</option>
                                                <option value="Thriller">Thriller</option>
                                                <option value="Romance">Romance</option>
                                                <option value="Comedy">Comedy</option>
                                                <option value="Horror">Horror</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">Status</label>
                                            <select name="status" value = {movieStatus} className="form-select allselect" id="status">
                                                <option value="" selected>Select Status</option>
                                                <option value="1">Now Showing</option>
                                                <option value="2">Coming Soon</option>
                                            </select>
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="storyLine" className="form-label">Story Line</label>
                                            <textarea className="form-control" value = {movieStoryline} placeholder="Story Line" id="storyLine"/>
                                        </div>

                                    </form>
                                </div>


                                <br/>


                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn5">Delete</button>
                                <button type="button" className="btn6">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

        </div>

    );
}