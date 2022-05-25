import React, { useEffect, useState } from 'react'
import axios from 'axios'

import '../css/updateMovie.css'
import '../css/movieCardProduction.css'
import UpdateMovieModal from './../modals/updateMovie'
import Swal from 'sweetalert2'
import GetRating from './../../../imdb_api/getRatingByImdbMovieId'
import { GetMoviesByTitle } from '../../../imdb_api/getMoviesByTitle'
import GetRatingByImdbMovieId from './../../../imdb_api/getRatingByImdbMovieId'
import Example from '../../external_components/loading'

export default function MovieCardProduction1(props) {
    let movieDetails = props.details
    let userToken = localStorage.getItem('moon-cinema-token')
    let [movieImage, setMovieImage] = useState(
        'https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg'
    )
    let [ratings, setRatings] = useState('')

    const token = localStorage.getItem('moon-cinema-token')
    const [hours, setHours] = useState(
        parseInt(movieDetails.duration.split('h', 1)[0])
    )
    const [minutes, setMinutes] = useState(
        parseInt(movieDetails.duration.split('h', 2)[1].split('min', 1)[0])
    )

    const [name, setName] = useState(movieDetails.name)
    const [image, setImage] = useState(movieDetails.image)
    const [genre, setGenre] = useState(movieDetails.genre)
    const [story_line, setStoryLine] = useState(movieDetails.story_line)
    const [language, setLanguage] = useState(movieDetails.language)
    const [imdb_key, setImdbKey] = useState(movieDetails.imdb_key)
    const [showing, setShowings] = useState(movieDetails.showing)
    const [imdbRating, setImdbRating] = useState('0')
    const [imdbLoading, setImdbLoading] = useState(true)
    const [saveMovieDBLoading, setSaveMovieDBLoading] = useState(true)
    const [noResultStatus, setNoResultStatus] = useState(true)
    const [file, setFile] = useState()

    const [imdbMovies, setImdbMovies] = useState([])

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

    async function updateMovie(e) {
        e.preventDefault()

        await Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setSaveMovieDBLoading(false)
                await saveMovieDB()
            } else if (result.isDenied) {
                await Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    async function saveMovieDB() {
        const content = {
            name,
            image,
            duration: document.getElementById('duration').value,
            genre,
            story_line,
            language,
            imdb_key,
            showing: document.getElementById('status').value === 'Now Showing',
        }
        axios({
            url: 'http://localhost:8093/api/movies/' + movieDetails.id,
            method: 'PUT',
            headers: {
                'x-auth-token': token,
            },
            data: content,
        })
            .then(async (res) => {
                setSaveMovieDBLoading(true)
                await Swal.fire('Updated!', '', 'success')
            })
            .catch(async (err) => {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
                setSaveMovieDBLoading(true)
            })
    }

    function getMoviesToTheMovieTitle() {
        setImdbLoading(false)
        setNoResultStatus(true)
        if (name !== '') {
            GetMoviesByTitle(name)
                .then((res) => {
                    setImdbMovies(res.data.results)
                    if (res.data.results.length === 0) {
                        setNoResultStatus(false)
                    }
                    setImdbLoading(true)
                })
                .catch(async (err) => {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
        } else {
            setImdbLoading(true)
            setNoResultStatus(false)
        }
    }

    function displaySelectedMovieRatings(movieId) {
        GetRatingByImdbMovieId(movieId)
            .then((res) => {
                setImdbRating(res)
            })
            .catch(async (err) => {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
    }

    return (
        <div className="MovieCardProduction">
            <div className="card">
                <img
                    src={movieDetails.image}
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h4 className="card-title">{props.details.name}</h4>
                        </div>

                        <div className="col-4">
                            <img src="./../images/imdb.png" className="imdb" />
                            <div className="row">
                                <div className="col">
                                    <img
                                        src="./../images/star.png"
                                        className="star"
                                    />
                                </div>
                                <div className="col">
                                    <h6 className="rating">{ratings}/10</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    {props.details.showing ? (
                        <p className="status">Now Showing</p>
                    ) : (
                        <p className="status">Coming Soon</p>
                    )}
                    <br />
                </div>
                <div className="text-center">
                    <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                props.functiondelete(props.details.id)
                            }
                            className="btn grp1"
                        >
                            <img
                                src="./../images/delete.png"
                                className="icon"
                                alt="..."
                            />
                        </button>

                        <button
                            type="button"
                            className="btn  grp1"
                            data-toggle="modal"
                            data-target={`#${props.details.id}`}
                        >
                            <img
                                src="./../images/edit (1).png"
                                className="icon"
                                alt="..."
                            />
                        </button>
                    </div>
                </div>
                <br />
            </div>

            <div className="addMov">
                <div
                    className="modal fade"
                    id={`${props.details.id}`}
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
                                <h2
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Edit Movie
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
                                    <form
                                        id="updateForm"
                                        onSubmit={updateMovie}
                                    >
                                        <span>
                                            <center>
                                                <div className="box">
                                                    <img
                                                        className="z-depth-2 Img1"
                                                        alt="movie_image"
                                                        src={movieDetails.image}
                                                        id="movieImage"
                                                        data-holder-rendered="true"
                                                    />
                                                </div>
                                            </center>
                                        </span>
                                        <br />
                                        <div className="mb-3">
                                            <label
                                                htmlFor="Mname"
                                                className="form-label"
                                            >
                                                Movie Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Mname"
                                                placeholder="Toy Story"
                                                Value={movieDetails.name}
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
                                                id="duration"
                                                Value={
                                                    hours +
                                                    'h ' +
                                                    minutes +
                                                    'min'
                                                }
                                                readOnly
                                            />
                                        </div>
                                        <div className="imdb-container-dropdown">
                                            <label
                                                htmlFor="rating"
                                                className="form-label rate"
                                            >
                                                Ratings
                                            </label>
                                            <br />
                                            <br />
                                            <br />
                                            <div
                                                className="dropdown container-dropdown-imdb"
                                                id="drop"
                                            >
                                                <button
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    id="dropdownMenuButton"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                    onClick={
                                                        getMoviesToTheMovieTitle
                                                    }
                                                >
                                                    Select the Movie from IMDB
                                                    <i className="fa fa-solid fa-angle-down icon" />
                                                </button>

                                                <ul
                                                    className="dropdown-menu"
                                                    id="style1"
                                                    aria-labelledby="dropdownMenuButton"
                                                >
                                                    <div className="container d-flex justify-content-center">
                                                        <div
                                                            hidden={imdbLoading}
                                                        >
                                                            <Example
                                                                type={'bars'}
                                                                color={
                                                                    '#ECB365'
                                                                }
                                                                height={'50px'}
                                                                width={'50px'}
                                                            />
                                                        </div>
                                                        <div
                                                            hidden={
                                                                noResultStatus
                                                            }
                                                        >
                                                            <h5 className="text-danger">
                                                                No Result Found!
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    {imdbMovies.map(
                                                        (movie, index) => {
                                                            return (
                                                                <li
                                                                    className="dropdown-item"
                                                                    key={
                                                                        movie.id
                                                                    }
                                                                    onClick={() => {
                                                                        setImdbKey(
                                                                            movie.id
                                                                        )
                                                                        setImage(
                                                                            movie.image
                                                                        )
                                                                        displaySelectedMovieRatings(
                                                                            movie.id
                                                                        )
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            movie.image
                                                                        }
                                                                        width="60"
                                                                        height="60"
                                                                        className="rounded-circle img2"
                                                                        alt=""
                                                                    />{' '}
                                                                    {
                                                                        movie.title
                                                                    }
                                                                    <br />
                                                                    {
                                                                        movie.description
                                                                    }
                                                                </li>
                                                            )
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        <button
                                            className="btn-sm refresh-btn"
                                            type="button"
                                            onClick={getMoviesToTheMovieTitle}
                                        >
                                            <span className="glyphicon glyphicon-refresh">
                                                {' '}
                                            </span>{' '}
                                            Refresh
                                        </button>
                                        <div className="ratingContainer">
                                            <img
                                                src="./../images/imdb.png"
                                                className="imdb"
                                                alt="imdbLogo"
                                            />
                                        </div>
                                        <div className="ratingContainer">
                                            <img
                                                src="./../images/star.png"
                                                className="star"
                                                width="15"
                                                height="15"
                                                alt="star"
                                            />{' '}
                                            {imdbRating}/10
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="language"
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
                                                defaultValue={
                                                    movieDetails.language
                                                }
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
                                                <option value="Hindi">
                                                    Hindi
                                                </option>
                                                <option value="Telugu">
                                                    Telugu
                                                </option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="genre"
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
                                                defaultValue={
                                                    movieDetails.genre
                                                }
                                                onChange={(e) =>
                                                    setGenre(e.target.value)
                                                }
                                            >
                                                <option value="">
                                                    Select Genre
                                                </option>
                                                <option value="Action">
                                                    Action
                                                </option>
                                                <option value="Comedy">
                                                    Comedy
                                                </option>
                                                <option value="Horror">
                                                    Horror
                                                </option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="status"
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
                                                defaultValue={
                                                    movieDetails.showing
                                                        ? 'Now Showing'
                                                        : 'Coming Soon'
                                                }
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
                                                htmlFor="storyLine"
                                                className="form-label"
                                            >
                                                Story Line
                                            </label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Story Line"
                                                defaultValue={
                                                    movieDetails.story_line
                                                }
                                                onChange={(e) =>
                                                    setStoryLine(e.target.value)
                                                }
                                                id="storyLine"
                                                required
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <div className="container d-flex justify-content-center">
                                    <div hidden={saveMovieDBLoading}>
                                        <Example
                                            type={'bars'}
                                            color={'#ECB365'}
                                            height={'50px'}
                                            width={'50px'}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button
                                        type="button"
                                        className="btn5"
                                        onClick={() =>
                                            props.functiondelete(
                                                props.details.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="submit"
                                        form="updateForm"
                                        className="btn5"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
