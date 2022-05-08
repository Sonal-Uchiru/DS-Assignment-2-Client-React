import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import CustomerSignUp from "./components/customer/pages/customerSignUp";
import AddNewShowTime from "./components/production_team/modals/addNewShowTime";
import UpdateShowTime from "./components/production_team/modals/updateShowTime";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/customerSignUp" element={<CustomerSignUp/>}/>
                <Route exact path="/addNewShowTime" element={<AddNewShowTime/>}/>
                <Route exact path="/updateShowTime" element={<UpdateShowTime/>}/>
            </Routes>
        </Router>
    );
}

export default App;
