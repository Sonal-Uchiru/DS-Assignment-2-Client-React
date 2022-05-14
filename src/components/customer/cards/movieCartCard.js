import React, { useEffect, useState } from 'react'
import './../css/movieCartCard.css'
import axios from 'axios'

export default function MovieCartCard({ cart }) {
    const [childtickets, setChildTickets] = useState(cart.cart.child_tickets)
    const [adulttickets, setAdultTickets] = useState(cart.cart.adult_tickets)

    const userToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng'

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
            setChildTickets((prevCount) => prevCount - 1)
        }
    }

    function handleIncrementChildTickets() {
        setChildTickets((prevCount) => prevCount + 1)
    }

    function handleDecrementAdultTickets() {
        if (adulttickets > 1) {
            setAdultTickets((prevCount) => prevCount - 1)
        }
    }

    function handleIncrementAdultTickets() {
        setAdultTickets((prevCount) => prevCount + 1)
    }

    function removeCartItem(id) {
        axios({
            url: `http://localhost:8093/api/carts/${id}`,
            method: 'DELETE',
            headers: { 'x-auth-token': userToken },
        })
            .then((res) => {
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function updateTicketsCount(isChild) {
        axios({
            url: "http://localhost:8093/api/carts/"+cart.cart.id+"/ticket?isChild="+isChild+"&tickets="+childtickets,
            method:"PATCH"
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
