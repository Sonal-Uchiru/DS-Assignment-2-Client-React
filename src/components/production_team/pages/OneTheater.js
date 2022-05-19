import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/oneTheater.css"
import MovieCardTheater from "../cards/movieCardTheater";
import ShowTimeModal from "./../modals/addNewShowTime";
import Swal from "sweetalert2";
import LoadingDiv from "../../external_components/loading";
import { useLocation } from "react-router-dom";


export default function OneTheater() {

    let userToken = localStorage.getItem('moon-cinema-token');
    let location =useLocation();
    const theaterId =location.pathname.substring(9);

    let [theaterDetails, setTheaterDetails] = useState({})
    let [showTimes, setShowTimes] = useState([])
    let [errorText, setErrorText] = useState("")

    let [loadingStatus, setLoadingStatus] = useState(true)
    let [theaterMainImage, setTheaterMainImage ] = useState("https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg")
    let [theaterLogo, setTheaterLogo ] = useState("https://glenosps.sa.edu.au/wp-content/uploads/2021/07/logo.png")

    useEffect(()=> {
        console.log(location.pathname)
        console.log(theaterId)

        setLoadingStatus(false)
        getTheaterDetails()
        getShowTimeDetails()
    }, [])

    async function getTheaterDetails(){
        await axios({
            url: `http://localhost:8093/api/theaters/${theaterId}`,
            method: 'GET',
            headers: {"x-auth-token":userToken}

        }).then((res)=> {

            setTheaterDetails(res.data)
            setTheaterMainImage(res.data.image)
            setTheaterLogo(res.data.logo)

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
            if(res.data.length > 0){
                setShowTimes(res.data)
                setErrorText("")

            }else{
                setShowTimes([])
                setErrorText("No show times available")
            }
            setLoadingStatus(true)
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
                <img src={theaterLogo} className="logo"/>
            </div>
            <div className="theaterName">
                <h1 className="Tname">{theaterDetails.name}</h1>
            </div>

            <div className="box2">
                <img src={theaterMainImage} className="TheaterImage" alt=""/>
            </div>
            <br/><br/>
            <div hidden = {loadingStatus}  className="container justify-content-center">
                <br/><br/>
                <center>
                    <LoadingDiv type={"bars"} color={"#ECB365"} height={"50px"} width={"50px"}/>
                </center>
            </div>

            <div hidden = {!loadingStatus} className="containerrr">
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
                <div hidden = {loadingStatus}  className="container justify-content-center">
                    <center>
                        <LoadingDiv type={"bars"} color={"#ECB365"} height={"50px"} width={"50px"}/>
                    </center>
                </div>

                <div className="row parent">
                    <center><h4 className="text-danger">{errorText}</h4></center>

                    {showTimes.map((post)=> {
                        return (
                            <div className="colmn">
                                <MovieCardTheater key = {post.showTime.id} theaterID = {theaterId} movieDetails = {post.movie} showTimeDetails = {post.showTime} getDetailsFunction2 = {getShowTimeDetails} />
                            </div>

                        )
                    })}
                </div>

            </div>

            <br/><br/><br/>


        </div>

    );
}