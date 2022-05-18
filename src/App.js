import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, {Fragment} from 'react';
import './App.css'
import CustomerSignUp from './components/customer/pages/customerSignUp'
import AddNewShowTime from './components/production_team/modals/addNewShowTime'
import UpdateShowTime from './components/production_team/modals/updateShowTime'
import AddMovie from './components/production_team/modals/addMovie'
import UpdateMovie from './components/production_team/modals/updateMovie'
import BuyTicket from './components/customer/modals/buyTickets'
import TheaterCard from './components/production_team/cards/theaterCard'
import AllTheaters from './components/production_team/pages/allTheaters'
import MovieCardTheater from './components/production_team/cards/movieCardTheater'
import OneTheater from './components/production_team/pages/OneTheater'
import MovieCardTheater2 from './components/production_team/cards/movieCardTheater2'
import AllMovies from './components/production_team/pages/allMovies'
import MovieCardProduction1 from './components/production_team/cards/movieCardProduction1'
import MovieCardProduction2 from './components/production_team/cards/movieCardProduction2'
import CustomerHeader from './components/customer/navigation/customerHeader'
import ProductionTeamHeader from './components/production_team/navigation/productionTeamHeader'
import AllMoviesCustomer from './components/customer/pages/allMoviesCustomer'
import CustomerLogin from './components/authentication_components/customerSignIn'
import ProductionTeamLogin from './components/production_team/pages/productionSignIn'
import MovieCart from './components/customer/pages/movieCart'

import Reservation from './components/customer/pages/reservation'
import Test from './components/Test'
import ForgotPassword from './components/password_recovery/forgotPassword'
import Example from "./components/external_components/loading";
import SelectedMovie from './components/customer/pages/selectedMovie'

import {Private} from './private/protected_route'

function App() {
    return (
        <Router>
            <Routes>
            {/*    <Route path="/customerSignIn" element={<CustomerLogin/>} />*/}
            {/*   <Route path="/user" element={<Private Component={AllMovies} />} />*/}
            {/*</Routes>*/}
            {/*loading*/}
            {/*<div className="container d-flex justify-content-center">*/}
            {/*    <Example type={"bars"} color={"#ECB365"} height={"50px"} width={"50px"}/>*/}
            {/*</div>*/}

            {/*<Routes>*/}
                <Route exact path="/te" element={<Test />} />
                {/*Customer*/}
                <Route
                    exact
                    path="/customerSignUp"
                    element={<CustomerSignUp />}
                />
                <Route exact path="/buyTickets" element={<BuyTicket />} />
                <Route
                    exact
                    path="/allMoviesCustomer"
                    element={<AllMoviesCustomer />}
                />
                <Route
                    exact
                    path="/customerHeader"
                    element={<CustomerHeader />}
                />
                <Route
                    exact
                    path="/customerSignIn"
                    element={<CustomerLogin />}
                />
                <Route exact path="/movieCart" element={<MovieCart />} />
                <Route exact path="/reservation" element={<Reservation />} />
                <Route exact path="/selectedMovie" element={<SelectedMovie />} />


                {/*Both*/}

                <Route
                    exact
                    path="/forgotPassword"
                    element={<ForgotPassword />}
                />

                {/*Production Team*/}
                <Route
                    exact
                    path="/addNewShowTime"
                    element={<AddNewShowTime />}
                />
                <Route
                    exact
                    path="/updateShowTime"
                    element={<UpdateShowTime />}
                />
                <Route exact path="/addMovie" element={<AddMovie />} />
                <Route exact path="/updateMovie" element={<UpdateMovie />} />
                <Route exact path="/allTheaters" element={<AllTheaters />} />
                <Route exact path="/oneTheater" element={<OneTheater />} />
                <Route
                    exact
                    path="/allMoviesProduction"
                    element={<AllMovies />}
                />
                <Route
                    exact
                    path="/productionHeader"
                    element={<ProductionTeamHeader />}
                />
                <Route
                    exact
                    path="/productionSignIn"
                    element={<ProductionTeamLogin />}
                />
            </Routes>
        </Router>
    )
}

export default App
