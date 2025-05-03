import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Gallery from "./features/Gallery/Gallery";
import Meteo from "./features/Meteo/Meteo";

function App() {
  return (
    <div className="App">
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/Meteo" element={<Meteo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
