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

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/customerSignUp" element={<CustomerSignUp/>}/>
                <Route exact path="/addNewShowTime" element={<AddNewShowTime/>}/>
                <Route exact path="/updateShowTime" element={<UpdateShowTime/>}/>
                <Route exact path="/addMovie" element={<AddMovie/>}/>
                <Route exact path="/updateMovie" element={<UpdateMovie/>}/>
                <Route exact path="/buyTickets" element={<BuyTicket/>}/>
                <Route exact path="/theaterCard" element={<TheaterCard/>}/>
                <Route exact path="/allTheaters" element={<AllTheaters/>}/>


                <Route exact path="/movieCardTheater" element={<MovieCardTheater/>}/>
                <Route exact path="/movieCardTheater2" element={<MovieCardTheater2/>}/>
                <Route exact path="/oneTheater" element={<OneTheater/>}/>
                <Route exact path="/movieCardProduction1" element={<MovieCardProduction1/>}/>
                <Route exact path="/movieCardProduction2" element={<MovieCardProduction2/>}/>
                <Route exact path="/allMoviesProduction" element={<AllMovies/>}/>
                <Route exact path="/customerHeader" element={<CustomerHeader/>}/>
            </Routes>
        </Router>
    );
}

export default App;
