import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import './customerSignIn.css'
import axios from "axios";

const eye = <FontAwesomeIcon icon={faEye} />
const sleye = <FontAwesomeIcon icon={faEyeSlash} />

export default function CustomerLogin() {
    const [passwordShown, setPasswordShown] = useState(false)
    // Password toggle handler
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown)
    }

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    function signIn(e){
        e.preventDefault()
        const content = {
            username,
            password
        }
        axios({
            url: 'https://',
            method: 'POST',
            data:content
        }).then((res) =>{
            // save localstorage
            // path separation
        })

    }

    const preventWhiteSpace = (e) => {
        if(e.key === " "){
            e.preventDefault();
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
                                        onKeyDown={preventWhiteSpace}
                                        onChange={(e)=> setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-3">
                                    <label
                                        className="form-label"
                                        form="form3Example4"
                                        id="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="form3Example4"
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
                                            id="check"

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

                                <button className="btn" id="googlebtn">
                                    <img
                                        id="gicon"
                                        src="/images/google.png"
                                        alt="googleIcon"
                                    />
                                    Continue with Google
                                </button>

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
