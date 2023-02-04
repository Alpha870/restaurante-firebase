import React, { useEffect, useState } from "react";
import Formulario from "../Form/Formulario";
import db from "../../firebase";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./Controlador.css";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function Controlador() {
  const [datos, setDatos] = useState([]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("ID copiado a portapapeles!", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error("Su ID no se a podido copiar!", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      });
    }
  };

  //si tiene id el usuario quiere actualizar y si no esta creando
  const [idActual, setIdActual] = useState("");

  //AÑADE EL REGISTRO A DB O MODIFICA---------------------------
  const addOrEditar = async (reserva, id) => {
    if (idActual === "") {
      //añade
      await addDoc(collection(db, "usuarios"), reserva);

      toast.success("Su reserva se a realizado!", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      });
    } else {
      //modifica
      await updateDoc(doc(db, "usuarios", `${id}`), reserva);
      toast.info("Su reserva se a modificado!", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      });
      setIdActual("");
    }
  };

  //ACTUALIZA LOS CAMBIOS EN DB--------------------------
  const actualizarDatos = () => {
    const q = query(collection(db, "usuarios"));
    //funcion que lee cambios en db
    onSnapshot(q, (querySnapshot) => {
      //docs[] tiene que estar dentro del la funcion
      //para que setDatos lea siempre los cambios de onSnapshot
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setDatos(docs);
    });
  };

  useEffect(() => {
    actualizarDatos();
  }, []);

  //ELIMINA DATOS EN DB---------------------------
  const eliminarDatos = async (id) => {
    if (window.confirm("Estas seguro que quieres eliminar la reserva?")) {
      await deleteDoc(doc(db, "usuarios", `${id}`));

      toast.error("Su reserva se a eliminado!", {
        position: "top-center",
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="container-control">
      <Formulario {...{ addOrEditar, idActual, datos }} />
      {datos.length > 0 ? (
        datos.map((doc) => (
          <div key={doc.id} >
            <Card className="tarjeta">
              <Card.Header>Mi reserva</Card.Header>
              <Card.Body>
                <Card.Title>ID:{doc.id}</Card.Title>
                <Card.Text>
                  <h6>Nombre: {doc.nombre}</h6>
                  <h6>Telefono: {doc.telefono}</h6>
                  <h6>Fecha: {doc.fecha}</h6>
                  <h6>Hora: {doc.hora}</h6>
                </Card.Text>
                <Button
                  className="me-3"
                  variant="warning"
                  onClick={() => setIdActual(doc.id)}
                >
                  Editar
                </Button>

                <Button variant="danger" onClick={() => eliminarDatos(doc.id)}>
                  Eliminar
                </Button>
              </Card.Body>

              <Card.Footer className="text-muted">
                <Link to={"/autenticar"}>
                  <Button
                    variant="success"
                    onClick={() => copyToClipboard(doc.id)}
                  >
                    Ir al restaurante
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </div>
        ))
      ) : (
        <Card>
          <Card.Header>Haz tu reserva</Card.Header>
          <Card.Body>
          </Card.Body>
          <Card.Footer></Card.Footer>

        </Card>
      )}
    </div>
  );
}

export default Controlador;
