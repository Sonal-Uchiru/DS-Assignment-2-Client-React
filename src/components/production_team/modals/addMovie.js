import React, {useState} from "react";
import axios from "axios";
import "./../css/addMovie.css"

export default function AddMovie() {

    return (
        <div className="addMov">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h2 className="modal-title" id="exampleModalLabel">Add Movie</h2>
                            <button type="button" className="closebtn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">

                                <form id="addMovie">
                                    <span>
                                        <center>
                                        <div className="box">
                                            <img className="z-depth-2 Img1" alt="movie_image"
                                                 src="./../images/clapperboard.png"
                                                 id="movieImage"
                                                 data-holder-rendered="true"/>
                                        </div>


                                        </center>
                                        <div className="image-upload">
                                        <label for="file-input">
                                       <img src="./../images/editing.png" className="Img2" id="btn4"/>
                                        </label>
                                        <input id="file-input" type="file"/>
                                        </div>
                                    </span>
                                    <br/>
                                    <div className="mb-3">
                                        <label for="Mname" className="form-label">Movie Name</label>
                                        <input type="text" className="form-control" id="Mname" placeholder="Toy Story"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label for="duration" className="form-label">Duration</label>
                                        <input type="text" className="form-control" id="duration"
                                               placeholder="2 HR 30 MIN"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label for="rating" className="form-label allselect">Ratings</label><br/>
                                        <select className="form-select" name="rating" id="rating">
                                            <option value="">Select the Movie from IMDB</option>
                                            <option value="batman">The Batman</option>
                                            <option value="sonic">Sonic the Hedgehog 2</option>
                                            <option value="kfg">K.G.F Chapter 2</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label for="language" className="form-label allselect">Language</label><br/>
                                        <select className="form-select" name="language" id="language" >
                                            <option value="">Select Language</option>
                                            <option value="English">English</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Telugu">Telugu</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label for="genre" className="form-label allselect">Genre</label><br/>
                                        <select className="form-select" name="genre" id="genre">
                                            <option value="">Select Genre</option>
                                            <option value="English">Action</option>
                                            <option value="Hindi">Comedy</option>
                                            <option value="Telugu">Horror</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label for="status" className="form-label allselect">Status</label><br/>
                                        <select className="form-select" name="status" id="status">
                                            <option value="">Select Status</option>
                                            <option value="Now Showing">Now Showing</option>
                                            <option value= "Coming Soon">Coming Soon</option>
                                        </select>
                                    </div>


                                    <div className="mb-3">
                                        <label for="storyLine" className="form-label">Story Line</label>
                                        <textarea className="form-control" placeholder="Story Line"
                                                  id="storyLine"
                                        />
                                    </div>

                                </form>
                            </div>
                            <br/>

                        </div>
                        <div className="modal-footer border-0">
                            <button form= "addMovie" type="submit" className="btn5">Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
