import React, {useState} from "react";
import axios from "axios";
import "./../css/updateMovie.css"

export default function UpdateMovie() {

    return (
        <div className="UpdateMov">

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


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
                                            <img className="z-depth-2 Img1" alt="100x100" src="./../images/avatar.webp"
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
                                        <input type="text" className="form-control" id="Mname" placeholder="Toy Story"/>
                                    </div>

                                    <div className="mb-3">
                                        <label for="duration" className="form-label">Duration</label>
                                        <input type="text" className="form-control" id="duration"
                                               placeholder="2 HR 30 MIN"/>
                                    </div>

                                    <div className="mb-3">
                                        <label for="rating" className="form-label">Ratings</label>
                                        <select name="rating" id="rating" className="form-select allselect">
                                            <option value="">Select the Movie from IMDB</option>
                                            <option value="batman">The Batman</option>
                                            <option value="sonic">Sonic the Hedgehog 2</option>
                                            <option value="kfg">K.G.F Chapter 2</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label for="language" className="form-label">Language</label>
                                        <select name="language" className="form-select allselect" id="language">
                                            <option value="">Select Language</option>
                                            <option value="English">English</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Telugu">Telugu</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label for="genre" className="form-label">Genre</label>
                                        <select name="genre" className="form-select allselect" id="genere">
                                            <option value="" selected>Select Genre</option>
                                            <option value="English">Action</option>
                                            <option value="Hindi">Comedy</option>
                                            <option value="Telugu">Horror</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label for="status" className="form-label">Status</label>
                                        <select name="status" className="form-select allselect" id="status">
                                            <option value="" selected>Select Status</option>
                                            <option value="Now">Now Showing</option>
                                            <option value="Soon">Coming Soon</option>
                                        </select>
                                    </div>


                                    <div className="mb-3">
                                        <label for="storyLine" className="form-label">Story Line</label>
                                        <textarea className="form-control" placeholder="Story Line" id="storyLine"/>
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
    );
}
