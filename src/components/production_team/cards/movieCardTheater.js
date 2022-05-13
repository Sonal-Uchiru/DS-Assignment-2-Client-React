import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/movieCardTheater.css"
import UpdateShowTimeModalll from "./../modals/updateShowTime";
import Swal from "sweetalert2";

export default function MovieCardTheater(props) {
    let theaterId = "6277e51007fed789651bd99e";
    let movieID = "627b7d9444c5e224032feeb4";
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let movieDetails = props.movieDetails;
    let showTimeDetails = props.showTimeDetails;
    let [showTimeStatus, setShowTimeStatus] = useState('');

    useEffect(()=> {
        setShowTimeStatus(showTimeDetails.status)

    }, [])
    async function deleteShowtime(){
        Swal.fire({
            title: "Are you sure you want to delete this?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, deactivate it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    url: 'http://localhost:8093/api/showtimes/',
                    method: 'DELETE',
                    headers: {"x-auth-token":userToken}
                }).then((res)=> {
                    showAlerts(1, "Show time deleted successfully")
                }).catch((err) => {
                    showAlerts(2, err)
                })

            }

        })


    }

    async function changeStatus(){
        if(showTimeStatus == 1){
            deactivateShowtime()
        }else{
            activateShowTime()
        }

    }
    function deactivateShowtime(){
        Swal.fire({
            title: "Are you sure you want to deactivate this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, deactivate it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    url: `http://localhost:8093/api/showtimes/${showTimeDetails.id}/status`,
                    method: 'PATCH',
                    headers: {"x-auth-token":userToken},
                }).then((res)=>{
                    showAlerts(1, "Show time deactivated")
                    showTimeStatus ==1 ? setShowTimeStatus(2) : setShowTimeStatus(1)

                }).catch((err) => {
                    alert(err);
                    showAlerts(2, err)
                })

            }

        })
    }

    function activateShowTime(){
        Swal.fire({
            title: "Are you sure you want to activate this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, activate it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    url: `http://localhost:8093/api/showtimes/${showTimeDetails.id}/status`,
                    method: 'PATCH',
                    headers: {"x-auth-token":userToken},
                }).then((res)=>{
                    showAlerts(1, "Show time activated")
                    showTimeStatus ==1 ? setShowTimeStatus(2) : setShowTimeStatus(1)

                }).catch((err) => {
                    alert(err);
                    showAlerts(2, err)
                })

            }

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
        <div className="MovieCardTheater">
            <div className="card">
                <h3 className="text-center time">{showTimeDetails.show_time}</h3>
                <img src={movieDetails.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h4 className="card-title">{movieDetails.name}</h4>
                        </div>

                        <div className="col-4">

                            <img src="./../images/imdb.png" className="imdb"/>
                            <div className="row">
                                <div className="col"><img src="./../images/star.png" className="star"/></div>
                                <div className="col"><h6 className="rating">8.1/10</h6></div>
                            </div>

                        </div>
                    </div>
                    <p className="text">{movieDetails.duration}</p>
                    <p className="status">{movieDetails.showing? "Now Showing": "Coming soon"}</p><br/>
                    <div className="text-center">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <UpdateShowTimeModalll  showTimeDetails = {showTimeDetails} movieDetails = {movieDetails}/>

                            <button onClick = {()=> deleteShowtime()} type="button" className="btn grp1"><img src="./../images/delete.png"
                                                                            className="icon"
                                                                            alt="..."/></button>


                        </div>

                    </div>
                </div>
                <div className="text-center">
                    <label className="switch">

                        {showTimeStatus == "1" ? <input
                            type="checkbox"
                            onClick = {()=> changeStatus()}
                            checked

                        />: <input
                            type="checkbox"
                            onClick = {()=> changeStatus()}
                            unchecked
                        />}

                        <span className="slider round"/>
                    </label>
                </div>
                <br/>
            </div>
        </div>

    );
}