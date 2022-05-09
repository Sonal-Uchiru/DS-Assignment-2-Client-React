import React, {useState} from "react";
import axios from "axios";
import "./../css/theaterCard.css"

export default function TheaterCard() {

    return (
        <div className="TheaterCard">
            <div className="card">
                <img src="./../images/new_logo.png" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h4 className="card-title">PVR CINEMA</h4>
                        </div>
                    </div>
                    <p className="text">One Galle Face</p>

                </div>
            </div>


        </div>

    );
}