import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/addNewShowTime.css"

export default function AddNewShowTime(props) {
    let theaterID = props.theaterID;
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTI1MDQ5MzU2ODYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImRheU9mWWVhciI6MTMxLCJkYXlPZldlZWsiOiJXRURORVNEQVkiLCJtb250aCI6Ik1BWSIsImRheU9mTW9udGgiOjExLCJ5ZWFyIjoyMDIyLCJtb250aFZhbHVlIjo1LCJob3VyIjoyMiwibWludXRlIjozOCwic2Vjb25kIjo1NSwibmFubyI6Njg1MDAwMDAwLCJjaHJvbm9sb2d5Ijp7ImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEiLCJpZCI6IklTTyJ9fX0.xDzxVpPzvzwi7SjrW1UUazAjGdfEOgtvlEilX5eZjnjGYPkWWdLqnkInzpQVnOxYn9zdfwcXc8z7NRIjSYxDDw";
    let [movieData, setMovieData] = useState([]);
    let [selectedMovie, setSelectedMovie] = useState("");
    let [selectShowTime, setSelectShowTime] = useState("");

    let [selectedMovieObj, setSelectedMovieObj] = useState({});


    useEffect(() => {
        getAllMovies()
    }, [])

    async function getAllMovies(){
        const movies = await axios({
            url: 'http://localhost:8093/api/movies',
            method: 'GET',
            header: userToken
        }).catch((err) => {
            alert(err);
        })

        if(!movies){
            alert("No movies available")
        }else{
            setMovieData(movies.data);
        }
    }

    async function addShowTime(e){
        e.preventDefault();

        let showTimeObj = {
            theater_id: theaterID,
            movie_id: selectedMovie,
            show_time: selectShowTime
        }
        console.log(showTimeObj)


        // let result = await axios({
        //     url: "http://localhost:8093/api/showtimes",
        //     method: "POST",
        //     header: userToken,
        //     data: showTimeObj
        // }).catch((err)=> {
        //             alert(err)
        //         })
    }

    async function fillMovieData(e){
        let movieID = e.target.value
        setSelectedMovie(movieID);

        let result = await axios({
            url: `http://localhost:8093/api/showtimes/${movieID}`,
            method: "POST",
            header: userToken,
        }).catch((err)=> {
            alert(err)
        })

        let movieObj = {
            image: result.data.image,
            storyline: result.data.story_line,
            duration: result.data.duration
        }
        setSelectedMovieObj(movieObj);
    }
    return (
        <div className="addShow">
            <button type="button" className="btn btn-lg ADD" data-toggle="modal" data-target="#exampleModal">
                Add new Showtime
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h2 className="modal-title" id="exampleModalLabel">Add Show Time</h2>
                            <button type="button" className="closebtn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form onSubmit={addShowTime}>

                                    <div className="mb-3">
                                        <label for="showTime" className="form-label">Show Time</label>
                                        <input type="time" className="form-control" id="Mtime" placeholder="9.00 AM" required
                                               onChange={(e)=> {
                                                   setSelectShowTime(e.target.value)
                                                }}/>
                                    </div>

                                    <div className="mb-3">
                                        <label for="movie" className="form-label movie">Movie</label><br/>
                                        <select name="movie" id="movie" className="form-select"  required
                                                onChange={(e) => {
                                                fillMovieData(e.target.value);
                                        }}>
                                            <option value = "">Select a Movie</option>
                                            {movieData.map((post) => {
                                                return (
                                                    <option key = {post.id} value = {post.id}>{post.name}</option>
                                                )
                                            })}

                                        </select>
                                    </div>


                                    <div className="row">
                                        <div className="column left">
                                            <div className="box">
                                                <img className="z-depth-2 Img1" alt="100x100"
                                                     src="./../images/sonic.jpg"
                                                     data-holder-rendered="true"/>
                                            </div>
                                        </div>

                                        <div className="column right">
                                            <p className="story">{selectedMovieObj.storyline}</p>

                                            <p className="duration"> {selectedMovieObj.duration}</p>
                                            <img className="imdb" alt="imdb" src="./../images/imdb%20(2).png"/>
                                            <p className="rating"><img className="star" alt="star"
                                                                       src="./../images/star.png"/> 8.1/10</p>
                                        </div>
                                    </div>

                                    <div className="modal-footer border-0">
                                        <button type="submit" className="btn-lg btn5">Add</button>
                                    </div>
                                </form>
                            </div>


                            <br/>


                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
