import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/movieCardCustomer.css"
import GetRating from "./../../../imdb_api/getRatingByImdbMovieId"
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function MovieCardCustomer1(props) {
    let [ratings, setRatings] = useState("")
    let navigate = useNavigate()

    useEffect(()=> {
        getImdbRatings(props.details.imdb_key)
    })

    async function getImdbRatings(key){
        await GetRating(key).then((res)=>{
            console.log(res)
            setRatings(res)
        }).catch((err)=> {
            showAlerts(2, err)
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
        <div className="MovieCardCustomer">
            <div className="card">

                <img src={props.details.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h4 className="card-title">{props.details.name}</h4>
                        </div>

                        <div className="col-4">
                            <img src="./../images/imdb.png" className="imdb"/>
                            <div className="row">
                                <div className="col"><img src="./../images/star.png" className="star"/></div>
                                <div className="col"><h6 className="rating">{ratings}/10</h6></div>
                            </div>
                        </div>
                    </div>
                    {props.details.showing? <p className="status">Now Showing</p> : <p className="status">Coming Soon</p>}
                    <br/>
                </div>
                <br/>
                <button
                    className="btn btn-warning text-light"
                    onClick={() => navigate('/movie/' + props.details.id)}
                >
                    <b>View More</b>
                </button>
            </div>
        </div>

    );
}