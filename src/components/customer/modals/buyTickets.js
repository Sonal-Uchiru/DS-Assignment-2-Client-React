import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/buyTickets.css"
import Swal from "sweetalert2";


export default function BuyTicket() {
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTI1MDQ5MzU2ODYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImRheU9mWWVhciI6MTMxLCJkYXlPZldlZWsiOiJXRURORVNEQVkiLCJtb250aCI6Ik1BWSIsImRheU9mTW9udGgiOjExLCJ5ZWFyIjoyMDIyLCJtb250aFZhbHVlIjo1LCJob3VyIjoyMiwibWludXRlIjozOCwic2Vjb25kIjo1NSwibmFubyI6Njg1MDAwMDAwLCJjaHJvbm9sb2d5Ijp7ImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEiLCJpZCI6IklTTyJ9fX0.xDzxVpPzvzwi7SjrW1UUazAjGdfEOgtvlEilX5eZjnjGYPkWWdLqnkInzpQVnOxYn9zdfwcXc8z7NRIjSYxDDw";
    let theaterID = "6277e51007fed789651bd99e";
    let showTimeID = "6277e51007fed789651bd99e";

    let [childTicket, setChildTicket] = useState("");
    let [adultTicket, setAdultTicket] = useState("");
    let [childTicketPrice, setChildTicketPrice] = useState(0);
    let [adultTicketPrice, setAdultTicketPrice] = useState(0);

    let [totalPrice, setTotalPrice] = useState("")
    let [errorText, setErrorText] = useState("");
    let ticketAdult = 0;
    let ticketChild = 0;

    let movieObj = {
        showTime:"9.00",
        movieName: "Bat Man",
        movieID: "1010101010" ,

    }

    useEffect(() => {
        getTheaterDetails()
    }, [])

    function getTheaterDetails(){
        axios({
            url: `http://localhost:8093/api/theaters/${theaterID}`,
            method: "GET",
            headers: {"x-auth-token":userToken}
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

    function calcTotal(count, type){
        if(type === 1){
            setChildTicket(count)
            ticketChild = count
        }else{
            setAdultTicket(count)
            ticketAdult = count
        }

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
                            <button type="button" className="closebtn" data-dismiss="modal" aria-label="Close">
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
                                            setChildTicket(e.target.value); calcTotal(e.target.value, 1)
                                        }} className="form-control" id="Ctickets" placeholder="2"/>
                                    </div>


                                    <div className="mb-3">
                                        <label for="Atickets" className="form-label">Adult-tickets <b style={{color:"#041C32", fontSize:"14px"}}>(LKR {adultTicketPrice})</b></label>
                                        <input type="number" onKeyUp={(e) => {
                                            setAdultTicket(e.target.value); calcTotal(e.target.value, 2)
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
                                    <button onClick = {() => checkValidity(1)} type="button" className="btn5 btn-lg">Buy Tickets</button>
                                </div>
                                <div className="col">
                                    <button onClick = {() => checkValidity(2)} type="button" className="btn6 btn-lg">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
