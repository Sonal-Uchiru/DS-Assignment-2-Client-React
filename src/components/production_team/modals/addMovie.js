import React, { useState } from 'react'
import axios from 'axios'
import './../css/addMovie.css'

export default function AddMovie() {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const [name, setName] = useState('')
    const [image, setImage] = useState()
    const [duration, setDuration] = useState('')
    const [genre, setGenre] = useState('')
    const [story_line, setStoryLine] = useState('')
    const [language, setLanguage] = useState('')
    const [imdb_key, setImdbKey] = useState('')
    const [showing, setShowings] = useState('')

    const [file, setFile] = useState()

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

    function addMovie(e) {
        e.preventDefault()
        const content = {
            name,
            image,
            duration,
            genre,
            story_line,
            language,
            imdb_key,
            showing,
        }
        console.log(content)
    }

    return (
        <div className="addMov">
            <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                Launch demo modal
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
                                Add Movie
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
                                <form id="addMovie" onSubmit={addMovie}>
                                    <span>
                                        <center>
                                            <div className="box">
                                                <img
                                                    className="z-depth-2 Img1"
                                                    alt="movie_image"
                                                    src="./../images/sonic.jpg"
                                                    id="movieImage"
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
                                                    alt="edit icon"
                                                />
                                            </label>
                                            <input
                                                id="file-input"
                                                type="file"
                                                required
                                                onChange={(e) => setFile(e)}
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
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            form="duration"
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
                                                        {' '}
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
                                                        {' '}
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
                                                        {' '}
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
                                                        {' '}
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
                                        <br />
                                        <br />
                                        <select
                                            className="form-select"
                                            name="language"
                                            id="language"
                                            required
                                            onChange={(e) =>
                                                setLanguage(e.target.value)
                                            }
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
                                        <br />
                                        <br />
                                        <select
                                            className="form-select"
                                            name="genre"
                                            id="genre"
                                            required
                                            onChange={(e) =>
                                                setGenre(e.target.value)
                                            }
                                        >
                                            <option value="">
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
                                        <br />
                                        <br />
                                        <select
                                            className="form-select"
                                            name="status"
                                            id="status"
                                            onChange={(e) =>
                                                setShowings(e.target.value)
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Status
                                            </option>
                                            <option value="Now Showing">
                                                Now Showing
                                            </option>
                                            <option value="Coming Soon">
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
                                            onChange={(e) =>
                                                setStoryLine(e.target.value)
                                            }
                                            id="storyLine"
                                            required
                                        />
                                    </div>
                                    <button
                                        // form="addMovie"
                                        type="submit"
                                        className="btn5"
                                    >
                                        Add
                                    </button>
                                </form>
                            </div>
                            <br />
                        </div>
                        <div className="modal-footer border-0"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
