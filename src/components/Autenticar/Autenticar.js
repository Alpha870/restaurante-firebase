import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Autenticar.css";
import db from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Img from "../img/Img";

const Autenticar = () => {
  const [valor, setValor] = useState("");
  const [letra, setLetra] = useState("");
  const [activar, setActivar] = useState(false);
  const [aceptar, setAceptar] = useState(false);

  useEffect(() => {
    const texto = Array.from(
      `  Perfecto hagamos una pequeña comprobación. 
      ¿Podrías escribir el ID de tú reserva?
        `
    );

    let index = 0;
    const maquinaEscribir = () => {
      setLetra((prevLetra) => [...prevLetra, texto[index]]);

      index++;
      if (index < texto.length - 1) {
        setTimeout(maquinaEscribir, 80);
      } else {
        clearInterval(maquinaEscribir);
        setActivar(!activar ? true : false && setActivar(true));
      }
    };

    maquinaEscribir();
  }, []);

  const cambioInput = (e) => {
    const value = e.target.value;
    setValor(value);
  };

  const comprobar = async () => {
    const docRef = doc(db, "usuarios", `${valor}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAceptar(true);
      toast.success("Perfecto, tienes reserva!", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      });
    } else {
      setAceptar(false);
      toast.error(
        "Tu id es incorrecto, introduze un id válido o haz tu reserva",
        {
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: false,
        }
      );
    }
  };

  return (
    <div className="pageAutenticar">
      <Img />
      <div className="textoAutenticar">
        <h2>{letra}</h2>
        {activar ? (
          <ButtonToolbar
            className="mb-3"
            aria-label="Toolbar with Button groups"
          >
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Introduce tu id..."
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                name="nombre"
                onChange={cambioInput}
              />
            </InputGroup>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button
                variant="primary"
                type="submit"
                onClick={comprobar}
                id="button-addon2"
              >
                Enviar
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        ) : (
          <></>
        )}
        {aceptar ? (
          <div>
            <Link to={"/sala"}>
              <Button variant="success">Pasar al restaurante</Button>
            </Link>
          </div>
        ) : (
          <>
            <Link to={"/reservas"} />
          </>
        )}
      </div>
    </div>
  );
};

export default Autenticar;
