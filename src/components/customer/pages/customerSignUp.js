import React, {useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import "./../css/customerSignUp.css"
import PasswordStrengthIndicator from "../../external_components/passwordStrengthIndicator";


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

    //Error Handling
    const [UsernameError, SetUsernameError] = useState("");
    const [EmailError, SetEmailError] = useState("");
    const [ContactNumberError, SetContactNoError] = useState("");
    const [PasswordError, SetPasswordError] = useState("");
    const [confirmPasswordError, SetConfirmPasswordError] = useState("");
    const [FirstNameError, setFirstNameError] = useState("");
    const [LastNameError, setLastNameError] = useState("");
    const [GenderError, setGenderError] = useState("");
    const [ExtraError, setExtraError] = useState("");

    const [passwordMatchDiv, setPasswordMatchDiv] = useState(true);
    const [passwordMisMatchDiv, setPasswordMisMatchDiv] = useState(true);


    let flaguser,flagmail, flagpassword, flagfname, flaglname, flaggender = 0;

    const [passwordFocused, setPasswordFocused] = useState(false);

    const isNumberRegx = /\d/;
    const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    const [passwordValidity, setPasswordValidity] = useState({
        minChar: null,
        number: null,
        specialChar: null,
    });

    function hasWhiteSpace(s) {
        return (/\s/).test(s);
    }

    function checkFNamePattern(word) {
        if (!/[^a-zA-Z]/.test(word) === false) {
            setFirstNameError("First Name can only contain letters");
            flagfname = 0;

        } else {
            flagfname = 1;

        }
    }

    function checkLNamePattern(word) {
        if (!/[^a-zA-Z]/.test(word) === false) {
            setLastNameError("Last Name can only contain letters");

            flaglname = 0;
        } else {

            flaglname = 1;
        }
    }


    function checkPasswords(confirmpassword) {
        let Password = document.getElementById("inputpassword").value;
        if (Password.length !== 0 || confirmpassword.length !== 0) {
            if (Password === confirmpassword) {
                setPasswordMatchDiv(false);
                setPasswordMisMatchDiv(true);
            } else if (Password !== confirmpassword) {
                setPasswordMisMatchDiv(false);
                setPasswordMatchDiv(true);
            } else {
                setPasswordMatchDiv(true);
                setPasswordMisMatchDiv(true);
            }
        } else {
            setPasswordMatchDiv(true);
            setPasswordMisMatchDiv(true);
        }
    }

    function validate() {

        let Password = document.getElementById("inputpassword").value;
        let ConfirmPassword = document.getElementById("confrimPassword").value;
        console.log(Password);
        console.log(ConfirmPassword);



        if (hasWhiteSpace(Password) == true) {
            flagpassword = 0;
            SetPasswordError("Password Cannot Contain WhiteSpaces");
        } else if (Password !== ConfirmPassword) {
            console.log("Validate Fuction Error");
            flagpassword = 0;
            setPasswordMisMatchDiv(false);
            setPasswordMatchDiv(true);
        } else if (
            passwordValidity.minChar !== true ||
            passwordValidity.specialChar !== true ||
            passwordValidity.number !== true
        ) {
            flagpassword = 0;
            setExtraError("Please give the password in required format");
        } else {
            flagpassword = 1;
        }
    }

    function validateGender(gender){

        console.log(gender);
        if(gender === "male" || gender === "female"){
            flaggender = 1;
        }
        else {

            setGenderError("Please select a gender!");
            flaggender = 0;
        }
    }


    // Password toggle handler
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    }

    const toggleCPasswordVisibility = () => {
        setCpasswordShown(!CpasswordShown);
    }


    function handleSignUp(e){

        e.preventDefault();
        validate();
        //Reconfirm Email UserName!!!!

        checkFNamePattern(firstName);
        checkLNamePattern(lastName);
        checkPasswords(confirmPassword);
        validateGender(gender);

        console.log(`Gender flag : ${flaggender}`);
        console.log(`Password flag : ${flagpassword}`);
        console.log(`Firstname flag : ${flagfname}`);
        console.log(`Lastname flag : ${flaglname}`);

        if(
            (flagpassword == 1) && (flagfname == 1) &&
            flaglname == 1 && flaggender == 1){


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
                    Swal.fire(
                        "You're! All Set",
                        "You Account Has Been Created Successfully!",
                        "success"
                    );

                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong! Try again Later!",
                    });
                })


            console.log(newUser);

        }

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

                                <div className="text-center">
                                    <p
                                        className="mt-1 mb-0"
                                        style={{color: "red", fontWeight: "bold"}}
                                    >
                                        {UsernameError}
                                    </p>
                                    <p
                                        className=" mt-1 mb-0"
                                        style={{color: "red", fontWeight: "bold"}}
                                    >
                                        {EmailError}
                                    </p>
                                    <p
                                        className=" mt-1 mb-0"
                                        style={{color: "red", fontWeight: "bold"}}
                                    >
                                        {FirstNameError}
                                    </p>
                                    <p
                                        className=" mt-1 mb-0"
                                        style={{color: "red", fontWeight: "bold"}}
                                    >
                                        {LastNameError}
                                    </p>
                                    <p
                                        className=" mt-1 mb-0"
                                        style={{color: "red", fontWeight: "bold"}}
                                    >
                                        {ExtraError}
                                    </p>

                                    <p
                                        className=" mt-1 mb-0"
                                        style={{color: "red", fontWeight: "bold"}}
                                    >
                                        {PasswordError}
                                    </p>

                                    <div className="text-center" hidden={passwordMatchDiv}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            fill="#279B14"
                                            className="bi bi-check-circle-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        <p style={{color: "#279B14"}}>
                                            <b>Password Match</b>
                                        </p>
                                    </div>
                                    <div className="text-center" hidden={passwordMisMatchDiv}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            fill="#D0193A"
                                            className="bi bi-x-circle-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                        </svg>
                                        <p style={{color: "#D0193A"}}>
                                            <b>Password MisMatch</b>
                                        </p>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="firstname">First name</label>
                                            <input type="text" id="firstname" className="form-control"
                                                   placeholder="First Name"
                                                   required
                                                   onChange={(e) => {
                                                       setFirstName(e.target.value);
                                                       setFirstNameError("");
                                                       checkFNamePattern(e.target.value);
                                                   }}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="lastname">Last name</label>
                                            <input type="text" id="lastname" className="form-control"
                                                   required={true}
                                                   placeholder="Last Name"  onChange={(e) => {
                                                setLastName(e.target.value);
                                                setLastNameError("");
                                                checkLNamePattern(e.target.value);
                                            }}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3" id="username">Email
                                        Address</label>
                                    <input type="email" id="email" className="form-control form-control-lg"
                                           required={true}
                                           placeholder="Email Address"  onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3">Gender</label>
                                    <select name="gender" id="gender" className="form-select "  onChange={(e) => {
                                        setGender(e.target.value);
                                        setGenderError("");
                                    }}
                                    required={true}>
                                        <option>Select Your Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <p
                                        className=" mt-1 mb-0"
                                        style={{color: "red", fontWeight: "bold"}}
                                    >
                                        {GenderError}
                                    </p>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3">NIC
                                        Number</label>
                                    <input type="text" id="nic" className="form-control form-control-lg"
                                           required={true}
                                           placeholder="999285xxxxxx"
                                           onChange={(e) => {
                                               setNic(e.target.value);
                                           }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3" id="username">Address</label>
                                    <input type="text" id="address" className="form-control form-control-lg"
                                           placeholder="Address"
                                           required={true}
                                           onChange={(e) => {
                                               setAddress(e.target.value);
                                           }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3">Mobile Number</label>
                                    <input type="number" id="mobile" className="form-control form-control-lg"
                                           placeholder="0765581xxx"
                                           required={true}
                                           onChange={(e) => {
                                               setMobilePhoneNumber(e.target.value);
                                           }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3" id="username">Username</label>
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Username" id="username"
                                           required={true}
                                           onChange={(e) => {
                                               setUserName(e.target.value);
                                           }}/>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4" id="password">Password</label>
                                    <input id="inputpassword" className="form-control form-control-lg"
                                           required={true}
                                           placeholder="Password" type={passwordShown ? "text" : "password"}
                                           onFocus={() => setPasswordFocused(true)}
                                           onBlur={() => {
                                               setPasswordFocused(false);

                                               setPasswordMatchDiv(true);
                                               setPasswordMisMatchDiv(true);
                                           }}
                                           onChange={(e) => {
                                               SetPasswordError("");

                                               if (hasWhiteSpace(e.target.value) === true) {
                                                   SetPasswordError(
                                                       "Password Cannot Contain White Spaces"
                                                   );
                                               }

                                               setPassword(e.target.value);

                                               setExtraError("");
                                               setPasswordValidity({
                                                   minChar: e.target.value.length >= 8 ? true : false,
                                                   number: isNumberRegx.test(e.target.value.trim())
                                                       ? true
                                                       : false,
                                                   specialChar: specialCharacterRegx.test(
                                                       e.target.value
                                                   )
                                                       ? true
                                                       : false,
                                               });
                                           }}/>
                                    <span className="p-viewer">
                        <i id="eyeIcon"
                           className={`fa ${passwordShown ? "fa-eye" : "fa-eye-slash"} password-icon`}
                           onClick={togglePasswordVisibility}
                        >
                          {" "}
                        </i>
                      </span>
                                    {passwordFocused && (
                                        <PasswordStrengthIndicator validity={passwordValidity} />
                                    )}
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4" id="Cpassword">Confirm
                                        Password</label>
                                    <input id="confrimPassword" className="form-control form-control-lg"
                                           required={true}
                                           placeholder="Confirm Password" type={CpasswordShown ? "text" : "password"}
                                           onChange={(e) => {
                                               setConfirmPassword(e.target.value);
                                               SetConfirmPasswordError("");
                                               checkPasswords(e.target.value);
                                           }}
                                           onBlur={() => {
                                               setPasswordMatchDiv(true);
                                               setPasswordMisMatchDiv(true);
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
                                    <input type="checkbox" className="form-check-input" required={true} id="check"/>
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
