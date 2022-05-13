import React, {useState} from "react";
import "./../css/movieCartCard.css";

export default function MovieCartCard() {

    const [tickets, setTickets] = useState(1)
    const [ticket, setTickets2] = useState(1)


    function handleDecrement(){
        if(tickets > 1) {
            setTickets(prevCount => prevCount - 1)
        }
    }

    function handleIncrement(){
        setTickets(prevCount => prevCount + 1)
    }

    function handleDecrement2(){
        if(ticket > 1) {
            setTickets2(prevCount => prevCount - 1)
        }
    }

    function handleIncrement2(){
        setTickets2(prevCount => prevCount + 1)
    }


    return (
        <div className="MovieCartCard">
            <div className="card">

                <img src="./../images/batman.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">

                    <h4 className="card-title">THE BATMAN</h4>
                    <br/>
                    <div className="details">
                        <div className="row">
                            <div className="col">
                                <p className="dName">Duration</p>
                            </div>
                            <div className="col">
                                <p>2 HR 30 MIN</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p className="dName">Theater</p>
                            </div>
                            <div className="col">
                                <p >Liberty Cinema </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p className="dName">Child-Tickets</p>
                            </div>
                            <div className="col">
                                    <div className="plusMinus">
                                        <div className="btn-group btn-group-sm" role="group" aria-label="Second group">
                                            <button type="button" className="btn"  onClick={handleDecrement}> <i className = "fa fa-minus"/></button>
                                            <button  type="text" className="btn">{tickets} </button>
                                            <button type="button" className="btn" onClick={handleIncrement}> <i className = "fa fa-plus"/></button>
                                        </div>
                                    </div>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <p className="dName">Adult-Tickets</p>
                        </div>
                        <div className="col">
                            <div className="plusMinus">
                                <div className="btn-group btn-group-sm" role="group" aria-label="Second group">
                                    <button type="button" className="btn"  onClick={handleDecrement2}> <i className = "fa fa-minus"/></button>
                                    <button  type="text" className="btn">{ticket} </button>
                                    <button type="button" className="btn" onClick={handleIncrement2}> <i className = "fa fa-plus"/></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <p className="dName">Payment</p>
                        </div>
                        <div className="col">
                            <p>LKR 2500.00</p>
                        </div>
                    </div>

                        <button type="button" className="btnRemove">Remove</button>
                    </div>

                <br/>
            </div>

            <br/>

        </div>

    );
}
