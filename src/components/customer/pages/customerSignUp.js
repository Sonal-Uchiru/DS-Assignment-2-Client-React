import React, {useState} from "react";
import axios from "axios";
import "./../css/customerSignUp.css"

export default function CustomerSignUp() {

    return (
        <div className="CusRegister">

            <div className="container">
                <h1 className="sign">Sign up</h1>
                <br/>
                <form>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                <label className="form-label" for="firstname">First name</label>
                                <input type="text" id="firstname" className="form-control" placeholder="First Name"/>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                <label className="form-label" for="lastname">Last name</label>
                                <input type="text" id="lastname" className="form-control" placeholder="Last Name"/>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label for="Email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="Email" placeholder="Email Address"/>
                    </div>

                    <div className="mb-3">
                        <label for="gender" className="form-label">Gender</label><br/>
                        <select name="gender" id="gender" value="Select Your Gender">
                            <option value="">Select Your Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="nic" className="form-label">NIC Number</label>
                        <input type="text" className="form-control" id="nic" placeholder="999285xxxxxx"/>
                    </div>

                    <div className="mb-3">
                        <label for="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" placeholder="Address"/>
                    </div>


                    <div className="mb-3">
                        <label for="mobile" className="form-label">Mobile Number</label>
                        <input type="text" className="form-control" id="mobile" placeholder="0765581xxx"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Username"/>
                    </div>

                    <div className="mb-3">
                        <label for="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" placeholder="Password"/>
                    </div>

                    <div className="mb-3">
                        <label for="CPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="CPassword" placeholder="Confirm Password"/>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">By creating an account you agree to
                            our <a style={{color: '#ECB365'}}>Terms & Privacy.</a></label>
                    </div>
                    <button type="submit" className="btn rounded signUp">Create</button>
                    <span className="text-center" id="acc">Existing User? <b><a id="clickme">Login</a></b></span>
                </form>
            </div>


            <br/>
        </div>
    );
}
