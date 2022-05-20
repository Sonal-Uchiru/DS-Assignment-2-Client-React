import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import './../css/allTheaters.css'
import { useNavigate } from 'react-router-dom'

import TheaterCard from '../cards/theaterCard'
import LoadingDiv from '../../external_components/loading'

export default function AllTheaters() {
    let navigate = useNavigate()
    let userToken = localStorage.getItem('moon-cinema-token')

    const [theaters, setTheaters] = useState([])
    const [duplicateTheaters, setDuplicateTheaters] = useState([])
    let [errorText, setErrorText] = useState('')
    const [loadingStatus, setLoadingStatus] = useState(false)
    useEffect(() => {
        function getTheaters() {
            axios({
                url: 'http://localhost:8093/api/theaters',
                method: 'GET',
                headers: { 'x-auth-token': userToken },
            })
                .then((res) => {
                    if (res.data.length > 0) {
                        setTheaters(res.data)
                        setDuplicateTheaters(res.data)
                    } else {
                        setErrorText('No theaters available')
                    }

                    setLoadingStatus(true)
                })
                .catch(async (err) => {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Try again Later!',
                    })
                    setLoadingStatus(true)
                })
        }

        getTheaters()
    }, [])

    function handleSearch(userIn) {
        setLoadingStatus(false)
        const result = duplicateTheaters.filter((theater) =>
            theater.name.toLowerCase().includes(userIn.toLowerCase())
        )
        if (result.length > 0) {
            setTheaters(result)
            setErrorText('')
        } else {
            setTheaters(result)
            setErrorText(`No theaters available by name ${userIn}`)
        }
        setLoadingStatus(true)
    }

    return (
        <div className="Theaters">
            <h1 className="theater">Theaters</h1>

            <div className="main">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Theaters..."
                        onChange={(e) => handleSearch(e.target.value)}
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

            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent ">
                    <center>
                        <h4 class="text-danger">{errorText}</h4>
                    </center>
                    {theaters.map((theater) => {
                        return (
                            <div
                                onClick={() =>
                                    navigate(`/theater/${theater.id}`)
                                }
                                className="streched-link col"
                            >
                                <TheaterCard theater={theater} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
