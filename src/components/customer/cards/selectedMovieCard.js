import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/selectedMovieCard.css"
import BuyTicket from "../modals/buyTickets";
import Swal from "sweetalert2";
import "./../css/buyTickets.css"
import StripeCheckout from 'react-stripe-checkout';

export default function SelectedMovieCard(props) {
    let theaterDetails = props.dataObject.theater
    let showTimeDetails = props.dataObject.showTimes

    let movieDetails = props.movieDetails
    let userToken = localStorage.getItem('moon-cinema-token');

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

    let [mainImage, setMainImage] = useState("https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg")



    useEffect(()=> {
        setMainImage(movieDetails.image)
    },[])

    useEffect(()=> {
        calcTotal()

    }, [childTicket, adultTicket])



    async function showAlerts(type, text){
        // type 1 = success, type 2 = error, type 3 = update success
        if(type === 1){
            await Swal.fire({
                position: "center",
                icon: "success",
                title: text,
                showConfirmButton: false,
                timer: 1500,
            });
        }else if(type === 2){
           await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: text,
                footer: '<p style = "color : #D0193A">Currently unavailable!',
            });
        }
    }

    // Modal details
    function calcTotal(){

        let total = (adultTicket * adultTicketPrice) + (childTicket * childTicketPrice);
        setTotalPrice(total)
    }


    function checkValidity(type){
        if(adultTicket === ""){
            setErrorText("You should buy at least one adult ticket")
        }else{
            setErrorText("")
            if(type === 1)
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
            setChildTicket('0');
            setAdultTicket('0')
        }).catch((err)=> {
            showAlerts(1, err)
        })

    }

    async function buyTicket() {
        document.getElementById('stripeBtn').click()
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
            text: error,
        });
    };


    function assignModalData(showtime, showTimeID){
        setAdultTicketPrice(theaterDetails.adult_ticket_price)
        setChildTicketPrice(theaterDetails.child_ticket_price)
        setShowTime(showtime)
        setShowTimeID(showTimeID)
    }


    function checkPayment(token, address) {
        console.log(token)
        console.log(address)

    }


    return (
        <div className="SelectedMovieCard">
            <div id="accordion">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src= {mainImage} className="img-fluid rounded Img" alt="..."/>
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


                                        <StripeCheckout
                                            hidden
                                            id = "stripeBtn"
                                            stripeKey = "pk_test_51L1Q3MGgPBz98WbHVedHKSt0NiFFnu71L0y8uBIcX9hU2s5m1YjAbvsCffwvuHnNd8so8Bj1OY6SZ5hxMFyeQi7s00VUaKLWpk"
                                            token = {checkPayment}
                                            name="Moon Cinemas." // the pop-in header title
                                            image="./../../../images/footer.svg" // the pop-in header image (default none)
                                            ComponentClass="div"
                                            panelLabel="Pay"
                                            description="Enter your card details"
                                            amount = {totalPrice / 360}
                                            // cardno = 4242 4242 4242 4242
                                            // date = 04 / 24
                                            // cvc = 424
                                        >
                                            <button type="button" className="btn5 btn-lg">Buy Ticket</button>
                                        </StripeCheckout>
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