import React, {useState} from "react";
import axios from "axios";
import "./../css/oneTheater.css"
import MovieCardTheater from "../cards/movieCardTheater";
import MovieCardTheater2 from "../cards/movieCardTheater2";

export default function OneTheater() {

    return (
        <div className="OneTheater">

            <div className="box">
                <img src="./../images/new_logo.png" className="logo"/>
            </div>
            <div className="theaterName">
                <h1 className="Tname">PVR CINEMA</h1>
            </div>

            <div className="box2">
                <img src="./../images/rows-red-seats-theater.jpg" className="TheaterImage" alt=""/>
            </div>
            <br/><br/><br/><br/><br/><br/><br/>
            <div className="containerrr">
                <div className="row">
                    <div className="col">

                        <img src="./../images/location.png" className="location" alt=""/>

                        <h3 className="locationN">Location</h3>

                        <br/><br/><br/><br/>
                        <p className="address">No. 35
                            Srimath Anagarika Dharmapala Mawatha,
                            Colombo 3</p>

                    </div>
                    <div className="col">
                        <img src="./../images/capacity.png" className="capacity" alt=""/>

                        <h3 className="capacityY">Capacity</h3>

                        <br/><br/><br/><br/>
                        <p className="seats">200 Seats</p>
                    </div>
                    <div className="col">

                        <img src="./../images/ticket.png" className="child" alt=""/>
                        <h3 className="childT">Child-Ticket Price</h3>

                        <br/><br/><br/>
                        <p className="childP">LKR 600</p>
                    </div>

                    <div className="col">

                        <img src="./../images/ticket.png" className="child" alt=""/>
                        <h3 className="adultT">Adult-Ticket Price</h3>

                        <br/><br/><br/>
                        <p className="adultP">LKR 1200</p>
                    </div>


                </div>

            </div>

            <h1 className="show">Show Times</h1>
            <button type="button" className="btn btn-lg ADD">Add New Showtime</button>
            <br/><br/><br/><br/>

            <div className="containerrrr d-flex justify-content-center flex-nowrap">

                <div className="row parent">
                    <div className="colmn">
                        <MovieCardTheater/>
                    </div>

                    <div className="colmn">
                        <MovieCardTheater2/>
                    </div>

                    <div className="colmn">
                        <MovieCardTheater/>
                    </div>

                    <div className="colmn">
                        <MovieCardTheater/>
                    </div>

                </div>

            </div>

            <br/><br/><br/>


        </div>

    );
}