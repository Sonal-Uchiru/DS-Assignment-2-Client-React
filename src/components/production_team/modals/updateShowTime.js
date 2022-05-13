import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/updateShowTime.css"
import Swal from "sweetalert2";


export default function UpdateShowTime(props) {
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let theaterID = props.theaterID;
    const passedMovieID = props.movieID;

    useEffect(()=> {
        // getMovieDetails()
    })

    async function getMovieDetails(){
        await axios({
            url: "",
            method: "GET",
            headers: {"x-auth-token":userToken}

        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=> {
            showAlerts(2, err);
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
        <div className="updateShow">

            <button data-toggle="modal" data-target="#exampleModal" type="button" className="btn  grp1">
                <img src="./../images/edit (1).png" className="icon" alt="..."/>
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h2 className="modal-title" id="exampleModalLabel">Update Show Time</h2>
                            <button type="button" className="closebtn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="container">

                                <form>


                                    <div className="mb-3">
                                        <label for="ShowTime" className="form-label">Show Time</label>
                                        <input type="text" className="form-control" id="ShowTime"
                                               placeholder="9.00 AM"/>
                                    </div>

                                    <div className="mb-3">
                                        <label for="movie" className="form-label movie">Movie</label><br/>
                                        <select name="movie" id="movie" className="form-select">
                                            <option value="sonic">Sonic the Hedgehog 2</option>
                                            <option value="kfg">K.G.F Chapter 2</option>
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
                                            <p className="story">Sequel to the 2020 live-action feature film 'Sonic the
                                                Hedgehog</p>

                                            <p className="duration"> 2 HR 30 MIN</p>
                                            <img className="imdb" alt="imdb" src="./../images/imdb (2).png"/>
                                            <p className="rating"><img class="star" alt="star"
                                                                       src="./../images/star.png"/> 8.1/10</p>
                                        </div>
                                    </div>


                                </form>
                            </div>


                            <br/>


                        </div>
                        <div className="modal-footer border-0">
                            <div className="row text-center">
                                <div className="col">
                                    <button type="button" className="btn5 btn-lg">Update</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn6 btn-lg">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
