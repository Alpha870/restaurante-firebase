import React, { useEffect, useState } from "react";
import "./Sala.css";
import img from "../img/chatbot-kiu.gif";

const Sala = () => {
  const [letra, setLetra] = useState("");
  const [activar, setActivar] = useState(false);

  useEffect(() => {
    // Convertir el texto a un array de letras
    const texto = Array.from(
      `  Lamento tener que despedirme, pero tengo 
      que volver para seguir atendiendo a más clientes hambrientos,
      espero que disfrutes de nuestro menú.
            Hasta otra y buen provecho…
        `
    );
    let index = 0;
    // Función para simular una máquina de escribir
    const maquinaEscribir = () => {
      setLetra((prevLetra) => [...prevLetra, texto[index]]);
      index++;
      // Si todavía hay más letras en el texto, ejecutar la función de nuevo
      //el -1 es para evitar el undefined
      if (index < texto.length - 1) {
        setTimeout(maquinaEscribir, 10);
      } else {
        // Si se han escrito todas las letras, detener la función y establecer el estado en verdadero
        clearInterval(maquinaEscribir);
        setActivar(!activar ? true : false);
      }
    };

    maquinaEscribir();
  }, []);

  return (
    <>
      {activar ? (
        <div className="div-sala">
          <iframe
            src="https://www.youtube-nocookie.com/embed/wbp-kT6g8jE?start=12"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      ) : (
        <div className="homepage">
          <img src={img} alt="imagen chatbot" width="auto" height="200px" />
          <div className="texto">
            <h2>{letra}</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Sala;
