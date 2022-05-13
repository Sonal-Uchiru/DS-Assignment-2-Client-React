import React, {useState} from "react";
import axios from "axios";
import "./../css/selectedMovieCard.css"

export default function SelectedMovieCard() {

    let [viewMore, setviewMore] = useState(false);

    return (
        <div className="SelectedMovieCard">
            <div id="accordion">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="./../images/batman.jpg" className="img-fluid rounded Img" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">THE BATMAN</h2><br/>
                            <h4 className="location">One Galle Face</h4>
                            <br/>
                            <h4 className="tprice"> Child-Ticket Price: <b className="price">LKR 850.00</b></h4>
                            <h4 className="tprice"> Adult-Ticket Price: <b className="price">LKR 1400.00 </b></h4>



                        </div>
                        <button type="button" id="viewMore" className="btnView btn-lg" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">View more<img src="./../images/more.png" className="Img5" alt="..."/></button>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">

                        <div className="titl"><h2 className="show"> Show Times</h2></div>
                        <div className="row parent">
                            <div className="columns">
                                <div className="crd">
                                    <p className="dtil">Screen Time: 9.00 AM</p>
                                    <p className="dtil">Available Seats: 50</p>
                                    <button type="button" className="btnB">Buy tickets</button>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="crd">
                                    <p className="dtil">Screen Time: 9.00 AM</p>
                                    <p className="dtil">Available Seats: 50</p>
                                    <button type="button" className="btnB">Buy tickets</button>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="crd">
                                    <p className="dtil">Screen Time: 9.00 AM</p>
                                    <p className="dtil">Available Seats: 50</p>
                                    <button type="button" className="btnB">Buy tickets</button>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="crd">
                                    <p className="dtil">Screen Time: 9.00 AM</p>
                                    <p className="dtil">Available Seats: 50</p>
                                    <button type="button" className="btnB">Buy tickets</button>
                                </div>
                            </div>



                        </div>

                        <button type="button" className="btnless btn-lg" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">View less<img src="./../images/less.png" className="Img5" alt="..."/></button>
                    </div>
                </div>



            </div>


            </div>

        </div>

    );
}