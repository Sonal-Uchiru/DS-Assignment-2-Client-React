import React, {useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import "./../css/customerSignUp.css"


const eye = <FontAwesomeIcon icon={faEye}/>;
const sleye = <FontAwesomeIcon icon={faEyeSlash}/>;

export default function CustomerSignUp() {

    const [passwordShown, setPasswordShown] = useState(false);
    const [CpasswordShown, setCpasswordShown] = useState(false);

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [nic, setNic] = useState("");
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");





    // Password toggle handler
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    }

    const toggleCPasswordVisibility = () => {
        setCpasswordShown(!CpasswordShown);
    }


    function handleSignUp(e){

        e.preventDefault();
        console.log("GG");
        const newUser = {
            username,
            password,
            firstName,
            lastName,
            email,
            gender,
            nic,
            mobilePhoneNumber,
            address,
            role:"user"
        }

        //API call

             axios({
                url: 'http://localhost:8093/api/signup',
                method: 'POST',
                data : newUser
            })
                .then((res) => {
                    console.log(res.data)

                })
                .catch((err) => {
                    console.log(err);
                })


        console.log(newUser);
    }


    return (
        <div className="CusRegister">

            <section className="">
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-9 col-lg-6 col-xl-4">
                            <img src="./../images/moon.svg"
                                 className="img-fluid Img" alt="Sample image"/>
                        </div>


                        <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 rightSide">
                            <h1 className="sign">Sign Up</h1>
                            <br/>
                            <form onSubmit={handleSignUp} id="signupf">

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="firstname">First name</label>
                                            <input type="text" id="firstname" className="form-control"
                                                   placeholder="First Name"
                                                   onChange={(e) => {
                                                       setFirstName(e.target.value);
                                                   }}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="lastname">Last name</label>
                                            <input type="text" id="lastname" className="form-control"
                                                   placeholder="Last Name"  onChange={(e) => {
                                                setLastName(e.target.value);
                                            }}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3" id="username">Email
                                        Address</label>
                                    <input type="email" id="email" className="form-control form-control-lg"
                                           placeholder="Email Address"  onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3">Gender</label>
                                    <select name="gender" id="gender" className="form-select "  onChange={(e) => {
                                        setGender(e.target.value);
                                    }}>
                                        <option>Select Your Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3">NIC
                                        Number</label>
                                    <input type="text" id="nic" className="form-control form-control-lg"
                                           placeholder="999285xxxxxx"
                                           onChange={(e) => {
                                               setNic(e.target.value);
                                           }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3" id="username">Address</label>
                                    <input type="text" id="address" className="form-control form-control-lg"
                                           placeholder="Address"
                                           onChange={(e) => {
                                               setAddress(e.target.value);
                                           }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3">Mobile Number</label>
                                    <input type="text" id="mobile" className="form-control form-control-lg"
                                           placeholder="0765581xxx"
                                           onChange={(e) => {
                                               setMobilePhoneNumber(e.target.value);
                                           }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3" id="username">Username</label>
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Username" id="username"
                                           onChange={(e) => {
                                               setUserName(e.target.value);
                                           }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4" id="password">Password</label>
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

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4" id="Cpassword">Confirm
                                        Password</label>
                                    <input id="form3Example4" className="form-control form-control-lg"
                                           placeholder="Confirm Password" type={CpasswordShown ? "text" : "password"}
                                           onChange={(e) => {
                                               setConfirmPassword(e.target.value);
                                           }}/>
                                    <span className="p-viewer">
                        <i id="eyeIcon"
                           className={`fa ${CpasswordShown ? "fa-eye" : "fa-eye-slash"} password-icon`}
                           onClick={toggleCPasswordVisibility}
                        >
                          {" "}
                        </i>
                      </span>
                                </div>

                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="check"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">By creating an account
                                        you agree to
                                        our <a style={{color: '#ECB365'}}>Terms & Privacy.</a></label>
                                </div>

                                <button type="submit" className="btn rounded signUp" form="signupf">Sign Up</button>
                                <span className="text-center" id="acc">Existing User? <a id="clickme">Login</a></span>


                            </form>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
}
