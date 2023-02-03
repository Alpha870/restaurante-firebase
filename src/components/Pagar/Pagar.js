import React, { useEffect, useState } from "react";
import img from "../img/chatbot-kiu.gif";
import { Link } from "react-router-dom";

const Pagar = () => {
  const [letra, setLetra] = useState("");
  const [activar, setActivar] = useState(false);

  useEffect(() => {
    // Convertir el texto a un array de letras
    const texto = Array.from(
      `  Espero que le haya gustado nuestro menú,
        nuestros cheff siempre le ponen mucho cariño y esfuerzo.
        Un momento dejeme que calcule su factura...                      
        Tu factura asciende a 48$.
        Con que quiere pagar en efectivo o tarjeta?
          `
    );
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

    maquinaEscribir();
  }, []);

  return (
    <>
      <div className="homepage">
        <img src={img} alt="imagen chatbot" width="auto" height="200px" />
        <div className="texto">
          <h2>{letra}</h2>
        </div>
        {activar ? (
          <div className="botones">
            <Link to={'/salir'}>
              <button type="button" className="btn btn-light">
                Pagar en efectivo y salir
              </button>
            </Link>
            <Link to={'/salir'}>
              <button type="button" className="btn btn-info">
                Pagar con tarjeta y salir
              </button>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Pagar;
