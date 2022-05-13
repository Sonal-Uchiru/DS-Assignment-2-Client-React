import React, {useState} from "react";
import axios from "axios";
import "./../css/movieCart.css"
import MovieCardProduction1 from "../../production_team/cards/movieCardProduction1";
import MovieCartCard from "../cards/movieCartCard";

export default function MovieCart() {

    return (
        <div className="MovieCart">

            <div className="box">
                <img src="./../images/bag (2).png" className="logo"/>
            </div>
            <div className="CartName">
                <h1 className="cartN">Movie Cart</h1>
            </div>
            <br/><br/><br/><br/>

            <br/>
            <div className="main">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search By name..."/>
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

            <button type="button" className="btn btn-lg clear">Clear Cart</button>

            <br/>

            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent">
                    <div className="columns">
                        <MovieCartCard/>
                    </div>

                    <div className="columns">
                        <MovieCartCard/>
                    </div>

                    <div className="columns">
                        <MovieCartCard/>
                    </div>

                    <div className="columns">
                        <MovieCartCard/>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <h2>Total:LKR 5000.00</h2>
                <button type="button" className="btn btn-lg buy">Buy Tickets</button>
            </div>

            <br/><br/>

        </div>

    );
}