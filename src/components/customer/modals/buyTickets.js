import React, {useState} from "react";
import axios from "axios";
import "./../css/buyTickets.css"


export default function BuyTicket() {
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTI1MDQ5MzU2ODYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImRheU9mWWVhciI6MTMxLCJkYXlPZldlZWsiOiJXRURORVNEQVkiLCJtb250aCI6Ik1BWSIsImRheU9mTW9udGgiOjExLCJ5ZWFyIjoyMDIyLCJtb250aFZhbHVlIjo1LCJob3VyIjoyMiwibWludXRlIjozOCwic2Vjb25kIjo1NSwibmFubyI6Njg1MDAwMDAwLCJjaHJvbm9sb2d5Ijp7ImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEiLCJpZCI6IklTTyJ9fX0.xDzxVpPzvzwi7SjrW1UUazAjGdfEOgtvlEilX5eZjnjGYPkWWdLqnkInzpQVnOxYn9zdfwcXc8z7NRIjSYxDDw";

    let [childTicket, setChildTicket] = useState("");
    let [adultTicket, setAdultTicket] = useState("");
    let [errorText, setErrorText] = useState("");

    let movieObj = {
        showTime:"9.00",
        movieName: "Bat Man",
        movieID: "1010101010" ,

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
        alert("add")

    }

    function buyTicket(){
        alert("buy")
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
                                        <label for="Ctickets" className="form-label">Child-tickets <b style={{color:"#041C32", fontSize:"14px"}}>(LKR 850.00)</b></label>
                                        <input type="number" onKeyUp={(e) => {
                                            setChildTicket(e.target.value)
                                        }} className="form-control" id="Ctickets" placeholder="2"/>
                                    </div>


                                    <div className="mb-3">
                                        <label for="Atickets" className="form-label">Adult-tickets <b style={{color:"#041C32", fontSize:"14px"}}>(LKR 1300.00)</b></label>
                                        <input type="number" onKeyUp={(e) => {
                                            setAdultTicket(e.target.value)
                                        }} className="form-control" id="Atickets" placeholder="2"/>
                                        <label htmlFor="error" className="form-label text-danger">{errorText}</label>

                                    </div>

                                    <p className="total">Total: <b style={{color: "#ECB365"}}>LKR 3600.00</b></p>


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
