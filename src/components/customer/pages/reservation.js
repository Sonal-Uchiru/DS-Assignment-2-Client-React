import React, {useState} from "react";
import axios from "axios";
import "./../css/reservation.css"
import MovieCartCard from "../cards/movieCartCard";
import ReservationCard from "../cards/reservationCard";

export default function Reservation() {

    return (
        <div className="Reservation">
            <div className="box">
                <img src="./../images/booking.png" className="logo"/>
            </div>
            <div className="CartName">
                <h1 className="cartN">Reservation</h1>
            </div>
            <br/><br/><br/><br/>

            <br/>
            <div className="main">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search Reservation..."/>
                    <div className="input-group-append">
                        <button className="btn searchbtn" type="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search icon"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="containerrrr ">


                <ReservationCard/>

                <ReservationCard/>

            </div>


            <br/>


            <br/><br/>

        </div>

    );
}