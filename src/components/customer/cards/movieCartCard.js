import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import './../css/movieCartCard.css'
import axios from 'axios'

export default function MovieCartCard(props) {
    let cart = props.cart;
    const [childtickets, setChildTickets] = useState(cart.cart.child_tickets)
    const [adulttickets, setAdultTickets] = useState(cart.cart.adult_tickets)

    let userToken = localStorage.getItem('moon-cinema-token')

    const [price, setPrice] = useState(
        cart.showTimeWithMovieTheaterDetailsDTO.theater.child_ticket_price *
            cart.cart.child_tickets +
            cart.showTimeWithMovieTheaterDetailsDTO.theater.adult_ticket_price *
                cart.cart.adult_tickets
    )

    useEffect(() => {
        setPrice(
            cart.showTimeWithMovieTheaterDetailsDTO.theater.child_ticket_price *
                childtickets +
                cart.showTimeWithMovieTheaterDetailsDTO.theater
                    .adult_ticket_price *
                    adulttickets
        )
    }, [childtickets, adulttickets])

    function handleDecrementChildTickets() {
        if (childtickets > 0) {
            setChildTickets((prevCount) => {
                let ticketsCount = prevCount - 1
                updateTicketsCount(true, ticketsCount)
                return ticketsCount
            })
        }
    }

    function handleIncrementChildTickets() {
        setChildTickets((prevCount) => {
            let ticketsCount = prevCount + 1
            updateTicketsCount(true, ticketsCount)
            return ticketsCount
        })
    }

    function handleDecrementAdultTickets() {
        if (adulttickets > 1) {
            setAdultTickets((prevCount) => {
                let ticketsCount = prevCount - 1
                updateTicketsCount(false, ticketsCount)
                return ticketsCount
            })
        }
    }

    function handleIncrementAdultTickets() {
        setAdultTickets((prevCount) => {
            let ticketsCount = prevCount + 1
            updateTicketsCount(false, ticketsCount)
            return ticketsCount
        })
    }

    function removeCartItem(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    url: `http://localhost:8093/api/carts/${id}`,
                    method: 'DELETE',
                    headers: { 'x-auth-token': userToken },
                })
                    .then(async (res) => {
                        await Swal.fire(
                            'Successful!',
                            'Item Removed from the cart successfully!',
                            'success'
                        )

                        window.location.reload()
                    })
                    .catch(async (err) => {
                        console.log(err)
                        await Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong! Try again Later!',
                        })
                    })
            }
        })
    }

    function updateTicketsCount(isChild, tickets) {
        let url =
            'http://localhost:8093/api/carts/' +
            cart.cart.id +
            '/ticket?isChild=' +
            false +
            '&tickets=' +
            tickets

        if (isChild) {
            url =
                'http://localhost:8093/api/carts/' +
                cart.cart.id +
                '/ticket?isChild=' +
                true +
                '&tickets=' +
                tickets
        }
        axios({
            url,
            method: 'PATCH',
        })
            .then(async (res) => {
                await Swal.fire(
                    'Successful!',
                    'Ticket Count Updated Successfully!',
                    'success'
                )
                props.refresh()
            })
            .catch(async (err) => {
                console.log(err)
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Try again Later!',
                })
            })
    }

    return (
        <div className="MovieCartCard">
            <div className="card">
                <img
                    src={cart.showTimeWithMovieTheaterDetailsDTO.movie.image}
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <h4 className="card-title">
                        {cart.showTimeWithMovieTheaterDetailsDTO.movie.name}
                    </h4>
                    <br />
                    <div className="details">
                        <div className="row">
                            <div className="col">
                                <p className="dName">Duration</p>
                            </div>
                            <div className="col">
                                <p>
                                    {
                                        cart.showTimeWithMovieTheaterDetailsDTO
                                            .movie.duration
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p className="dName">Theater</p>
                            </div>
                            <div className="col">
                                <p>
                                    {
                                        cart.showTimeWithMovieTheaterDetailsDTO
                                            .theater.name
                                    }{' '}
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p className="dName">Child-Tickets</p>
                            </div>
                            <div className="col">
                                <div className="plusMinus">
                                    <div
                                        className="btn-group btn-group-sm"
                                        role="group"
                                        aria-label="Second group"
                                    >
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={
                                                handleDecrementChildTickets
                                            }
                                        >
                                            {' '}
                                            <i className="fa fa-minus" />
                                        </button>
                                        <button type="text" className="btn">
                                            {childtickets}{' '}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={
                                                handleIncrementChildTickets
                                            }
                                        >
                                            {' '}
                                            <i className="fa fa-plus" />
                                        </button>
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
                                <div
                                    className="btn-group btn-group-sm"
                                    role="group"
                                    aria-label="Second group"
                                >
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={handleDecrementAdultTickets}
                                    >
                                        {' '}
                                        <i className="fa fa-minus" />
                                    </button>
                                    <button type="text" className="btn">
                                        {adulttickets}{' '}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={handleIncrementAdultTickets}
                                    >
                                        {' '}
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <p className="dName">Payment</p>
                        </div>
                        <div className="col">
                            <p>{`LKR ${price}`}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btnRemove"
                        onClick={() => removeCartItem(cart.cart.id)}
                    >
                        Remove
                    </button>
                </div>

                <br />
            </div>

            <br />
        </div>
    )
}
