import React, {useState} from "react";
import axios from "axios";
import "./../css/movieCardCustomer.css"

export default function MovieCardCustomer1(props) {

    return (
        <div className="MovieCardCustomer">
            <div className="card">

                <img src="./../images/sonic.jpg" className="card-img-top" alt="..."/>
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
                <br/>
            </div>
        </div>

    );
}