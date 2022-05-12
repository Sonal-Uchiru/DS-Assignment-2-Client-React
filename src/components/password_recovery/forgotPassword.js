import React, {useState} from "react";
import axios from "axios";
import "./forgotPassword.css"

export default function ForgotPassword() {

    return (
        <div className="ForgotPassword">
            <div className="d-flex justify-content-center">
                <div
                    className="card shadow p-3 mb-5 bg-white rounded"
                >
                    <div className="card-body">
                        <div className="text-center">
                            <div>
                                <img src="./../images/forgot.png" className="Img"/>
                            </div>
                        </div>
                        <br/>
                        <div className="text-center">
                            <h1 className="forgotT">Forgot Password?</h1>
                        </div>
                        <br/>
                        <div className="text-center">
                            <h7 className="reset">
                                You can reset your password from here.
                            </h7>
                        </div>

                        <br/>
                        <div>
                            <form>
                                <div className="input-group">
                                    {" "}
                                    <span className="input-group-append bg-transparent">
                    <span className="input-group-text bg-transparent icon">
                    <img src="./../images/email (4).png" className="Imgs"/>
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
                                <br/>

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
                    </div>
                </div>
            </div>
        </div>

            );
            }