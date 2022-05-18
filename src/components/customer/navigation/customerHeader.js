import React, {useState} from "react";
import axios from "axios";
import "./../css/customerHeader.css"
import {useNavigate,Link} from "react-router-dom";

export default function CustomerHeader() {
    let navigate = useNavigate();
    return (
        <div className="CustomerHeader">
            <div className="Header">

                    <img src="./../images/bitmap.svg" className="navl" alt=""/>
                    <div className="userr"><p className="uname">Derek10905<img src="./../images/user.png" className="user" alt=""/></p>
                    </div>

                    <br/>

                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to = "/movies" >MOON CINEMA</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link" to = "/movies">Movies</Link>
                                <Link className="nav-link" to = "/reservation">Reservations</Link>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="cartb" onClick={() => navigate('/ticketCart')}><img src="./../images/bag.png" className="cart" alt=""/>
                    </button>
                </nav>

            </div>


        </div>

    );
}