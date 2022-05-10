import React, {useState} from "react";
import axios from "axios";
import "./../css/productionHeader.css"

export default function ProductionTeamHeader() {

    return (
        <div className="ProductionHeader">

            <div className="Header">
                <img src="./../images/bitmap.svg" className="navl" alt=""/>
                <div className="userr"><p className="uname">Derek10905<img src="./../images/user (2).png" className="user" alt=""/></p>
                </div>
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
                                <a className="nav-link" href="#">Theaters</a>
                            </div>
                        </div>
                    </div>
                </nav>

            </div>


        </div>

    );
}