import React, { useState } from 'react'
import axios from 'axios'
import './forgotPassword.css'
import {send} from "emailjs-com";

export default function ForgotPassword() {

    const [stage1,setStage1] = useState(false);
    const [stage2,setStage2] = useState(true);
    const [stage3,setStage3] = useState(true);

    function sendEmail(e) {
        e.preventDefault()
        setStage2(false);
        setStage1(true);
    }

    function validateCode(e){
        e.preventDefault();
        setStage3(false);
        setStage2(true);
    }

    function changePassword(e) {
        e.preventDefault();

    }

    return (
        <div className="ForgotPassword">
            <div className="d-flex justify-content-center">
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body">
                        <div className="text-center">
                            <div>
                                <img
                                    src={"./../images/forgot.png"}
                                    className="Img"
                                 alt="lock_img"/>
                            </div>
                        </div>
                        <br />
                        <div className="text-center">
                            <h1 className="forgotT">Forgot Password?</h1>
                        </div>
                        <br />
                        <div className="text-center">
                            <h7 className="reset">
                                You can reset your password from here.
                            </h7>
                        </div>

                        <br />


                    {/*    Stage 1 */}
                        <div hidden = {stage1}>
                            <form onSubmit={sendEmail}>
                                <div className="input-group">
                                    {' '}
                                    <span className="input-group-append bg-transparent">
                                        <span className="input-group-text bg-transparent icon">
                                            <img
                                                src={"./../images/email (4).png"}
                                                className="Imgs" alt= "email icon"
                                            />
                                        </span>
                                    </span>
                                    <input
                                        className="form-control inp"
                                        type="email"
                                        id="userEmail"
                                        placeholder="Enter Email"
                                        required
                                    />
                                </div>
                                <br />

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-block get"

                                    >
                                        Get Code
                                    </button>
                                </div>
                            </form>
                        </div>


                        {/*Stage 2*/}

                        <div hidden={stage2}>
                            <form onSubmit={validateCode}>
                                <div className="input-group">
                                    {' '}
                                    <span className="input-group-append bg-transparent">
                                        <span className="input-group-text bg-transparent icon">
                                            <img
                                                src={"./../images/email (4).png"}
                                                className="Imgs" alt= "email icon"
                                            />
                                        </span>
                                    </span>
                                    <input
                                        className="form-control inp"
                                        type="text"
                                        id="userEmail"
                                        placeholder="Enter Code"
                                        required
                                    />
                                </div>
                                <br />

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-block get"
                                    >
                                        Verify Code
                                    </button>
                                </div>
                            </form>
                        </div>


                        {/*Stage 3 */}
                        <div hidden={stage3}>
                            <form onSubmit={changePassword}>
                                <div className="input-group">
                                    {' '}
                                    <span className="input-group-append bg-transparent">
                                        <span className="input-group-text bg-transparent icon">
                                            <img
                                                src={"./../images/email (4).png"}
                                                className="Imgs" alt= "email icon"
                                            />
                                        </span>
                                    </span>
                                    <input
                                        className="form-control inp"
                                        type="text"
                                        id="userEmail"
                                        placeholder="Enter Code"
                                        required
                                    />
                                </div>
                                <br />

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-block get"
                                    >
                                   Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
