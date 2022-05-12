import React, {useState} from "react";
import axios from "axios";
import "./../css/movieCardCustomer2.css"

export default function MovieCardCustomer2() {

    return (
        <div className="MovieCardCustomer2">
            <div className="card">

                <img src="./../images/sonic.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h4 className="card-title">SONIC THE HEDGEHOG 2</h4>
                        </div>
                    </div>

                    <p className="status">Coming Soon</p><br/>

                </div>
                <br/>
            </div>
        </div>

    );
}