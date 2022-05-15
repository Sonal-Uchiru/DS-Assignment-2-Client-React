import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/movieCardCustomer2.css"


export default function MovieCardCustomer2(props) {


    return (
        <div className="MovieCardCustomer2">
            <div className="card">

                <img src="./../images/sonic.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h4 className="card-title">{props.details.name}</h4>
                        </div>
                    </div>

                    {props.details.showing? <p className="status">Now Showing</p> : <p className="status">Coming Soon</p>}


                </div>
                <br/>
            </div>
        </div>

    );
}