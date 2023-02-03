import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/home/Home";
import Controlador from "./components/Controlador/Controlador";
import Autenticar from "./components/Autenticar/Autenticar";
import Sala from "./components/sala/Sala";
import Salir from "./components/Salir/Salir";
import Pagar from "./components/Pagar/Pagar";

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservas" element={<Controlador />} />
          <Route path="/autenticar" element={<Autenticar />} />
          <Route path="/sala" element={<Sala />} />
          <Route path="/pagar" element={<Pagar />} />
          <Route path="/salir" element={<Salir />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
