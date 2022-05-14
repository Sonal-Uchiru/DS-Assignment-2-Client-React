import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import CustomerSignUp from "./components/customer/pages/customerSignUp";
import AddNewShowTime from "./components/production_team/modals/addNewShowTime";
import UpdateShowTime from "./components/production_team/modals/updateShowTime";
import AddMovie from "./components/production_team/modals/addMovie";
import UpdateMovie from "./components/production_team/modals/updateMovie";
import BuyTicket from "./components/customer/modals/buyTickets";
import TheaterCard from "./components/production_team/cards/theaterCard";
import AllTheaters from "./components/production_team/pages/allTheaters";
import MovieCardTheater from "./components/production_team/cards/movieCardTheater";
import OneTheater from "./components/production_team/pages/OneTheater";
import MovieCardTheater2 from "./components/production_team/cards/movieCardTheater2";
import AllMovies from "./components/production_team/pages/allMovies";
import MovieCardProduction1 from "./components/production_team/cards/movieCardProduction1";
import MovieCardProduction2 from "./components/production_team/cards/movieCardProduction2";
import CustomerHeader from "./components/customer/navigation/customerHeader";
import ProductionTeamHeader from "./components/production_team/navigation/productionTeamHeader";
import AllMoviesCustomer from "./components/customer/pages/allMoviesCustomer";
import MovieCardCustomer1 from "./components/customer/cards/movieCardCustomer";
import MovieCardCustomer2 from "./components/customer/cards/movieCardCustomer2";
import CustomerLogin from "./components/customer/pages/customerSignIn";
import ProductionTeamLogin from "./components/production_team/pages/productionSignIn";
import MovieCartCard from "./components/customer/cards/movieCartCard";
import MovieCart from "./components/customer/pages/movieCart";
import ReservationCard from "./components/customer/cards/reservationCard";
import Reservation from "./components/customer/pages/reservation";
import Test from "./components/Test";
import ForgotPassword from "./components/password_recovery/forgotPassword";
import SelectedMovie from "./components/customer/pages/selectedMovie";
import SelectedMovieCard from "./components/customer/cards/selectedMovieCard";

function App() {
    return (
        <>
            <Routes>

                <Route exact path="/te" element={<Test/>}/>
                {/*Customer*/}
                <Route exact path="/customerSignUp" element={<CustomerSignUp/>}/>
                <Route exact path="/buyTickets" element={<BuyTicket/>}/>
                <Route exact path="/allMoviesCustomer" element={<AllMoviesCustomer/>}/>
                <Route exact path="/customerHeader" element={<CustomerHeader/>}/>
                <Route exact path="/customerSignIn" element={<CustomerLogin/>}/>
                <Route exact path="/movieCart" element={<MovieCart/>}/>
                <Route exact path="/reservation" element={<Reservation/>}/>
                <Route exact path="/selectedMovie" element={<SelectedMovie/>}/>

                {/*Both*/}


                <Route exact path="/forgotPassword" element={<ForgotPassword/>}/>

                {/*Production Team*/}
                <Route exact path="/addNewShowTime" element={<AddNewShowTime/>}/>
                <Route exact path="/updateShowTime" element={<UpdateShowTime/>}/>
                <Route exact path="/addMovie" element={<AddMovie/>}/>
                <Route exact path="/updateMovie" element={<UpdateMovie/>}/>
                <Route exact path="/allTheaters" element={<AllTheaters/>}/>
                <Route exact path="/oneTheater" element={<OneTheater/>}/>
                <Route exact path="/allMoviesProduction" element={<AllMovies/>}/>
                <Route exact path="/productionHeader" element={<ProductionTeamHeader/>}/>
                <Route exact path="/productionSignIn" element={<ProductionTeamLogin/>}/>

            </Routes>
        </>
    );
}

export default App;
