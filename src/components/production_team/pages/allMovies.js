import React, {useState} from "react";
import axios from "axios";
import "./../css/allMovies.css"
import MovieCardProduction1 from "../cards/movieCardProduction1";
import MovieCardProduction2 from "../cards/movieCardProduction2";

export default function AllMovies() {

    return (
        <div className="AllMovies">
            <h1 className="Nowshow">NOW SHOWING</h1>
            <br/>
            <button type="button" className="btn btn-lg ADD">Add Movies</button>
            <br/><br/>

            <div className="main">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search Movies..."/>
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

            <br/>
            <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="btngenre" data-bs-toggle="dropdown"
                        aria-expanded="false">
                    Genres
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Drama</a></li>
                    <li><a className="dropdown-item" href="#">Horror</a></li>
                    <li><a className="dropdown-item" href="#">Thriller</a></li>
                    <li><a className="dropdown-item" href="#">Comedy</a></li>
                    <li><a className="dropdown-item" href="#">Romance</a></li>
                </ul>
            </div>

            <br/><br/><br/>

            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent">
                    <div className="columns">
                        <MovieCardProduction1/>
                    </div>

                    <div className="columns">
                        <MovieCardProduction1/>
                    </div>

                    <div className="columns">
                        <MovieCardProduction1/>
                    </div>

                    <div className="columns">
                        <MovieCardProduction1/>
                    </div>
                </div>
            </div>
            <br/>
            <h1 className="Nowshow">COMING SOON</h1>
            <br/>
            <button type="button" className="btn btn-lg ADD">Add Movies</button>
            <br/><br/>

            <div className="main">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search Movies..."/>
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

            <br/>
            <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="btngenre" data-bs-toggle="dropdown"
                        aria-expanded="false">
                    Genres
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Drama</a></li>
                    <li><a className="dropdown-item" href="#">Horror</a></li>
                    <li><a className="dropdown-item" href="#">Thriller</a></li>
                    <li><a className="dropdown-item" href="#">Comedy</a></li>
                    <li><a className="dropdown-item" href="#">Romance</a></li>
                </ul>
            </div>

            <br/><br/><br/>


            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent">
                    <div className="columns">
                        <MovieCardProduction2/>
                    </div>

                    <div className="columns">
                        <MovieCardProduction2/>
                    </div>

                    <div className="columns">
                        <MovieCardProduction2/>
                    </div>

                    <div className="columns">
                        <MovieCardProduction2/>
                    </div>
                </div>
            </div>

        </div>

    );
}