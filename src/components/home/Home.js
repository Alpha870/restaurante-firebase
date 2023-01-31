import React, { useEffect, useState } from "react";
import "./Home.css";
import img from "./img/chatbot-kiu.gif";

const Home = () => {
  const [letra, setLetra] = useState("");
  const [activar, setActivar] = useState(false);

  useEffect(() => {
    const texto = Array.from(
      `Buuenos dias y bienvenido al restaurante?
         Soy tu asistente virtual.
         Ya tienes tu reserva?
        `
    );
    let index = 0;
    const pushToVariable = () => {
      setLetra((prevLetra) => prevLetra + texto[index]);
      index++;
      if (index < texto.length - 1) {
        setTimeout(pushToVariable, 100);
      } else {
        clearInterval(pushToVariable);
        setActivar(!activar ? true : false && setActivar(true));
      }
    };

    pushToVariable();
  }, []);

  return (
    <div className="homepage">
      <img src={img} alt="imagen chatbot" width='auto' height='200px'/>
      <div className="texto">
        <h2>{letra}</h2>
        {activar ? (
          <div className="botones">
            <button>si</button>
            <button>no</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Home;
