import React, { useState } from 'react'
import axios from 'axios'
import './../css/updateMovie.css'

export default function UpdateMovie() {
    const token = localStorage.getItem('moon-cinema-token')

    const [ratings, setRatings] = useState('')

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    function handleDecrement() {
        if (hours > 0) {
            setHours((prevCount) => prevCount - 1)
        }
    }

    function handleIncrement() {
        setHours((prevCount) => prevCount + 1)
    }

    function handleDecrement2() {
        if (minutes > 0) {
            setMinutes((prevCount) => prevCount - 1)
        }
    }

    function handleIncrement2() {
        if (minutes < 59) {
            setMinutes((prevCount) => prevCount + 1)
        }
    }

    return (
        <div className="UpdateMov">
            <button
                type="button"
                className="btn  grp1"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                <img
                    src="./../images/edit (1).png"
                    className="icon"
                    alt="..."
                />
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h2 className="modal-title" id="exampleModalLabel">
                                Update Movie
                            </h2>
                            <button
                                type="button"
                                className="closebtn"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form>
                                    <span>
                                        <center>
                                            <div className="box">
                                                <img
                                                    className="z-depth-2 Img1"
                                                    alt="100x100"
                                                    src="./../images/clapperboard.png"
                                                    data-holder-rendered="true"
                                                />
                                            </div>
                                        </center>

                                        <div className="image-upload">
                                            <label for="file-input">
                                                <img
                                                    src="./../images/editing.png"
                                                    className="Img2"
                                                    id="btn4"
                                                />
                                            </label>
                                            <input
                                                id="file-input"
                                                type="file"
                                            />
                                        </div>
                                    </span>
                                    <br />
                                    <div className="mb-3">
                                        <label
                                            for="Mname"
                                            className="form-label"
                                        >
                                            Movie Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Mname"
                                            placeholder="Toy Story"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="duration"
                                            className="form-label"
                                        >
                                            Duration
                                        </label>
                                        <div className="row d-flex">
                                            <div className="plusMinus">
                                                <p className="text-center">
                                                    (Hours)
                                                </p>
                                                <div
                                                    className="btn-group btn-group-sm"
                                                    role="group"
                                                    aria-label="Second group"
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={
                                                            handleDecrement
                                                        }
                                                    >
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                    <button
                                                        type="text"
                                                        className="btn"
                                                        disabled
                                                    >
                                                        {hours}{' '}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={
                                                            handleIncrement
                                                        }
                                                    >
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="plusMinus">
                                                <p className="text-center">
                                                    (Minutes)
                                                </p>
                                                <div
                                                    className="btn-group btn-group-sm"
                                                    role="group"
                                                    aria-label="Second group"
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={
                                                            handleDecrement2
                                                        }
                                                    >
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                    <button
                                                        type="text"
                                                        className="btn"
                                                        disabled
                                                    >
                                                        {minutes}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={
                                                            handleIncrement2
                                                        }
                                                    >
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="rating"
                                            className="form-label rate"
                                        >
                                            Ratings
                                        </label>
                                        <div className="dropdown" id="drop">
                                            <button
                                                className="btn dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Select the Movie from IMDB
                                                <i className="fa fa-solid fa-angle-down icon" />
                                            </button>

                                            <ul
                                                className="dropdown-menu"
                                                id="style1"
                                                aria-labelledby="dropdownMenuButton"
                                            >
                                                <li className="dropdown-item">
                                                    <img
                                                        src="./../images/batman.jpg"
                                                        width="60"
                                                        height="60"
                                                        className="rounded-circle img2"
                                                        alt=""
                                                    />{' '}
                                                    THE BATMAN
                                                    <br />
                                                    <img
                                                        src="./../images/star.png"
                                                        width="15"
                                                        height="15"
                                                        alt=""
                                                    />{' '}
                                                    8.1/10
                                                </li>

                                                <li className="dropdown-item">
                                                    <img
                                                        src="./../images/sonic.jpg"
                                                        width="60"
                                                        height="60"
                                                        className="rounded-circle img2"
                                                        alt=""
                                                    />{' '}
                                                    SONIC THE HEDGEHOG 2
                                                    <br />
                                                    <img
                                                        src="./../images/star.png"
                                                        width="15"
                                                        height="15"
                                                        alt=""
                                                    />{' '}
                                                    8.1/10
                                                </li>

                                                <li className="dropdown-item">
                                                    <img
                                                        src="./../images/kgf.jpg"
                                                        width="60"
                                                        height="60"
                                                        className="rounded-circle img2"
                                                        alt=""
                                                    />{' '}
                                                    K.G.F CHAPTER 2
                                                    <br />
                                                    <img
                                                        src="./../images/star.png"
                                                        width="15"
                                                        height="15"
                                                        alt=""
                                                    />{' '}
                                                    8.1/10
                                                </li>

                                                <li className="dropdown-item">
                                                    <img
                                                        src="./../images/dr.jpg"
                                                        width="60"
                                                        height="60"
                                                        className="rounded-circle img2"
                                                        alt=""
                                                    />{' '}
                                                    DOCTOR STRANGE IN THE
                                                    MULTIVERSE of MADNESS
                                                    <br />
                                                    <img
                                                        src="./../images/star.png"
                                                        width="15"
                                                        height="15"
                                                        alt=""
                                                    />{' '}
                                                    8.1/10
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            for="language"
                                            className="form-label"
                                        >
                                            Language
                                        </label>
                                        <select
                                            name="language"
                                            className="form-select"
                                            id="language"
                                        >
                                            <option value="">
                                                Select Language
                                            </option>
                                            <option value="English">
                                                English
                                            </option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Telugu">
                                                Telugu
                                            </option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            for="genre"
                                            className="form-label"
                                        >
                                            Genre
                                        </label>
                                        <select
                                            name="genre"
                                            className="form-select "
                                            id="genere"
                                        >
                                            <option value="" selected>
                                                Select Genre
                                            </option>
                                            <option value="English">
                                                Action
                                            </option>
                                            <option value="Hindi">
                                                Comedy
                                            </option>
                                            <option value="Telugu">
                                                Horror
                                            </option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            for="status"
                                            className="form-label"
                                        >
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            className="form-select "
                                            id="status"
                                        >
                                            <option value="" selected>
                                                Select Status
                                            </option>
                                            <option value="Now">
                                                Now Showing
                                            </option>
                                            <option value="Soon">
                                                Coming Soon
                                            </option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            for="storyLine"
                                            className="form-label"
                                        >
                                            Story Line
                                        </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Story Line"
                                            id="storyLine"
                                        />
                                    </div>
                                </form>
                            </div>

                            <br />
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn5">
                                Delete
                            </button>
                            <button type="button" className="btn5">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
