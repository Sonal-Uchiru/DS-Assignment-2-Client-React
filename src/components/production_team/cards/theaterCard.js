import React, {useState} from "react";
import axios from "axios";
import "./../css/theaterCard.css"

export default function TheaterCard({theater}) {

    return (
        <div className="TheaterCard">
            <div className="card">
                <img src={theater.logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h4 className="card-title">{theater.name}</h4>
                        </div>
                    </div>
                    <p className="text">{theater.location}</p>

                </div>
            </div>


        </div>

    );
}