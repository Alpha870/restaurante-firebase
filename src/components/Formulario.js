import React, { useState, useEffect } from "react";
import db from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Formulario(props) {
  const estadoInicial = {
    nombre: "",
    telefono: "",
    fecha: "",
    hora: "",
  };
  const [valor, setValor] = useState(estadoInicial);

  const cambioInput = (e) => {
    const { name, value } = e.target;
    setValor({ ...valor, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    props.addOrEditar(valor, props.idActual);
    setValor({ ...estadoInicial });
  };

  const obtenerPorId = async (id) => {
    const docRef = doc(db, "usuarios", `${id}`);
    const docSnap = await getDoc(docRef);
    setValor({ ...docSnap.data() });
  };

  useEffect(() => {
    if (props.idActual === "") {
      //si no tiene id el usuario no quiere actualizar
      setValor({ ...estadoInicial });
    } else {
      //si tiene id el usuario quiere actualizar
      obtenerPorId(props.idActual);
    }
  }, [props.idActual]);

  return (
    <form className="card card-body" onSubmit={clickSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Introduce tu nombre"
          name="nombre"
          onChange={cambioInput}
          value={valor.nombre}
        />
        <input
          type="tel"
          className="form-control"
          placeholder="Introduce tu telefono"
          name="telefono"
          onChange={cambioInput}
          value={valor.telefono}
        />

        <input
          type="date"
          className="form-control"
          placeholder="Reserva tu fecha"
          name="fecha"
          onChange={cambioInput}
          value={valor.fecha}
        />

        <input
          type="time"
          className="form-control"
          name="hora"
          onChange={cambioInput}
          value={valor.hora}
        />

        <button type="submit" className="btn btn-primary mt-3">
          {props.idActual === "" ? "Reservar" : "Modifcar Reserva"}
        </button>
      </div>
    </form>
  );
}

export default Formulario;
