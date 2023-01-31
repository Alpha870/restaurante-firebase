import React, { useState } from "react";

function Formulario({ addOrEditar }) {
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
    addOrEditar(valor);
    setValor({ ...estadoInicial });
  };

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
          Reservar
        </button>
      </div>
    </form>
  );
}

export default Formulario;
