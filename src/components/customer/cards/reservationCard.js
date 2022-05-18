import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/reservationCard.css'

export default function ReservationCard({ reservation }) {
    let userToken = localStorage.getItem('moon-cinema-token');


    function cancelReservation(id) {
        axios({
            url: `http://localhost:8093/api/reservations/${id}/status`,
            method: 'PATCH',
            headers: { 'x-auth-token': userToken },
        })
            .then((res) => {
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [price, setPrice] = useState(
        reservation.showTimeWithMovieTheaterDetailsDto.theater
            .child_ticket_price *
            reservation.reservation.child_tickets +
            reservation.showTimeWithMovieTheaterDetailsDto.theater
                .adult_ticket_price *
                reservation.reservation.adult_tickets
    )

    return (
        <div className="ReservationCard">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={
                                reservation.showTimeWithMovieTheaterDetailsDto
                                    .movie.image
                            }
                            className="img-fluid rounded Img"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="status">
                                {reservation.showTimeWithMovieTheaterDetailsDto
                                    .movie.showing
                                    ? 'Now Showing'
                                    : 'Coming Soon'}
                            </h5>
                            <h2 className="card-title">
                                {
                                    reservation
                                        .showTimeWithMovieTheaterDetailsDto
                                        .movie.name
                                }
                            </h2>
                            <br />

                            <div className="details">
                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Duration</p>
                                    </div>
                                    <div className="col">
                                        <p>
                                            {
                                                reservation
                                                    .showTimeWithMovieTheaterDetailsDto
                                                    .movie.duration
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Theater</p>
                                    </div>
                                    <div className="col">
                                        <p>
                                            {
                                                reservation
                                                    .showTimeWithMovieTheaterDetailsDto
                                                    .theater.name
                                            }
                                        </p>
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
                                        <p>
                                            {
                                                reservation.reservation
                                                    .child_tickets
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Adult-Tickets</p>
                                    </div>
                                    <div className="col">
                                        <p>
                                            {
                                                reservation.reservation
                                                    .adult_tickets
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <p className="dName">Payment</p>
                                    </div>
                                    <div className="col">
                                        <p>LKR {price} /=</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btnCancel btn-lg"
                            onClick={() =>
                                cancelReservation(reservation.reservation.id)
                            }
                        >
                            Cancel Reservation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
