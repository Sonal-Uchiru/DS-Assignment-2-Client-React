import React, {useState} from "react";
import axios from "axios";
import "./../css/updateShowTime.css"


export default function UpdateShowTime() {

    return (
        <div className="updateShow">

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h2 className="modal-title" id="exampleModalLabel">Update Show Time</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="container">

                                <form>


                                    <div className="mb-3">
                                        <label for="ShowTime" className="form-label">Show Time</label>
                                        <input type="text" className="form-control" id="ShowTime"
                                               placeholder="9.00 AM"/>
                                    </div>

                                    <div className="mb-3">
                                        <label for="movie" className="form-label movie">Movie</label><br/>
                                        <select name="movie" id="movie" value="Select Movie">
                                            <option value="sonic">Sonic the Hedgehog 2</option>
                                            <option value="kfg">K.G.F Chapter 2</option>
                                        </select>
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
                                            <p className="story">Sequel to the 2020 live-action feature film 'Sonic the
                                                Hedgehog</p>

                                            <p className="duration"> 2 HR 30 MIN</p>
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

                            <button type="button" className="btn-lg btn5">Update</button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
