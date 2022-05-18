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
import Example from './components/external_components/loading'
import {Private} from './private/protected_route'

function App() {
    return (
        <Router>
            {/*<Routes>*/}
            {/*    <Route path="/customerSignIn" element={<CustomerLogin/>} />*/}
            {/*   <Route path="/user" element={<Private Component={AllMovies} />} />*/}
            {/*</Routes>*/}
        </Router>

    )
}

export default App
