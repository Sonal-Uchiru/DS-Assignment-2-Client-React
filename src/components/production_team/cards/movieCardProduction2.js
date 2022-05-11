import React, {useState} from "react";
import axios from "axios";
import "./../css/movieCardProduction2.css"

export default function MovieCardProduction2(props) {

    return (
        <div className="MovieCardProduction2">
            <div className="card">

                <img src="./../images/sonic.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h4 className="card-title">{props.details.name}</h4>
                        </div>
                    </div>

                    {props.details.showing? <p className="status">Now Showing</p> : <p className="status">Coming Soon</p>}
                    <br/>

                </div>
                <div className="text-center">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn grp1"><img src="./../images/delete.png" className="icon"
                                                                        alt="..."/></button>
                        <button type="button" className="btn  grp1"><img src="./../images/edit (1).png" className="icon"
                                                                         alt="..."/></button>

                    </div>
                </div>
                <br/>
            </div>
        </div>

    );
}