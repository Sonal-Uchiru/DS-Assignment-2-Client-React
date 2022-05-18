import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './../css/allTheaters.css'

import TheaterCard from '../cards/theaterCard'

export default function AllTheaters() {
    const [theaters, setTheaters] = useState([])
    const [duplicateTheaters, setDuplicateTheaters] = useState([])

    useEffect(() => {
        function getTheaters() {
            axios({
                url: 'http://localhost:8093/api/theaters',
                method: 'GET',
            })
                .then((res) => {
                    console.log(res.data)
                    setTheaters(res.data)
                    setDuplicateTheaters(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getTheaters()
    }, [])

    function handleSearch(userIn) {
        const result = duplicateTheaters.filter((theater) =>
            theater.name.toLowerCase().includes(userIn.toLowerCase())
        )
        setTheaters(result)
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

            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent ">
                    {theaters.map((theater) => {
                        return (
                            <div className="col">
                                <TheaterCard theater={theater} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
