import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
