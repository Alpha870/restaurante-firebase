import React, { useEffect, useState } from "react";
import Formulario from "./Formulario";
import db from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

function Controlador() {
  const [datos, setDatos] = useState([]);

//AÑADE EL REGISTRO A DB---------------------------
  const addOrEditar = async (reserva) => {
    try {
      const docRef = await addDoc(collection(db, "usuarios"), reserva);
      console.log("se a añadido correctamente: ");
    } catch (e) {
      console.error("Hubo un error al añadir: ", e);
    }
  };

//ACTUALIZA LOS CAMBIOS EN DB--------------------------
useEffect(() => {
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
  }, []);

//ELIMINA DATOS EN DB---------------------------
  const eliminarDatos = async (id) => {
    if (window.confirm("Estas seguro que quieres eliminar la reserva?")) {
      await deleteDoc(doc(db, "usuarios", `${id}`));
      console.log("se a eliminado exitosamente");
    }
  };

  console.log(datos);
  return (
    <div>
      <Formulario addOrEditar={addOrEditar} />
      <div className="col-md-8">
        {datos.length > 0 ? (
          datos.map((doc) => (
            <div key={doc.id} className="card mb-1">
              <div className="card-body">
                <h6>{doc.nombre}</h6>
                <h6>{doc.telefono}</h6>
                <h6>{doc.fecha}</h6>
                <h6>{doc.hora}</h6>
                <button type="button" className="btn btn-warning me-2">
                  Editar
                </button>
                <button
                  onClick={() => eliminarDatos(doc.id)}
                  type="button"
                  className="btn btn-danger ms-2">
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
