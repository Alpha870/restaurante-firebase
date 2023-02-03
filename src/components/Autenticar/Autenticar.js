import React, { useEffect, useState } from "react";
import img from "../img/chatbot-kiu.gif";
import "./Autenticar.css";
import db from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
      <img src={img} alt="imagen-chatbot" width="auto" height="200px" />
      <div className="textoAutenticar">
        <h2>{letra}</h2>
        {activar ? (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Introduce tu id..."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              name="nombre"
              onChange={cambioInput}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              onClick={comprobar}
              id="button-addon2"
            >
              Enviar
            </button>
          </div>
        ) : (
          <></>
        )}
        {aceptar ? (
          <div>
            <Link to={'/sala'}>
              <button type="button" className="btn btn-success">
                Pasar al restaurante
              </button>
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
