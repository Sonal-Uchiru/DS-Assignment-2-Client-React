import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './../css/movieCardCustomer2.css'
import { useNavigate } from 'react-router-dom'

export default function MovieCardCustomer2(props) {
    let navigate = useNavigate()
    return (
        <div className="MovieCardCustomer2">
            <div className="card">
                <img
                    src={props.details.image}
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h4 className="card-title">{props.details.name}</h4>
                        </div>
                    </div>

                    {props.details.showing ? (
                        <p className="status">Now Showing</p>
                    ) : (
                        <p className="status">Coming Soon</p>
                    )}
                </div>
                <br />
                <button
                    className="btn btn-warning text-light"
                    onClick={() => navigate('/movie/' + props.details.id)}
                >
                    <b>View More</b>
                </button>
            </div>
        </div>
    )
}
