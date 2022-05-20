import React, { useState, useEffect } from 'react'
import Swal from "sweetalert2";
import axios from 'axios'
import './../css/reservation.css'
import ReservationCard from '../cards/reservationCard'
import LoadingDiv from "../../external_components/loading";

export default function Reservation() {
    const [reservedMovies, setReservedMovies] = useState([]);
    const [duplicateMovies, setDuplicateMovies] = useState([]);
    const [searchError, setSearchError] = useState("");
    const userToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng'

    const [loadingStatus,setLoadingStatus] = useState(false);
    useEffect(() => {
        function getReservedMovies() {
            axios({
                url: 'http://localhost:8093/api/reservations',
                method: 'GET',
                headers: { 'x-auth-token': userToken },
            })
                .then((res) => {
                    setReservedMovies(res.data)
                    setDuplicateMovies(res.data)
                    setLoadingStatus(true)
                })
                .catch(async (err) => {
                    await Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong! Try again Later!",
                    });
                    setLoadingStatus(true)
                })
        }

        getReservedMovies()
    }, [])

    function handleSearch(userIn) {
        setLoadingStatus(false)
        const result = duplicateMovies.filter(
            (movie) =>
                movie.showTimeWithMovieTheaterDetailsDto.movie.name
                    .toLowerCase()
                    .includes(userIn.toLowerCase()) ||
                movie.showTimeWithMovieTheaterDetailsDto.theater.name
                    .toLowerCase()
                    .includes(userIn.toLowerCase())
        )
        if(result.length > 0){
            setReservedMovies(result)
        }else{
            setSearchError(`No reservations found by name ${userIn}`)
            setReservedMovies(result)
        }
        setLoadingStatus(true)

    }

    return (
        <div className="Reservation">
            <div className="box">
                <img src="./../images/booking.png" className="logo" />
            </div>
            <div className="CartName">
                <h1 className="cartN">Reservation</h1>
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
                        placeholder="Search Reservation..."
                        onChange={(e) => {
                            setSearchError('');
                            handleSearch(e.target.value);
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
                <center>
                    <br/>
                    <h4 className="text-danger">{searchError}</h4>
                </center>
            </div>
            <div
                hidden={loadingStatus}
                className="container justify-content-center"
            >
                <center>
                    <LoadingDiv
                        type={'bars'}
                        color={'#ECB365'}
                        height={'50px'}
                        width={'50px'}
                    />
                </center>
            </div>
            <div className="containerrrr">
                {reservedMovies.map((reservation) => {
                    return <ReservationCard reservation={reservation} />
                })}
            </div>

            <br />

            <br />
            <br />
        </div>
    )
}
