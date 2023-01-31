import React, { useEffect, useState } from "react";
import Formulario from "./Formulario";
import db from "../firebase";
import { toast } from "react-toastify";
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
      await updateDoc(doc(db, "usuarios", `${id}`), reserva)
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
  }, [addOrEditar]);

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
    <div>
      <Formulario {...{ addOrEditar, idActual, datos }} />
      <div className="col-md-8">
        {datos.length > 0 ? (
          datos.map((doc) => (
            <div key={doc.id} className="card mb-1">
              <div className="card-body">
                <h6>{doc.nombre}</h6>
                <h6>{doc.telefono}</h6>
                <h6>{doc.fecha}</h6>
                <h6>{doc.hora}</h6>
                <button
                  type="button"
                  className="btn btn-warning me-2"
                  onClick={() => setIdActual(doc.id)}
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminarDatos(doc.id)}
                  type="button"
                  className="btn btn-danger ms-2"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card mt-3">
            <h4>Puedes hacer tu reserva</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Controlador;
