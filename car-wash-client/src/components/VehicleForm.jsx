import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
 // Si tienes estilos adicionales


const VehicleForm = ({ ownerId }) => {
  const [vehicle, setVehicle] = useState({
    type: '',
    licensePlate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/owners/${ownerId}/vehicles`, vehicle);
      alert('Vehículo agregado exitosamente');
    } catch (error) {
      alert('Error al agregar vehículo');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Tipo de Vehículo</Form.Label>
        <Form.Control type="text" name="type" value={vehicle.type} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Matrícula</Form.Label>
        <Form.Control type="text" name="licensePlate" value={vehicle.licensePlate} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Agregar Vehículo
      </Button>
    </Form>
  );
};

export default VehicleForm;
