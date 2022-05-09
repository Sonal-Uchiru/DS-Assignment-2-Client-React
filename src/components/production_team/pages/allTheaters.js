import React, {useState} from "react";
import axios from "axios";
import "./../css/allTheaters.css"

import TheaterCard from "../cards/theaterCard";


export default function AllTheaters() {

    return (
        <div className="Theaters">
            <h1 className="theater">Theaters</h1>

            <div className="main">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search Theaters..."/>
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


            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                    <div className="row parent ">
                        <div className="col">
                            <TheaterCard/>
                        </div>

                        <div className="col">
                            <TheaterCard/>
                        </div>

                        <div className="col">
                            <TheaterCard/>
                        </div>

                        <div className="col">
                            <TheaterCard/>
                        </div>


                    </div>
            </div>

        </div>

    );
}