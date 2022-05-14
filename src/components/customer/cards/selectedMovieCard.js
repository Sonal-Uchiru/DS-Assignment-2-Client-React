import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/selectedMovieCard.css"
import BuyTicket from "../modals/buyTickets";
import Swal from "sweetalert2";
import "./../css/buyTickets.css"

export default function SelectedMovieCard(props) {
    let theaterDetails = props.dataObject.theater
    let showTimeDetails = props.dataObject.showTimes

    let movieDetails = props.movieDetails
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let [showTime, setShowTime] = useState("")
    let [viewMore, setviewMore] = useState(false);
    let [viewMoreHidden, setViewMoreHidden] = useState(true)
    let [viewLessHidden, setViewLessHidden] = useState(false)


    //Modal details
    let [childTicket, setChildTicket] = useState("");
    let [adultTicket, setAdultTicket] = useState("");

    let [childTicketPrice, setChildTicketPrice] = useState(0);
    let [adultTicketPrice, setAdultTicketPrice] = useState(0);

    let [totalPrice, setTotalPrice] = useState("")
    let [errorText, setErrorText] = useState("");

    let [showTimeID, setShowTimeID] = useState("");

    useEffect(()=> {
        console.log(theaterDetails)

    },[])

    useEffect(()=> {
        calcTotal()

    }, [childTicket, adultTicket])



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

    // Modal details
    function calcTotal(){

        console.log(adultTicket)
        console.log(childTicket)
        let total = (adultTicket * adultTicketPrice) + (childTicket * childTicketPrice);
        setTotalPrice(total)
    }

    // function getTheaterDetails(){
    //     axios({
    //         url: `http://localhost:8093/api/theaters/${theaterID}`,
    //         method: "GET",
    //         headers: {"x-auth-token": userToken}
    //     }).then((res)=>{
    //         console.log(res.data)
    //         setAdultTicketPrice(res.data.adult_ticket_price)
    //         setChildTicketPrice(res.data.child_ticket_price)
    //
    //     }).catch((err)=>{
    //         showAlerts(2, err)
    //     })
    //
    // }

    function checkValidity(type){
        if(adultTicket == ""){
            setErrorText("You should buy at least one adult ticket")
        }else{
            setErrorText("")
            if(type == 1)
                addToCart()
            else
                buyTicket()
        }



    }

    function addToCart(){

        let cartObj = {
            show_time_id: showTimeID,
            child_tickets: childTicket,
            adult_tickets: adultTicket ,

        }
        axios({
            url: "http://localhost:8093/api/carts",
            method: "POST",
            headers: {"x-auth-token":userToken},
            data: cartObj
        }).then((res)=> {
            showAlerts(1, "Movie is added to your cart")
            document.getElementById('closeModalbtn').click()

        }).catch((err)=> {
            showAlerts(1, err)
        })

    }

    async function buyTicket() {

        var payment = {
            // whether it is a testing environment or not
            sandbox: true,
            merchant_id: "1219390", // Replace your Merchant ID
            return_url: undefined, // Important
            cancel_url: undefined, // Important
            notify_url: "http://sample.com/notify",
            order_id: "MT" + new Date().valueOf(),
            items: "movieObj.movieName",
            amount: "2000",
            currency: "USD",
            first_name: "DS",
            email: "asdasd@gmail.com",
            phone: "DS",
            address: "",
            city: "",
            delivery_address: "",
            delivery_city: "",
            delivery_country: "",
            custom_1: "",
            custom_2: "",
        };

        // Show the payhere.js popup, when "PayHere Pay" is clicked
        window.payhere.startPayment(payment);
    }
    window.payhere.onCompleted = function onCompleted(orderId) {
        // postOrder(orderId);
    };

    // Called when error happens when initializing payment such as invalid parameters
    window.payhere.onError = function onError(error) {
        // Note: show an error page
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    };

    function assignModalData(showtime, showTimeID){
        setAdultTicketPrice(theaterDetails.adult_ticket_price)
        setChildTicketPrice(theaterDetails.child_ticket_price)
        setShowTime(showtime)
        setShowTimeID(showTimeID)
    }
    return (
        <div className="SelectedMovieCard">
            <div id="accordion">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src= {movieDetails.image} className="img-fluid rounded Img" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{movieDetails.name}</h2><br/>
                            <h4 className="location">{theaterDetails.location}</h4>
                            <br/>
                            <h4 className="tprice"> Child-Ticket Price: <b className="price">LKR {theaterDetails.child_ticket_price}.00</b></h4>
                            <h4 className="tprice"> Adult-Ticket Price: <b className="price">LKR {theaterDetails.adult_ticket_price}.00 </b></h4>



                        </div>
                        <button type="button" id="viewMore" className="btnView btn-lg" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" hidden = {viewMoreHidden} aria-controls="collapseOne"  onClick = {()=> {setViewLessHidden(false); setViewMoreHidden(true)}}>View more<img src="./../images/more.png" className="Img5" alt="..."/></button>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">

                        <div className="titl"><h2 className="show"> Show Times</h2></div>
                        <div className="row parent">

                            {showTimeDetails.map((post)=> {
                                return (
                                    <div key = {post.id} className="columns">
                                        <div className="crd">
                                            <p className="dtil">Screen Time: {post.show_time}</p>
                                            <p className="dtil">Available Seats: 50</p>
                                            <button type="button" className="btn btn-primary btnB" data-toggle="modal" data-target="#exampleModal"
                                            onClick={()=> assignModalData(post.show_time, post.show_time)}>
                                                Buy Ticket
                                            </button>
                                            {/*<button type="button" className="btnB">Buy tickets</button>*/}
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                        <button type="button" className="btnless btn-lg" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" hidden = {viewLessHidden} aria-controls="collapseOne" onClick = {()=> {setViewLessHidden(true); setViewMoreHidden(false)}} >View less<img src="./../images/less.png" className="Img5" alt="..."/></button>
                    </div>
                </div>
            </div>


            </div>

            {/*Buy ticket Modal*/}
            <div className="buyTicket">
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h2 className="modal-title" id="exampleModalLabel">Buy Tickets</h2>
                                <button type="button" id="closeModalbtn" className="closebtn" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="Stime" className="form-label">Show Time</label>
                                            <input type="text" value={showTime} className="form-control" id="Stime"
                                                   placeholder="9.00 AM"
                                                   readOnly/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="Mname" className="form-label">Movie Name</label>
                                            <input type="text" value={movieDetails.name} className="form-control"
                                                   id="Mname" placeholder="THE BATMAN"
                                                   readOnly/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="Ctickets" className="form-label">Child-tickets <b style={{
                                                color: "#041C32",
                                                fontSize: "14px"
                                            }}>(LKR {childTicketPrice})</b></label>
                                            <input type="number" onKeyUp={(e) => {
                                                setChildTicket(e.target.value)
                                            }} className="form-control" id="Ctickets" placeholder="2"/>
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="Atickets" className="form-label">Adult-tickets <b style={{
                                                color: "#041C32",
                                                fontSize: "14px"
                                            }}>(LKR {adultTicketPrice})</b></label>
                                            <input type="number" onKeyUp={(e) => {
                                                setAdultTicket(e.target.value)
                                            }} className="form-control" id="Atickets" placeholder="2"/>
                                            <label htmlFor="error" className="form-label text-danger">{errorText}</label>

                                        </div>

                                        <p className="total">Total: <b style={{color: "#ECB365"}}>LKR {totalPrice}</b></p>


                                    </form>
                                </div>


                                <br/>


                            </div>
                            <div className="modal-footer border-0">
                                <div className="row text-center">
                                    <div className="col">
                                        <button onClick={() => checkValidity(2)} type="button" className="btn5 btn-lg">Buy
                                            Tickets
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button onClick={() => checkValidity(1)} type="button" className="btn6 btn-lg">Add
                                            to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}