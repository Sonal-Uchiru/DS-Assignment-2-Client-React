import React, {useState} from "react";
import axios from "axios";
import "../css/reservationCard.css"

export default function ReservationCard() {

    return (
        <div className="ReservationCard">

            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="./../images/batman.jpg" className="img-fluid rounded-start Img" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="status"> Now Showing</h5>
                            <h2 className="card-title">THE BATMAN</h2><br/>

                            <div className="details">
                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Duration</p>
                                    </div>
                                    <div className="col">
                                        <p>2 HR 30 MIN</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Theater</p>
                                    </div>
                                    <div className="col">
                                        <p>Liberty Cinema</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Show Time</p>
                                    </div>
                                    <div className="col">
                                        <p>9.30 AM</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Child-Tickets</p>
                                    </div>
                                    <div className="col">
                                        <p>2</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Adult-Tickets</p>
                                    </div>
                                    <div className="col">
                                        <p>2</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Payment</p>
                                    </div>
                                    <div className="col">
                                        <p>LKR 6000.00</p>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <button type="button" className="btnCancel btn-lg">Cancel Reservation</button>
                    </div>
                </div>


            </div>

        </div>

    );
}