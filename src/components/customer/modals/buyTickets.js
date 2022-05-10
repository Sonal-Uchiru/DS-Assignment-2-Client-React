import React, {useState} from "react";
import axios from "axios";
import "./../css/buyTickets.css"


export default function BuyTicket() {

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
                                        <input type="text" className="form-control" id="Stime" placeholder="9.00 AM"
                                               readOnly/>
                                    </div>

                                    <div className="mb-3">
                                        <label for="Mname" className="form-label">Movie Name</label>
                                        <input type="text" className="form-control" id="Mname" placeholder="THE BATMAN"
                                               readOnly/>
                                    </div>

                                    <div className="mb-3">
                                        <label for="Ctickets" className="form-label">Child-tickets <b style={{color:"#041C32", fontSize:"14px"}}>(LKR 850.00)</b></label>
                                        <input type="text" className="form-control" id="Ctickets" placeholder="2"/>
                                    </div>


                                    <div className="mb-3">
                                        <label for="Atickets" className="form-label">Adult-tickets <b style={{color:"#041C32", fontSize:"14px"}}>(LKR 1300.00)</b></label>
                                        <input type="text" className="form-control" id="Atickets" placeholder="2"/>
                                    </div>

                                    <p className="total">Total: <b style={{color: "#ECB365"}}>LKR 3600.00</b></p>


                                </form>
                            </div>


                            <br/>


                        </div>
                        <div className="modal-footer border-0">
                            <div className="row text-center">
                                <div className="col">
                                    <button type="button" className="btn5 btn-lg">Buy Tickets</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn6 btn-lg">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
