import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import db from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Form.css";

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
    <Card>
      <Card.Header>Formulario de reserva</Card.Header>
      <Form  className="form" onSubmit={clickSubmit}>
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            placeholder="Introduce tu nombre"
            name="nombre"
            onChange={cambioInput}
            value={valor.nombre}
            required
          />
          <Form.Control
            type="tel"
            placeholder="Introduce tu telefono"
            name="telefono"
            onChange={cambioInput}
            value={valor.telefono}
            required
          />
          <Form.Control
            type="date"
            className="form-control"
            placeholder="Reserva tu fecha"
            name="fecha"
            onChange={cambioInput}
            value={valor.fecha}
            required
          />
          <Form.Control
            type="time"
            className="form-control"
            name="hora"
            onChange={cambioInput}
            value={valor.hora}
            required
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          {props.idActual === "" ? "Reservar" : "Modificar Reserva"}
        </Button>
      </Form>
    </Card>
  );
}

export default Formulario;
