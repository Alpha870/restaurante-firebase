import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Home from "./components/home/Home";
import Controlador from "./components/Controlador";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservas" element= {<Controlador/>} />
        </Routes>
      </Router>
    </>
  );
}


export default App;
