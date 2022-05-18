import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import './customerSignIn.css'
import axios from 'axios'
import Example from "../external_components/loading";

const eye = <FontAwesomeIcon icon={faEye} />
const sleye = <FontAwesomeIcon icon={faEyeSlash} />

export default function CustomerLogin() {
    const [passwordShown, setPasswordShown] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [invalidTxtStatus, setInvalidTxtStatus] = useState(true)
    const [loginLoading,setLoginLoading] = useState(true)
    useEffect(() => {
        const savedUsername = localStorage.getItem('moon-cinema-username')
        if (savedUsername) {
            setUsername(savedUsername)
            document.getElementById('remember-check').checked = true
        }
    })
    // Password toggle handler
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown)
    }

    async function signIn(e) {
        e.preventDefault()
        setInvalidTxtStatus(true)
        setLoginLoading(false)
        isRememberMe()
        const content = {
            username,
            password,
        }
        axios({
            url: 'http://localhost:8093/api/auth',
            method: 'POST',
            data: content,
        })
            .then((res) => {
                if (res.data.token) {
                    // save localstorage
                    saveTokenInLocalStorage(res.data.token)
                    // path separation
                    navigateHome(res.data.userRole)

                } else {
                    setInvalidTxtStatus(false)
                }
                setLoginLoading(true)
            })
            .catch(async (err) => {
                setInvalidTxtStatus(false)
                setLoginLoading(true)
            })
    }

    function saveTokenInLocalStorage(token) {
        localStorage.setItem('moon-cinema-token', token)
    }

    function navigateHome(userRole) {
        if (userRole === 'user') {
            // navigate to customer home
            alert('customer')
        } else if (userRole === 'admin') {
            // navigate to admin home
            alert('Production team')
        }
    }

    const preventWhiteSpace = (e) => {
        if (e.key === ' ') {
            e.preventDefault()
        }
    }

    function isRememberMe() {
        const isRemember = document.getElementById('remember-check').checked
        if (isRemember) {
            localStorage.setItem('moon-cinema-username', username)
        }
    }

    return (
        <div className="CusLogin">
            <section className="">
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-9 col-lg-6 col-xl-4">
                            <img
                                src="./../images/moon.svg"
                                className="img-fluid Img"
                                alt="Sample image"
                            />
                        </div>

                        <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 rightSide">
                            <h1 className="sign">Sign in</h1>
                            <br />
                            <h5
                                className="text-center text-danger"
                                hidden={invalidTxtStatus}
                            >
                                Invalid Credentials!
                            </h5>
                            <form onSubmit={signIn}>
                                <div className="form-outline mb-4">
                                    <label
                                        className="form-label"
                                        form="form3Example3"
                                        id="username"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Username"
                                        Value={username}
                                        onKeyDown={preventWhiteSpace}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-3">
                                    <label
                                        className="form-label"
                                        form="form3Example5"
                                        id="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="form3Example5"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        type={
                                            passwordShown ? 'text' : 'password'
                                        }
                                        onKeyDown={preventWhiteSpace}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                    <span className="p-viewer">
                                        <i
                                            id="eyeIcon"
                                            className={`fa ${
                                                passwordShown
                                                    ? 'fa-eye'
                                                    : 'fa-eye-slash'
                                            } password-icon`}
                                            onClick={togglePasswordVisibility}
                                        >
                                            {' '}
                                        </i>
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="remember-check"
                                        />
                                        <label
                                            className="form-check-label"
                                            for="form2Example3"
                                            id="remember"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="" className="forgot">
                                        Forgot Password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="btn rounded signIn"
                                >
                                    Sign in
                                </button>

                                <div className="container d-flex justify-content-center">
                                    <div hidden={loginLoading}>
                                        <Example
                                            type={'bars'}
                                            color={'#ECB365'}
                                            height={'50px'}
                                            width={'50px'}
                                        />
                                    </div>

                                </div>

                                <span className="text-center" id="acc">
                                    Don't you have an account yet?{' '}
                                    <a id="clickme">Create New</a>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
