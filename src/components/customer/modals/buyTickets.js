import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/buyTickets.css"
import Swal from "sweetalert2";


export default function BuyTicket() {
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";
    let theaterID = "6277e51007fed789651bd99e";
    let showTimeID = "6277e51007fed789651bd99e";

    let [childTicket, setChildTicket] = useState("");
    let [adultTicket, setAdultTicket] = useState("");
    let [childTicketPrice, setChildTicketPrice] = useState(0);
    let [adultTicketPrice, setAdultTicketPrice] = useState(0);

    let [totalPrice, setTotalPrice] = useState("")
    let [errorText, setErrorText] = useState("");
    var ticketAdult = 0;
    var ticketChild = 0;
    let movieObj = {
        showTime:"9.00",
        movieName: "Bat Man",
        movieID: "1010101010" ,

    }

    useEffect(() => {
        getTheaterDetails()
        // getResearvedMovie()
    }, [])

    useEffect(()=> {
        calcTotal()

    }, [childTicket, adultTicket])

    function getTheaterDetails(){
        axios({
            url: `http://localhost:8093/api/theaters/${theaterID}`,
            method: "GET",
            headers: {"x-auth-token": userToken}
        }).then((res)=>{
            console.log(res.data)
            setAdultTicketPrice(res.data.adult_ticket_price)
            setChildTicketPrice(res.data.child_ticket_price)

        }).catch((err)=>{
            showAlerts(2, err)
        })

    }

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

    function buyTicket(){
        alert("buy")
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

    function calcTotal(){

        console.log(adultTicket)
        console.log(childTicket)
        let total = (adultTicket * adultTicketPrice) + (childTicket * childTicketPrice);
        setTotalPrice(total)
    }


    return (
        <div className="buyTicket">

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h2 className="modal-title" id="exampleModalLabel">Buy Tickets</h2>
                            <button type="button" id = "closeModalbtn" className="closebtn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form>
                                    <div className="mb-3">
                                        <label for="Stime" className="form-label">Show Time</label>
                                        <input type="text" value = {movieObj.showTime} className="form-control" id="Stime" placeholder="9.00 AM"
                                               readOnly/>
                                    </div>

                                    <div className="mb-3">
                                        <label for="Mname" className="form-label">Movie Name</label>
                                        <input type="text" value = {movieObj.movieName} className="form-control" id="Mname" placeholder="THE BATMAN"
                                               readOnly/>
                                    </div>

                                    <div className="mb-3">
                                        <label for="Ctickets" className="form-label">Child-tickets <b style={{color:"#041C32", fontSize:"14px"}}>(LKR {childTicketPrice})</b></label>
                                        <input type="number" onKeyUp={(e) => {
                                            setChildTicket(e.target.value)
                                        }} className="form-control" id="Ctickets" placeholder="2"/>
                                    </div>


                                    <div className="mb-3">
                                        <label for="Atickets" className="form-label">Adult-tickets <b style={{color:"#041C32", fontSize:"14px"}}>(LKR {adultTicketPrice})</b></label>
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
                                    <button onClick = {() => checkValidity(2)} type="button" className="btn5 btn-lg">Buy Tickets</button>
                                </div>
                                <div className="col">
                                    <button onClick = {() => checkValidity(1)} type="button" className="btn6 btn-lg">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
