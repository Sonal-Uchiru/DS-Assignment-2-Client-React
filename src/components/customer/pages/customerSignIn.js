import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";

import "./../css/customerSignIn.css"

const eye = <FontAwesomeIcon icon={faEye}/>;
const sleye = <FontAwesomeIcon icon={faEyeSlash}/>;

export default function CustomerLogin() {


    const [passwordShown, setPasswordShown] = useState(false);
    let [Password, setPassword] = useState("");
    // Password toggle handler
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };


    return (

        <div className="CusLogin">

            <section className="">
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-9 col-lg-6 col-xl-4">
                            <img src="./../images/moon.svg"
                                 className="img-fluid Img" alt="Sample image"/>
                        </div>


                        <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 rightSide">
                            <h1 className="sign">Sign in</h1>
                            <br/>
                            <form>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example3" id="username">Username</label>
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                           placeholder="Username"/>
                                </div>


                                <div className="form-outline mb-3">
                                    <label className="form-label" for="form3Example4" id="password">Password</label>
                                    <input id="form3Example4" className="form-control form-control-lg"
                                           placeholder="Password" type={passwordShown ? "text" : "password"}
                                           onChange={(e) => {
                                               setPassword(e.target.value);
                                           }}/>
                                    <span className="p-viewer">
                        <i id="eyeIcon"
                           className={`fa ${passwordShown ? "fa-eye" : "fa-eye-slash"} password-icon`}
                           onClick={togglePasswordVisibility}
                        >
                          {" "}
                        </i>
                      </span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">

                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="check"/>
                                        <label className="form-check-label" for="form2Example3" id="remember">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="" className="forgot">Forgot Password?</a>
                                </div>

                                <button type="submit" className="btn rounded signIn">Sign in</button>

                                <button className="btn" id="googlebtn"><img id="gicon" src="/images/google.png"
                                                                            alt="googleIcon"/>Continue with Google
                                </button>

                                <span className="text-center" id="acc">Don't you have an account yet? <a id="clickme">Create New</a></span>

                            </form>
                        </div>
                    </div>
                </div>

            </section>

        </div>

    );
}



