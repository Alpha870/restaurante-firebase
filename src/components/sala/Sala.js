import React, { useEffect, useState } from "react";
import "./Sala.css";
import Img from "../img/Img";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import P1 from "./imgMenu/P1.jpg";
import P2 from "./imgMenu/P2.jpg";
import P3 from "./imgMenu/P3.jpg";

const Sala = () => {
  const [letra, setLetra] = useState("");
  const [activar, setActivar] = useState(false);

  useEffect(() => {
    // Convertir el texto a un array de letras
    const texto = Array.from(
      `  Todo bien? te presento nuestro menú degustación
      espero que lo disfrutes, buen provecho!!!
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
    <section className="contenedor">
      {activar ? (
        <div className="contenedor-carousel">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={P1} alt="First slide" />
              <Carousel.Caption>
                <div className="pie-foto">
                  <h3>Primer plato</h3>
                  <p>Canelones de foie, carne y setas de temporada</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block w-100" src={P2} alt="Second slide" />
              <Carousel.Caption>
                <div className="pie-foto">
                  <h3>Segundo plato</h3>
                  <p>Chuleton de carne madurada 90 dias con guarnición</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block w-100" src={P3} alt="Second slide" />
              <Carousel.Caption>
                <div className="pie-foto">
                  <h3>Postre</h3>
                  <p>Panna-Cotta decorada con fruta silvestre</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <Link className="link" to={'/pagar'}>
            <Button className="mt-3" variant="success">
              Ya terminé, ir a pagar y salir
            </Button>
          </Link>
        </div>
      ) : (
        <div className="homepage">
          <Img />
          <div className="texto">
            <h2>{letra}</h2>
          </div>
        </div>
      )}
    </section>
  );
};

export default Sala;
