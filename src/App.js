import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import './App.css'
import AuthenticationSignUp from './components/authentication_components/authenticationSignUp'
import AllTheaters from './components/production_team/pages/allTheaters'
import OneTheater from './components/production_team/pages/OneTheater'
import AllMovies from './components/production_team/pages/allMovies'
import CustomerHeader from './components/customer/navigation/customerHeader'
import ProductionTeamHeader from './components/production_team/navigation/productionTeamHeader'
import AllMoviesCustomer from './components/customer/pages/allMoviesCustomer'
import MovieCart from './components/customer/pages/movieCart'
import Reservation from './components/customer/pages/reservation'
import ForgotPassword from './components/password_recovery/forgotPassword'
import SelectedMovie from './components/customer/pages/selectedMovie'
import {Private} from './private/protected_route'
import Footer from "./components/navigation/footer";
import AuthenticationSignIn from "./components/authentication_components/authenticationSignIn";
import AddMovie from "./components/production_team/modals/addMovie";

function App() {
    return (
        <Router>
            {/*<AddMovie/>*/}
            {/*<AllMovies/>*/}
            <Routes>
                {/*authentication routes*/}
                <Route path="/" element={<AuthenticationSignIn/>} />
                <Route path="/signUp" element={<AuthenticationSignUp />} />
                <Route path="/forgotPassword" element={<ForgotPassword />}/>
                {/*customer routes*/}
               <Route path="/movies" element={<><CustomerHeader/><Private Component={AllMoviesCustomer} /></>} />
                <Route path="/ticketCart" element={<><CustomerHeader/><Private Component={MovieCart} /></>} />
                <Route path="/reservation" element={<><CustomerHeader/><Private Component={Reservation} /></>} />
                <Route path="/movie/:id" element={<><CustomerHeader/><Private Component={SelectedMovie} /></>} />
                {/*production team routes*/}
                <Route path="/theaters" element={<><ProductionTeamHeader/><Private Component={AllTheaters} /></>} />
                <Route path="/theater/:id" element={<><ProductionTeamHeader/><Private Component={OneTheater} /></>} />
                <Route path="/movieProduction" element={<><ProductionTeamHeader/><Private Component={AllMovies} /></>} />
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;
