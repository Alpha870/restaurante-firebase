import React, { useEffect, useState } from "react";
import Img from "../img/Img";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Pagar = () => {
  const [letra, setLetra] = useState("");
  const [activar, setActivar] = useState(false);

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
  useEffect(() => {
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
        <Img />
        <div className="texto">
          <h2>{letra}</h2>
        </div>
        {activar ? (
          <div className="botones">
            <Link to={"/salir"}>
              <Button variant="light">Pagar en efectivo y salir</Button>
            </Link>
            <Link to={"/salir"}>
              <Button variant="info">Pagar con tarjeta y salir</Button>
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
