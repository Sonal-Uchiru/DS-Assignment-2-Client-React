import React, { useState } from 'react'
import axios from 'axios'
import './../css/addMovie.css'
import { GetMoviesByTitle } from '../../../imdb_api/getMoviesByTitle'
import { GetRatingByImdbMovieId } from '../../../imdb_api/getRatingByImdbMovieId'
import Example from '../../external_components/loading'
import Swal from 'sweetalert2'

export default function AddMovie() {
    const token =
        'eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng'
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const [name, setName] = useState('')
    const [image, setImage] = useState('./../images/clapperboard.png')
    const [genre, setGenre] = useState('')
    const [story_line, setStoryLine] = useState('')
    const [language, setLanguage] = useState('')
    const [imdb_key, setImdbKey] = useState('')
    const [showing, setShowings] = useState('')
    const [imdbRating,setImdbRating] = useState("0")
    const [imdbLoading, setImdbLoading] = useState(true)
    const [saveMovieDBLoading, setSaveMovieDBLoading] = useState(true)
    const [noResultStatus, setNoResultStatus] = useState(true)
    const [file, setFile] = useState()

    const [ratings, setRatings] = useState('')

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

    async function addMovie(e) {
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
        if(image === "" || imdb_key === ""){
            setSaveMovieDBLoading(true)
            await Swal.fire(
                'Select Movie from the IMDB',
                '',
                'warning'
            )
            return;
        }

        const content = {
            name,
            image,
            duration: document.getElementById('duration').value,
            genre,
            story_line,
            language,
            imdb_key,
            showing: showing === 'Now Showing',
        }
        axios({
            url: 'http://localhost:8093/api/movies',
            method: 'POST',
            headers: {
                'x-auth-token': token,
            },
            data: content,
        })
            .then(async (res) => {
                setSaveMovieDBLoading(true)
                await Swal.fire('Saved!', '', 'success')
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
        }else{
            setImdbLoading(true)
            setNoResultStatus(false)
        }
    }

    function displaySelectedMovieRatings(movieId) {
        GetRatingByImdbMovieId(movieId).then((res)=>{
            setImdbRating(res)
        }).catch(async (err)=>{
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        })
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
                                                    src={image}
                                                    id="movieImage"
                                                    data-holder-rendered="true"
                                                />
                                            </div>
                                        </center>
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
                                            id="duration"
                                            Value={
                                                hours + 'h ' + minutes + 'min'
                                            }
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
                                                    <div hidden={imdbLoading}>
                                                        <Example
                                                            type={'bars'}
                                                            color={'#ECB365'}
                                                            height={'50px'}
                                                            width={'50px'}
                                                        />
                                                    </div>
                                                    <div
                                                        hidden={noResultStatus}
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
                                                                key={movie.id}
                                                                onClick={() => {
                                                                    setImdbKey(
                                                                        movie.id
                                                                    )
                                                                    setImage(
                                                                        movie.image
                                                                    )
                                                                    displaySelectedMovieRatings(movie.id)
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
                                                                {movie.title}
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
                                        <span className="glyphicon glyphicon-refresh"> </span>{' '}
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
                            <button
                                form="addMovie"
                                type="submit"
                                className="btn5"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
