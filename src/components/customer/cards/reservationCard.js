import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/reservationCard.css'

export default function ReservationCard({ reservation }) {
    const userToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng'

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
