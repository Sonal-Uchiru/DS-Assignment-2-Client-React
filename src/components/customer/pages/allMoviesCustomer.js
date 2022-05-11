import React, {useState, useEffect} from "react";
import axios from "axios";
import "./../css/allMoviesCustomer.css"
import MovieCardCustomer1 from "../cards/movieCardCustomer";
import MovieCardCustomer2 from "../cards/movieCardCustomer2";

export default function AllMoviesCustomer() {

    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTI1MDQ5MzU2ODYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImRheU9mWWVhciI6MTMxLCJkYXlPZldlZWsiOiJXRURORVNEQVkiLCJtb250aCI6Ik1BWSIsImRheU9mTW9udGgiOjExLCJ5ZWFyIjoyMDIyLCJtb250aFZhbHVlIjo1LCJob3VyIjoyMiwibWludXRlIjozOCwic2Vjb25kIjo1NSwibmFubyI6Njg1MDAwMDAwLCJjaHJvbm9sb2d5Ijp7ImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEiLCJpZCI6IklTTyJ9fX0.xDzxVpPzvzwi7SjrW1UUazAjGdfEOgtvlEilX5eZjnjGYPkWWdLqnkInzpQVnOxYn9zdfwcXc8z7NRIjSYxDDw";
    let [movieData, setMovieData] = useState([]);
    let [noNowShowingText, setNoNowShowingText] = useState("");
    let [noComingSoonText, setNoComingSoonText] = useState("");

    let [nowShowing, setNowShowing] = useState([]);
    let [nowShowingDataHolder, setNowShowingDataHolder] = useState([]);

    let [comingSoon, setComingSoon] = useState([]);
    let [comingSoonDataHolder, setComingSoonDataHolder] = useState([]);


    useEffect(() => {
        getAllMovies();

    }, [])

     async function getAllMovies() {

         const movies = await axios({
             url: 'http://localhost:8093/api/movies',
             method: 'GET',
             header: userToken
         }).catch((err) => {
             alert(err);
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
         data.map((post) => {
             if(post.showing){
                 nowShowing.push(post)

             }else{
                 comingSoon.push(post)
             }
        })
         setNowShowing(nowShowing)
         setNowShowingDataHolder(nowShowing)
         setComingSoon(comingSoon)
         setComingSoonDataHolder(comingSoon)

     }
     function filterByGenre(e, type){
        let genreText = e;
        if(type == 1){
            let filteredContent = nowShowingDataHolder.filter((post) =>
                post.genre.toLowerCase().includes(genreText)
            )
            if(!genreText){
                setNowShowing(nowShowingDataHolder);
                setNoNowShowingText("");
            }else{
                if(filteredContent.length > 0){
                    setNoNowShowingText("");

                }else{
                    setNoNowShowingText("No movies by genre "+ genreText);
                }
                setNowShowing(filteredContent);
            }
        }

     }

     function searchMovie(e, type){
        let searchText = e;

        if(type == 1){
            let filteredContent = nowShowingDataHolder.filter((post) =>
                post.name.toLowerCase().includes(searchText)
            )
            if(!searchText){
                setNowShowing(nowShowingDataHolder);
                setNoNowShowingText("");
            }else{
                if(filteredContent.length > 0){
                    setNoNowShowingText("");

                }else{
                    setNoNowShowingText("No movies by name "+ searchText);
                }
                setNowShowing(filteredContent);
            }
        }else{
            let filteredContent = comingSoonDataHolder.filter((post) =>
                post.name.toLowerCase().includes(searchText)
            )
            if(!searchText){
                setComingSoon(comingSoonDataHolder);
                setNoComingSoonText("");
            }else{
                if(filteredContent.length > 0){
                    setNoComingSoonText("");

                }else{
                    setNoComingSoonText("No coming soon movies by name "+ searchText);
                }
                setComingSoon(filteredContent);
            }
        }

     }
    return (
        <div className="AllMoviesCustomer">
            <h1 className="Nowshowing">NOW SHOWING</h1>
            <br/><br/>

            <div className="main">
                <div className="input-group">
                    <input type="text" onKeyUp={(e) => searchMovie(e.target.value, 1)} className="form-control" placeholder="Search Movies..."/>
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
                    <li onClick={() => filterByGenre("Action", 1)}><a className="dropdown-item" href="#">Action</a></li>
                    <li onClick={() => filterByGenre("Drama", 1)}><a className="dropdown-item" href="#">Drama</a></li>
                    <li onClick={() => filterByGenre("Horror", 1)}><a className="dropdown-item" href="#">Horror</a></li>
                    <li onClick={() => filterByGenre("Thriller", 1)}><a className="dropdown-item" href="#">Thriller</a></li>
                    <li onClick={() => filterByGenre("Comedy", 1)}><a className="dropdown-item" href="#">Comedy</a></li>
                    <li onClick={() => filterByGenre("Romance", 1)}><a className="dropdown-item" href="#">Romance</a></li>
                    <li onClick={() => filterByGenre("", 1)}><a className="dropdown-item" href="#">All</a></li>

                </ul>
            </div>

            <br/><br/><br/>

            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent">
                    <h4 className = "text text-danger text-center">{noNowShowingText}</h4>
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
                    <input onKeyUp={(e) => searchMovie(e.target.value, 2)}  type="text" className="form-control" placeholder="Search Movies..."/>
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
                    <li onClick={() => filterByGenre("Action", 2)} ><a className="dropdown-item" href="#">Action</a></li>
                    <li onClick={() => filterByGenre("Drama", 2)}><a className="dropdown-item" href="#">Drama</a></li>
                    <li onClick={() => filterByGenre("Horror", 2)}><a className="dropdown-item" href="#">Horror</a></li>
                    <li onClick={() => filterByGenre("Thriller", 2)}><a className="dropdown-item" href="#">Thriller</a></li>
                    <li onClick={() => filterByGenre("Comedy", 2)}><a className="dropdown-item" href="#">Comedy</a></li>
                    <li onClick={() => filterByGenre("Romance", 2)}><a className="dropdown-item" href="#">Romance</a></li>
                </ul>
            </div>

            <br/><br/><br/>


            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent">
                    <h4 className = "text text-danger text-center">{noComingSoonText}</h4>
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