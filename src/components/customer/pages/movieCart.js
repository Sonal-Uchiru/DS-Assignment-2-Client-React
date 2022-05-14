import React, {useState, useEffect} from "react";
import axios from "axios";
import "./../css/movieCart.css"
import MovieCardProduction1 from "../../production_team/cards/movieCardProduction1";
import MovieCartCard from "../cards/movieCartCard";

export default function MovieCart() {

    const [cartItems, setCartItems] = useState([]);
    const [duplicateCartItems, setDuplicateCartItems] = useState([]);
    const userToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIyMzYyMTAxNzYsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIwLCJtaW51dGUiOjAsInNlY29uZCI6MTAsIm5hbm8iOjE3NTAwMDAwMCwiZGF5T2ZZZWFyIjoxMjgsImRheU9mV2VlayI6IlNVTkRBWSIsIm1vbnRoIjoiTUFZIiwiZGF5T2ZNb250aCI6OCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiY2hyb25vbG9neSI6eyJpZCI6IklTTyIsImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEifX19.pXjKM7rAsmc3Zj2TifZeLYRQ5FrSBJ1qdBrfCmrbbPzitO_F1drMBgPnKlvL1FkMa1u7rB_17M84EDSLrQn5Ng'


    useEffect(()=>{
        axios({
            url: 'http://localhost:8093/api/carts',
            method: 'GET',
            headers: { 'x-auth-token': userToken },
        })
            .then((res) => {
                setCartItems(res.data)
                setDuplicateCartItems(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    function handleSearch(userIn) {
        const result = duplicateCartItems.filter(
            (cart) =>
                cart.showTimeWithMovieTheaterDetailsDTO.movie.name
                    .toLowerCase()
                    .includes(userIn.toLowerCase()) ||
                cart.showTimeWithMovieTheaterDetailsDTO.theater.name
                    .toLowerCase()
                    .includes(userIn.toLowerCase())
        )

        setCartItems(result)
    }


    return (
        <div className="MovieCart">

            <div className="box">
                <img src="./../images/bag (2).png" className="logo"/>
            </div>
            <div className="CartName">
                <h1 className="cartN">Movie Cart</h1>
            </div>
            <br/><br/><br/><br/>

            <br/>
            <div className="main">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search By name..."
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }}/>
                    <div className="input-group-append">
                        <button className="btn searchbtn" type="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search icon"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <button type="button" className="btn btn-lg clear">Clear Cart</button>

            <br/>

            <div className="containerrrr d-flex justify-content-center flex-nowrap">
                <div className="row parent">
                    {cartItems.map((cart) => {
                        return(
                            <div className="columns">
                                <MovieCartCard cart={cart}/>
                            </div>
                        )
                    })

                    }
                </div>
            </div>

            <div className="text-center">
                <h2>Total:LKR 5000.00</h2>
                <button type="button" className="btn btn-lg buy">Buy Tickets</button>
            </div>

            <br/><br/>

        </div>

    );
}