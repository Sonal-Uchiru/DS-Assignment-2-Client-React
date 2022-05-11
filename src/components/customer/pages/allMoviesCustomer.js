import React, {useState, useEffect} from "react";
import axios from "axios";
import "./../css/allMoviesCustomer.css"
import MovieCardCustomer1 from "../cards/movieCardCustomer";
import MovieCardCustomer2 from "../cards/movieCardCustomer2";

export default function AllMoviesCustomer() {

    var [movieData, setMovieData] = useState([]);
    var [noNowShowingText, setNoNowShowingText] = useState("");
    var [noComingSoonText, setNoComingSoonText] = useState("");


    var [nowShowing, setNowShowing] = useState([]);
    var [comingSoon, setComingSoon] = useState([]);

    useEffect(() => {
        getAllMovies();
    })

     async function getAllMovies() {
         const movies = await axios({
             url: 'http://localhost:8093/api/movies',
             method: 'GET'
         })

         if(!movies){
             setNoNowShowingText("There are no showing movies at the moment");
             setNoComingSoonText("There are no coming soon movies at the moment");

         }else{
             filterMovies(movies.data);
         }
     }

     function filterMovies(data){
         var nowShowing = [];
         var comingSoon = [];
    console.log(data)
         data.map((post) => {
             if(post.showing){
                 nowShowing.push(post)

             }else{
                 comingSoon.push(post)
             }
        })
         setNowShowing(nowShowing)
         setComingSoon(comingSoon)

     }
    return (
        <div className="AllMoviesCustomer">
            <h1 className="Nowshowing">NOW SHOWING</h1>
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
                    {nowShowing.map((post) => {
                        return (
                            <div key = {post.id} className="columns">
                                <MovieCardCustomer1 details = {post}/>
                            </div>
                        )
                    })}

                </div>
            </div>
            <br/>
            <h1 className="Nowshowing">COMING SOON</h1>

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
                    {comingSoon.map((post) => {
                        return (
                            <div key = {post.id} className="columns">
                                <MovieCardCustomer2 details = {post}/>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>

    );
}