import React, {useState} from "react";
import axios from "axios";
import "./../css/movieCardTheater.css"

export default function MovieCardTheater() {

    return (
        <div className="MovieCardTheater">
            <div className="card">
                <h3 className="text-center time">9.00 AM</h3>
                <img src="./../images/kgf.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h4 className="card-title">K.G.F.Chapter 2</h4>
                        </div>

                        <div className="col-4">

                            <img src="./../images/imdb.png" className="imdb"/>
                            <div className="row">
                                <div className="col"><img src="./../images/star.png" className="star"/></div>
                                <div className="col"><h6 className="rating">8.1/10</h6></div>
                            </div>

                        </div>
                    </div>
                    <p className="text">2 HR 30 MIN</p>
                    <p className="status">Now Showing</p><br/>
                    <div className="text-center">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn grp1"><img src="./../images/delete.png"
                                                                            className="icon"
                                                                            alt="..."/></button>
                            <button type="button" className="btn  grp1"><img src="./../images/edit (1).png"
                                                                             className="icon"
                                                                             alt="..."/></button>
                            <button type="button" className="btn  grp1"><img src="./../images/check (1).png"
                                                                             className="icon" alt="..."/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}