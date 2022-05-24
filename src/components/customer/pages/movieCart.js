import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './../css/movieCart.css'
import MovieCardProduction1 from '../../production_team/cards/movieCardProduction1'
import MovieCartCard from '../cards/movieCartCard'
import Example from '../../external_components/loading'
import LoadingDiv from '../../external_components/loading'
import StripeCheckout from 'react-stripe-checkout'
import Swal from 'sweetalert2'
import {ticketConfirmationEmail} from "../../../email_service/emailServices";

export default function MovieCart() {
    const [cartItems, setCartItems] = useState([])
    const [duplicateCartItems, setDuplicateCartItems] = useState([])
    const userToken = localStorage.getItem('moon-cinema-token')

    const [totalPrice, setTotalPrice] = useState(0)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [noShowingTxt, setNoShowingTxt] = useState('')
    const [emptyCartStatus,setEmptyCartStatus] = useState(true)
    useEffect(() => {
        axios({
            url: 'http://localhost:8093/api/carts',
            method: 'GET',
            headers: { 'x-auth-token': userToken },
        })
            .then((res) => {
                setLoadingStatus(true)
                if(res.data.length > 0) {
                    setCartItems(res.data)
                    setDuplicateCartItems(res.data)
                    calculateTotal(res.data)
                }else{
                    setEmptyCartStatus(false)
                }


            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    function handleSearch(userIn) {
        if(cartItems.length > 0){
            setLoadingStatus(false)
            setNoShowingTxt('')
            const result = duplicateCartItems.filter(
                (cart) =>
                    cart.showTimeWithMovieTheaterDetailsDTO.movie.name
                        .toLowerCase()
                        .includes(userIn.toLowerCase()) ||
                    cart.showTimeWithMovieTheaterDetailsDTO.theater.name
                        .toLowerCase()
                        .includes(userIn.toLowerCase())
            )

            if (result.length <= 0) {
                setNoShowingTxt('No Tickets by name ' + userIn)
            }

            setLoadingStatus(true)
            setCartItems(result)
        }

    }

    function calculateTotal(cartItems) {
        let totalPrice = 0
        cartItems.map((item) => {
            totalPrice +=
                item.cart.child_tickets *
                    item.showTimeWithMovieTheaterDetailsDTO.theater
                        .child_ticket_price +
                item.cart.adult_tickets *
                    item.showTimeWithMovieTheaterDetailsDTO.theater
                        .adult_ticket_price
        })

        setTotalPrice(totalPrice)
    }

    async function refresh() {
        await axios({
            url: 'http://localhost:8093/api/carts',
            method: 'GET',
            headers: { 'x-auth-token': userToken },
        })
            .then((res) => {
                calculateTotal(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function checkPayment(token, address) {
        await completeTicketsPayment()
        await sendConfirmationEmail()
    }

    async function completeTicketsPayment() {
        await axios({
            url: 'http://localhost:8093/api/carts',
            method: 'GET',
            headers: { 'x-auth-token': userToken },
        })
            .then(async (res) => {
                res.data.map(async (item,index) => {
                    await saveReservationDB(item)
                    await removeItemFromCart(item)
                    if(res.data.length === index + 1) {
                        window.location.reload()
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    function saveReservationDB(item) {
        const date = new Date()
        const content = {
            show_time_id: item.cart.show_time_id,
            reserved_date: date.toString(),
            reserved_on: date.toString(),
            child_tickets: item.cart.child_tickets,
            adult_tickets: item.cart.adult_tickets,
        }

        return new Promise(async (resolve, reject) => {
            await axios({
                url: 'http://localhost:8093/api/reservations',
                method: 'POST',
                headers: { 'x-auth-token': userToken },
                data: content,
            })
                .then((res) => {
                    resolve()
                })
                .catch((err) => {
                    console.log(err)
                    reject()
                })
        })
    }

    async function sendSMS() {
        await Swal.fire({
            title: 'Are you sure? ',
            text: `Your Total price of LKR ${totalPrice}.00 will be added to your Mobile credit bill!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#35BD09',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await Swal.fire(
                    'Thank You for your purchase',
                    'Enjoy!',
                    'success'
                )
            }
        })
    }

    function removeItemFromCart(item) {
        return new Promise(async (resolve, reject) => {
            await axios({
                url: 'http://localhost:8093/api/carts/'+item.cart.id,
                method: 'DELETE',
                headers: { 'x-auth-token': userToken },
            })
                .then((res) => {
                    resolve()
                })
                .catch((err) => {
                    console.log(err)
                    reject()
                })
        })
    }

    async function sendConfirmationEmail() {
        const emailContent = {
            email: 'sonal123326@gmail.com',
            totalPrice
        }
        await ticketConfirmationEmail(emailContent)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="MovieCart">
            <div className="box">
                <img
                    src="./../images/bag (2).png"
                    className="logo"
                    alt="cartLogo"
                />
            </div>
            <div className="CartName">
                <h1 className="cartN">Movie Cart</h1>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="main">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search By name..."
                        onChange={(e) => {
                            handleSearch(e.target.value)
                        }}
                    />
                    <div className="input-group-append">
                        <button className="btn searchbtn" type="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search icon"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <br />
            <h4 className="text text-danger text-center">{noShowingTxt}</h4>
            <div className="d-flex justify-content-center">
                <div hidden={loadingStatus}>
                    <LoadingDiv
                        type={'bars'}
                        color={'#ECB365'}
                        height={'50px'}
                        width={'50px'}
                    />
                </div>
            </div>

            <div hidden={emptyCartStatus}>
                <div className="d-flex justify-content-center">
                    <img src="https://i.pinimg.com/originals/81/c4/fc/81c4fc9a4c06cf57abf23606689f7426.jpg" alt = "emptyCartIcon"/>
                </div>

                <h4 className="text-danger text-center"><b>Your Cart is Empty</b></h4>
            </div>


            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent">
                    {cartItems.map((cart) => {
                        return (
                            <div className="columns">
                                <MovieCartCard cart={cart} refresh={refresh} />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="text-center">
                <h2>Total:LKR {totalPrice}.00</h2>
                <StripeCheckout
                    hidden
                    id="stripeBtn"
                    stripeKey="pk_test_51L1Q3MGgPBz98WbHVedHKSt0NiFFnu71L0y8uBIcX9hU2s5m1YjAbvsCffwvuHnNd8so8Bj1OY6SZ5hxMFyeQi7s00VUaKLWpk"
                    token={checkPayment}
                    name="Moon Cinemas." // the pop-in header title
                    image="./../../../images/footer.svg" // the pop-in header image (default none)
                    ComponentClass="div"
                    panelLabel="Pay"
                    description="Enter your card details"
                    amount={totalPrice / 360}
                >
                    <button type="button" className="btn-lg buy">
                        Buy Ticket
                    </button>
                </StripeCheckout>
                <br />
                <button type="button" className="btn-lg buy" onClick={sendSMS}>
                    Add To Your Mobile Credit Bill
                </button>
            </div>

            <br />
            <br />
        </div>
    )
}
