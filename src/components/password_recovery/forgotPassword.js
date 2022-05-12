import React, { useState } from 'react'
import axios from 'axios'
import './forgotPassword.css'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { codeGenerator } from '../../generators/codeGenerator'
import { forgotPasswordEmail } from '../../email_service/forgotPasswordEmail'
import PasswordStrengthIndicator from '../external_components/passwordStrengthIndicator'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const [stage1, setStage1] = useState(false)
    const [stage2, setStage2] = useState(true)
    const [stage3, setStage3] = useState(true)
    const [invalidTxt, setInvalidTxt] = useState(true)
    const [email, setEmail] = useState('')
    const [inputCode, setInputCode] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [inputConfirmPassword, setInputConfirmPassword] = useState('')
    const [misMatchTextStatus, setMisMatchTextStatus] = useState(true)
    const [genCode, setGenCode] = useState('')
    let code = ''

    const [passwordValidity, setPasswordValidity] = useState({
        minChar: null,
        number: null,
        specialChar: null,
    })
    const isNumberRegx = /\d/
    const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

    function getUserByEmail() {
        return new Promise(async (resolve, reject) => {
            await axios({
                url: 'http://localhost:8093/api/users/' + email + '/email',
                method: 'GET',
            })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    async function sendEmail(e) {
        e.preventDefault()
        await getUserByEmail().then(async (res) => {
            if (res !== '') {
                setInvalidTxt(true)
                code = codeGenerator(5)
                setGenCode(code)
                const emailContent = {
                    email,
                    code,
                }

                await forgotPasswordEmail(emailContent)
                    .then((res) => {
                        Swal.fire(
                            'Email has been sent!',
                            'Check your emails',
                            'success'
                        )
                        setStage2(false)
                        setStage1(true)
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    })
            } else {
                await Swal.fire({
                    title: 'User not Found!',
                    icon: 'info',
                })
            }
        })
    }

    async function validateCode(e) {
        e.preventDefault()
        setInvalidTxt(true)
        if (genCode === inputCode) {
            await Swal.fire(
                'Code Valid!',
                'Now you can change your password',
                'success'
            )
            setStage3(false)
            setStage2(true)
        } else {
            setInvalidTxt(false)
        }
    }

    function validatePassword() {
        if (
            passwordValidity.minChar &&
            passwordValidity.number &&
            passwordValidity.specialChar
        ) {
            return true
        }
    }

    async function changePassword(e) {
        e.preventDefault()
        setMisMatchTextStatus(true)
        if (!validatePassword()) {
            return false
        }
        if (inputPassword === inputConfirmPassword) {
            const content = {
                password: inputPassword,
            }
            await axios({
                url: 'http://localhost:8093/api/users/' + email + '/password',
                method: 'PATCH',
                data: content,
            })
                .then((res) => {
                    Swal.fire(
                        'Password Changed',
                        'You can log into the system',
                        'success'
                    )
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
        } else {
            setMisMatchTextStatus(false)
        }
    }

    function back() {
        setMisMatchTextStatus(true)
        setInvalidTxt(true)
        setStage1(false)
        setStage2(true)
    }

    return (
        <div className="ForgotPassword">
            <div className="d-flex justify-content-center">
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body">
                        <div className="text-center">
                            <div>
                                <img
                                    src={'./../images/forgot.png'}
                                    className="Img"
                                    alt="lock_img"
                                />
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
                        <div hidden={stage1}>
                            <form onSubmit={sendEmail}>
                                <div className="input-group">
                                    {' '}
                                    <span className="input-group-append bg-transparent">
                                        <span className="input-group-text bg-transparent icon">
                                            <img
                                                src={
                                                    './../images/email (4).png'
                                                }
                                                className="Imgs"
                                                alt="email icon"
                                            />
                                        </span>
                                    </span>
                                    <input
                                        className="form-control inp"
                                        type="email"
                                        id="userEmail"
                                        placeholder="Enter Email"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
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
                                <h5
                                    className="text-center text-danger"
                                    hidden={invalidTxt}
                                >
                                    Invalid Code!
                                </h5>
                                <div className="input-group">
                                    {' '}
                                    <span className="input-group-append bg-transparent">
                                        <span className="input-group-text bg-transparent icon">
                                            <img
                                                src={'./../images/settings.png'}
                                                className="Imgs"
                                                alt="settings icon"
                                            />
                                        </span>
                                    </span>
                                    <input
                                        className="form-control inp"
                                        type="text"
                                        id="userCode"
                                        placeholder="Enter Code"
                                        onChange={(e) =>
                                            setInputCode(e.target.value)
                                        }
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
                            <br />
                            <div className="text-center">
                                <a onClick={back} className="text-warning">
                                    Back
                                </a>
                            </div>
                        </div>

                        {/*Stage 3 */}
                        <div hidden={stage3}>
                            <h5
                                className="text-center text-danger"
                                hidden={misMatchTextStatus}
                            >
                                Password Mismatch!
                            </h5>
                            <form onSubmit={changePassword}>
                                {/*password*/}
                                <div className="input-group">
                                    {' '}
                                    <span className="input-group-append bg-transparent">
                                        <span className="input-group-text bg-transparent icon">
                                            <img
                                                src={'./../images/lock.png'}
                                                className="Imgs"
                                                alt="lock icon"
                                            />
                                        </span>
                                    </span>
                                    <input
                                        className="form-control inp"
                                        type="password"
                                        id="userPassword"
                                        placeholder="Create New Password"
                                        onChange={(e) => {
                                            setInputPassword(e.target.value)
                                            setPasswordValidity({
                                                minChar:
                                                    e.target.value.length >= 8,
                                                number: isNumberRegx.test(
                                                    e.target.value
                                                ),
                                                specialChar:
                                                    specialCharacterRegx.test(
                                                        e.target.value
                                                    ),
                                            })
                                        }}
                                        required
                                    />
                                </div>
                                <br />
                                <PasswordStrengthIndicator
                                    validity={passwordValidity}
                                />

                                {/*confirm password*/}
                                <div className="input-group">
                                    {' '}
                                    <span className="input-group-append bg-transparent">
                                        <span className="input-group-text bg-transparent icon">
                                            <img
                                                src={'./../images/lock.png'}
                                                className="Imgs"
                                                alt="lock icon"
                                            />
                                        </span>
                                    </span>
                                    <input
                                        className="form-control inp"
                                        type="password"
                                        id="userConfirmPassword"
                                        placeholder="Confirm Password"
                                        onChange={(e) =>
                                            setInputConfirmPassword(
                                                e.target.value
                                            )
                                        }
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
