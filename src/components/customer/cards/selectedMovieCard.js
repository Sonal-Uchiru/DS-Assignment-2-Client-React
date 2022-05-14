import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/selectedMovieCard.css"
import Swal from "sweetalert2";

export default function SelectedMovieCard(props) {
    let theaterDetails = props.theaterDetails
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let [showTime, setShowTime] = useState([])

    let [viewMore, setviewMore] = useState(false);

    useEffect(()=> {
        console.log(theaterDetails)
        getShowTimeDetails()

    },[])

    async function getShowTimeDetails(){
        await axios({
            url: `http://localhost:8093/api/showtimes/theaters/${theaterDetails.id}`,
            method: "GET",
            headers: {"x-auth-token":userToken}

        }).then((res)=> {
            console.log(res.data)
            setShowTime(res.data)
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
        <div className="SelectedMovieCard">
            <div id="accordion">
            {/*<div className="card mb-3">*/}
            {/*    <div className="row g-0">*/}
            {/*        <div className="col-md-4">*/}
            {/*            <img src="./../images/batman.jpg" className="img-fluid rounded Img" alt="..."/>*/}
            {/*        </div>*/}
            {/*        <div className="col-md-8">*/}
            {/*            <div className="card-body">*/}
            {/*                <h2 className="card-title">{movieDetails.name}</h2><br/>*/}
            {/*                <h4 className="location">{theaterDetails.location}</h4>*/}
            {/*                <br/>*/}
            {/*                <h4 className="tprice"> Child-Ticket Price: <b className="price">LKR {theaterDetails.child_ticket_price}.00</b></h4>*/}
            {/*                <h4 className="tprice"> Adult-Ticket Price: <b className="price">LKR {theaterDetails.adult_ticket_price}.00 </b></h4>*/}



            {/*            </div>*/}
            {/*            <button type="button" id="viewMore" className="btnView btn-lg" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">View more<img src="./../images/more.png" className="Img5" alt="..."/></button>*/}
            {/*        </div>*/}
            {/*        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">*/}

            {/*            <div className="titl"><h2 className="show"> Show Times</h2></div>*/}
            {/*            <div className="row parent">*/}
            {/*                <div className="columns">*/}
            {/*                    <div className="crd">*/}
            {/*                        <p className="dtil">Screen Time: 9.00 AM</p>*/}
            {/*                        <p className="dtil">Available Seats: 50</p>*/}
            {/*                        <button type="button" className="btnB">Buy tickets</button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="columns">*/}
            {/*                    <div className="crd">*/}
            {/*                        <p className="dtil">Screen Time: 9.00 AM</p>*/}
            {/*                        <p className="dtil">Available Seats: 50</p>*/}
            {/*                        <button type="button" className="btnB">Buy tickets</button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="columns">*/}
            {/*                    <div className="crd">*/}
            {/*                        <p className="dtil">Screen Time: 9.00 AM</p>*/}
            {/*                        <p className="dtil">Available Seats: 50</p>*/}
            {/*                        <button type="button" className="btnB">Buy tickets</button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="columns">*/}
            {/*                    <div className="crd">*/}
            {/*                        <p className="dtil">Screen Time: 9.00 AM</p>*/}
            {/*                        <p className="dtil">Available Seats: 50</p>*/}
            {/*                        <button type="button" className="btnB">Buy tickets</button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}



            {/*            </div>*/}

            {/*            <button type="button" className="btnless btn-lg" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">View less<img src="./../images/less.png" className="Img5" alt="..."/></button>*/}
            {/*        </div>*/}
            {/*    </div>*/}



            {/*</div>*/}


            </div>

        </div>

    );
}