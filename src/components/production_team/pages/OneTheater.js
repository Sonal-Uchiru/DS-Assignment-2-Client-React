import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/oneTheater.css"
import MovieCardTheater from "../cards/movieCardTheater";
import ShowTimeModal from "./../modals/addNewShowTime";
import Swal from "sweetalert2";



export default function OneTheater() {
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let theaterId = "6277e51007fed789651bd99e";
    let [theaterDetails, setTheaterDetails] = useState({})
    let [showTimes, setShowTimes] = useState([])


    useEffect(()=> {
        getTheaterDetails()
        getShowTimeDetails()
    }, [])

    async function getTheaterDetails(){
        alert("as")
        await axios({
            url: `http://localhost:8093/api/theaters/${theaterId}`,
            method: 'GET',
            headers: {"x-auth-token":userToken}

        }).then((res)=> {

            setTheaterDetails(res.data)
        }).catch((err)=> {
            showAlerts(2, err);

        })


    }

    async function getShowTimeDetails(){
        await axios({
            url: `http://localhost:8093/api/showtimes/theaters/${theaterId}`,
            method: 'GET',
            headers: {"x-auth-token":userToken}
        }).then((res)=> {
            setShowTimes(res.data)
        }).catch((err)=>{
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
        <div className="OneTheater">

            <div className="box">
                <img src={theaterDetails.logo} className="logo"/>
            </div>
            <div className="theaterName">
                <h1 className="Tname">PVR CINEMA</h1>
            </div>

            <div className="box2">
                <img src={theaterDetails.image} className="TheaterImage" alt=""/>
            </div>
            <br/><br/>
            <div className="containerrr">
                <div className="row parent">
                    <div className="col">

                        <img src="./../images/location.png" className="location" alt=""/>

                        <h3 className="locationN">Location</h3>

                        <br/><br/><br/>
                        <p className="address">{theaterDetails.location}</p>

                    </div>
                    <br/>
                    <div className="col">
                        <img src="./../images/capacity.png" className="capacity" alt=""/>

                        <h3 className="capacityY">Capacity</h3>

                        <br/><br/><br/>
                        <p className="seats">{theaterDetails.capacity} Seats</p>
                    </div>
                    <br/>
                    <div className="col">

                        <img src="./../images/ticket.png" className="child" alt=""/>
                        <h3 className="childT">Child-Ticket Price</h3>

                        <br/><br/><br/>
                        <p className="childP">LKR {theaterDetails.child_ticket_price}</p>
                    </div>

                    <br/>

                    <div className="col">

                        <img src="./../images/ticket.png" className="child" alt=""/>
                        <h3 className="adultT">Adult-Ticket Price</h3>

                        <br/><br/><br/>
                        <p className="adultP">LKR {theaterDetails.adult_ticket_price}</p>
                    </div>


                </div>

            </div>

            <h1 className="show">Show Times</h1>
            <ShowTimeModal theaterID = {theaterId} getDetailsFunction = {getShowTimeDetails} />
            <br/><br/><br/><br/>

            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                    {showTimes.map((post)=> {
                        return (
                            <div className="row parent">
                                <MovieCardTheater key = {post.showTime.id} movieDetails = {post.movie} showTimeDetails = {post.showTime} />
                            </div>

                        )
                    })}

            </div>

            <br/><br/><br/>


        </div>

    );
}