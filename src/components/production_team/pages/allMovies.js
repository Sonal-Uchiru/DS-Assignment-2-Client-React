import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/allMovies.css"
import MovieCardProduction1 from "../cards/movieCardProduction1";
import MovieCardProduction2 from "../cards/movieCardProduction2";
import Swal from "sweetalert2";
import LoadingDiv from "../../external_components/loading";
import AddMovie from "../modals/addMovie";

export default function AllMovies() {
    let [movieData, setMovieData] = useState([]);
    let [noNowShowingText, setNoNowShowingText] = useState("");
    let [noComingSoonText, setNoComingSoonText] = useState("");
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTI1MDQ5MzU2ODYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImRheU9mWWVhciI6MTMxLCJkYXlPZldlZWsiOiJXRURORVNEQVkiLCJtb250aCI6Ik1BWSIsImRheU9mTW9udGgiOjExLCJ5ZWFyIjoyMDIyLCJtb250aFZhbHVlIjo1LCJob3VyIjoyMiwibWludXRlIjozOCwic2Vjb25kIjo1NSwibmFubyI6Njg1MDAwMDAwLCJjaHJvbm9sb2d5Ijp7ImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEiLCJpZCI6IklTTyJ9fX0.xDzxVpPzvzwi7SjrW1UUazAjGdfEOgtvlEilX5eZjnjGYPkWWdLqnkInzpQVnOxYn9zdfwcXc8z7NRIjSYxDDw";

    let [nowShowing, setNowShowing] = useState([]);
    let [nowShowingDataHolder, setNowShowingDataHolder] = useState([]);

    let [comingSoon, setComingSoon] = useState([]);
    let [comingSoonDataHolder, setComingSoonDataHolder] = useState([]);

    let [loadingStatus, setLoadingStatus] = useState(true)


    useEffect(() => {
        setLoadingStatus(false)
        getAllMovies();

    }, [])

    async function getAllMovies() {

        await axios({
            url: 'http://localhost:8093/api/movies',
            method: 'GET',
            headers: {"x-auth-token":userToken}
        }).then((res)=> {
            filterMovies(res.data);
        }).catch((err) => {
            showAlerts(2, "Something went wrong!")
        })
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
        if(comingSoon.length <= 0){
            setNoComingSoonText("There are no coming soon movies at the moment");
        }
        if(nowShowing.length <= 0){
            setNoNowShowingText("There are no showing movies at the moment");
        }
        setNowShowing(nowShowing)
        setNowShowingDataHolder(nowShowing)
        setComingSoon(comingSoon)
        setComingSoonDataHolder(comingSoon)
        setLoadingStatus(true)
    }

    function filterByGenre(e, type){
        let genreText = e;
        if(type == 1){
            let filteredContent = nowShowingDataHolder.filter((post) =>
                post.genre.toLowerCase().includes(genreText.toLowerCase())
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
        }else{
            let filteredContent = comingSoonDataHolder.filter((post) =>
                post.genre.toLowerCase().includes(genreText.toLowerCase())
            )
            if(!genreText){
                setComingSoon(comingSoonDataHolder);
                setNoComingSoonText("");
            }else{
                if(filteredContent.length > 0){
                    setNoComingSoonText("");

                }else{
                    setNoComingSoonText("No movies by genre "+ genreText);
                }
                setComingSoon(filteredContent);
            }
        }

    }

    function searchMovie(e, type){
        let searchText = e;

        if(type == 1){
            let filteredContent = nowShowingDataHolder.filter((post) =>
                post.name.toLowerCase().includes(searchText.toLowerCase())
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
                post.name.toLowerCase().includes(searchText.toLowerCase())
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

    function deleteMovie(movieId){

       Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
           if (result.isConfirmed) {
               await axios({
                   url: `http://localhost:8093/api/movies/${movieId}`,
                   method: 'DELETE',
                   headers: {"x-auth-token":userToken}
               }).then((res)=> {
                   showAlerts(1, "Movie Deleted successfully")
                   // fetchAllShowTimes(movieId)
                   // getAllMovies()
                   window.location.reload()
               }).catch((err) => {
                   alert(err);
               })

           }

       })

    }

    async function fetchAllShowTimes(movieId){
        await axios({
            url: `http://localhost:8093/api/showtimes/movies/${movieId}`,
            method: 'GET',
            headers: {"x-auth-token":userToken}
        }).then((res)=> {
            deleteShowTimes(res.data)
        }).catch((err) => {
            alert(err);
        })
    }

    function deleteShowTimes(data){
        data.map((post)=> {
            post.showTimes.map((post2)=> {
                 axios({
                    url: `http://localhost:8093/api/showtimes/${post2.id}`,
                    method: 'DELETE',
                    headers: {"x-auth-token":userToken}
                }).then((res)=> {
                    //console.log("aaa")
                }).catch(async (err) => {
                    await Swal.fire({
                         icon: 'error',
                         title: 'Oops...',
                         text: 'Something went wrong!',
                     })
                })
            })

        })
    }
    function showAlerts(type, text){
        // type 1 = success, type 2 = error, type 3 = update success
        if(type == 1){
            Swal.fire({
                position: "center",
                icon: "success",
                title: text,
                showConfirmButton: false,
                timer: 1500,
            });
        }else if(type == 2){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: text,
                footer: '<p style = "color : #D0193A">Currently unavailable!',
            });
        }
    }

    return (
        <div className="AllMovies">
            <h1 className="Nowshow">NOW SHOWING</h1>
            <br/>

            <AddMovie/>
            <br/><br/>

            <div className="main">
                <div className="input-group">
                    <input onKeyUp={(e) => searchMovie(e.target.value, 1)}  type="text" className="form-control" placeholder="Search Movies..."/>
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

            <br/><br/>
            <div hidden = {loadingStatus}  className="container justify-content-center">
                <center>
                    <LoadingDiv type={"bars"} color={"#ECB365"} height={"50px"} width={"50px"}/>
                </center>
            </div>

            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent">
                    <h4 className = "text text-danger text-center">{noNowShowingText}</h4>
                    {nowShowing.map((post) => {
                        return (
                            <div key = {post.id}  className="columns">
                                <MovieCardProduction1 details = {post} functionReload = {getAllMovies} functiondelete = {deleteMovie} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <br/>
            <h1 className="Nowshow">COMING SOON</h1>
            <br/>

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
                    <li onClick={() => filterByGenre("Action", 2)}><a className="dropdown-item" href="#">Action</a></li>
                    <li onClick={() => filterByGenre("Drama", 2)}><a className="dropdown-item" href="#">Drama</a></li>
                    <li onClick={() => filterByGenre("Horror", 2)}><a className="dropdown-item" href="#">Horror</a></li>
                    <li onClick={() => filterByGenre("Thriller", 2)}><a className="dropdown-item" href="#">Thriller</a></li>
                    <li onClick={() => filterByGenre("Comedy", 2)}><a className="dropdown-item" href="#">Comedy</a></li>
                    <li onClick={() => filterByGenre("Romance", 2)}><a className="dropdown-item" href="#">Romance</a></li>
                    <li onClick={() => filterByGenre("", 2)}><a className="dropdown-item" href="#">All</a></li>

                </ul>
            </div>

            <br/><br/>

            <div hidden = {loadingStatus}  className="container justify-content-center">
                <center>
                    <LoadingDiv type={"bars"} color={"#ECB365"} height={"50px"} width={"50px"}/>
                </center>
            </div>

            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent">
                    <h4 className = "text text-danger text-center">{noComingSoonText}</h4>

                    {comingSoon.map((post) => {
                        return (
                            <div key = {post.id} className="columns">
                                <MovieCardProduction2 details = {post} functionReload = {getAllMovies} functiondelete = {deleteMovie} />

                            </div>
                        )
                    })}

                </div>
            </div>

        </div>

    );
}