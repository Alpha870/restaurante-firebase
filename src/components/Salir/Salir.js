import React, { useEffect, useState } from "react";
import img from "../img/chatbot-kiu.gif";

const Salir = () => {
  const [letra, setLetra] = useState("");
  const [activar, setActivar] = useState(false);

  // Convertir el texto a un array de letras
  const texto = Array.from(
    `  Lamento tener que despedirme, pero tengo 
      que volver para seguir atendiendo a más clientes hambrientos.
      Espero verte pronto...
      `
  );
  // Contador para ir letra por letra
  let index = 0;

  // Función para simular una máquina de escribir
  const maquinaEscribir = () => {
    setLetra((prevLetra) => [...prevLetra, texto[index]]);
    index++;
    if (index < texto.length - 1) {
      setTimeout(maquinaEscribir, 80);
    } else {
      clearInterval(maquinaEscribir);
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
          <div>
            <a href="https://github.com/Alpha870/restaurante-firebase">
              <box-icon
                name="door-open"
                flip="horizontal"
                size="60px"
              ></box-icon>
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Salir;