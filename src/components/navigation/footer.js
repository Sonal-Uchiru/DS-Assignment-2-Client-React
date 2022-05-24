import React from 'react'
import './footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <footer
                className="text-center text-lg-start text-white"
                id="footer"
            >
                <section className="">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mt-2">
                            <img
                                src="./../images/footer.svg"
                                className="img-fluid Img"
                                alt="Sample image"
                            />
                        </div>
                        <hr className="w-100 clearfix d-md-none" />

                        <div
                            className=" col-md-5 col-lg-7 col-xl-6"
                            id="footerTxt"
                        >
                            <h1 className="txt">
                                The Cinema has no boundary; it is a ribbon of{' '}
                                <b style={{ color: '#ECB365' }}> dream </b>
                            </h1>
                            <h2 className=" text-center font-weight-bold orson">
                                - Orson Wells -
                            </h2>
                        </div>

                        <div className="col-md-4 col-lg-2 col-xl-3">
                            <h3 className=" mb-4 font-weight-bold" id="follow">
                                Follow Us
                            </h3>
                            <center>
                                <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic example"
                                >
                                    <button className="btn">
                                        <img
                                            src="./../images/instagram.png"
                                            className="img-fluid imgs"
                                            alt="Sample image"
                                        />
                                    </button>
                                    <button className="btn">
                                        <img
                                            src="./../images/facebook.png"
                                            className="img-fluid imgs"
                                            alt="Sample image"
                                        />
                                    </button>
                                    <button className="btn">
                                        <img
                                            src="./../images/youtube.png"
                                            className="img-fluid imgs"
                                            alt="Sample image"
                                        />
                                    </button>
                                </div>
                                <br /> <br />
                                <p className="info">
                                    <img
                                        src="./../images/web.png"
                                        className="img-fluid imgss"
                                        alt="Sample image"
                                    />{' '}
                                    https://www.mooncinemas.com
                                </p>
                                <p className="info">
                                    <img
                                        src="./../images/email.png"
                                        className="img-fluid imgss"
                                        alt="Sample image"
                                    />{' '}
                                    infomooncinemas@gmail.com
                                </p>
                            </center>
                        </div>
                    </div>
                </section>

                <div className="text-center p-3" id="copyright">
                    © 2022 Copyright Moon Cinemas. All Rights Reserved.
                </div>
            </footer>
        </div>
    )
}
