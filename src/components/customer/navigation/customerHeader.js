import React, {useState} from "react";
import axios from "axios";
import "./../css/customerHeader.css"

export default function CustomerHeader() {

    return (
        <div className="CustomerHeader">

            <div className="Header">
                <img src="./../images/bitmap.svg" className="navl" alt=""/>
                <br/>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">MOON CINEMA</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link" href="#">Movies</a>
                            <a className="nav-link" href="#">Reservations</a>
                        </div>
                    </div>
                </div>

             <button type="button" className="cartb"><img src="./../images/bag.png" className="cart" alt=""/></button>
            </nav>

            </div>


        </div>

    );
}