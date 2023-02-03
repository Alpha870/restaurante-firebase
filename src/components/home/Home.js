import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import img from "../img/chatbot-kiu.gif";

const Home = () => {
  const [letra, setLetra] = useState("");
  const [activar, setActivar] = useState(false);

  // Convertir el texto a un array de letras
  const texto = Array.from(
    `  Encantado de conocerte y bienvenido al restaurante.
    Soy Kiu tu asistente virtual. Te estaré acompañando en
    todo momento.
    ¿Ya tienes tu reserva?
    `
  );
  // Contador para ir letra por letra
  let index = 0;

  // Función para simular una máquina de escribir
  const maquinaEscribir = () => {
    // recibe el valor anterior de letra (prevLetra) y devuelve un nuevo array 
    // que contiene todas las letras previas más la letra actual (texto[index]).
    setLetra((prevLetra) => [...prevLetra, texto[index]]);
    // Aumentar el contador
    index++;
    // Si todavía hay más letras en el texto, ejecutar la función de nuevo
    //el -1 es para evitar que escriba el undefined
    if (index < texto.length - 1) {
      setTimeout(maquinaEscribir, 100);
    } else {
      // Si se han escrito todas las letras, limpiar el setTimeout
      // y establecer el estado en verdadero
      clearTimeout(maquinaEscribir);
      setActivar(!activar ? true : false);
    }
  };

  useEffect(() => {
    maquinaEscribir();
  }, []);

  return (
    <div className="homepage">
      <img src={img} alt="imagen chatbot" width="auto" height="200px" />
      <div className="texto">
        <h2>{letra}</h2>
        {activar ? (
          <div className="botones">
            <Link to={"/autenticar"}>
              <button type="button" className="btn btn-info">
                Si, la tengo
              </button>
            </Link>
            <Link to={"/reservas"}>
              <button type="button" className="btn btn-light">
                No, quiero reservar
              </button>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Home;
