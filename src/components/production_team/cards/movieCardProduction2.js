import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../css/movieCardProduction2.css"
import Swal from "sweetalert2";

export default function MovieCardProduction2(props) {
    let movieDetails = props.details;
    let userToken = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng";

    let [movieImage, setMovieImage] = useState("https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg")

    return (
        <div className="MovieCardProduction2">
            <div className="card">

                <img src={props.details.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h4 className="card-title">{props.details.name}</h4>
                        </div>
                    </div>

                    {props.details.showing? <p className="status">Now Showing</p> : <p className="status">Coming Soon</p>}
                    <br/>

                </div>
                <div className="text-center">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick = {() => props.functiondelete(props.details.id)} className="btn grp1"><img src="./../images/delete.png" className="icon"
                                                                                                                                 alt="..."/></button>

                        <button type="button" className="btn  grp1" data-toggle="modal" data-target={`#${props.details.id}`}><img src="./../images/edit (1).png" className="icon"
                                                                                                                                  alt="..."/></button>

                    </div>
                </div>
                <br/>
            </div>

        </div>

    );
}