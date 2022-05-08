import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import CustomerSignUp from "./components/customer/pages/customerSignUp";
import AddNewShowTime from "./components/production_team/modals/addNewShowTime";
import UpdateShowTime from "./components/production_team/modals/updateShowTime";
import AddMovie from "./components/production_team/modals/addMovie";
import UpdateMovie from "./components/production_team/modals/updateMovie";
import BuyTicket from "./components/customer/modals/buyTickets";

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
            </Routes>
        </Router>
    );
}

export default App;
