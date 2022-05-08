import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import CustomerSignUp from "./components/customer/pages/customerSignUp";
import AddNewShowTime from "./components/production_team/modals/addNewShowTime";
import UpdateShowTime from "./components/production_team/modals/updateShowTime";
import AddMovie from "./components/production_team/modals/addMovie";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/customerSignUp" element={<CustomerSignUp/>}/>
                <Route exact path="/addNewShowTime" element={<AddNewShowTime/>}/>
                <Route exact path="/updateShowTime" element={<UpdateShowTime/>}/>
                <Route exact path="/addMovie" element={<AddMovie/>}/>
            </Routes>
        </Router>
    );
}

export default App;
