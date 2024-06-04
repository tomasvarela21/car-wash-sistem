import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const OwnerList = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await api.get('/owners');
        setOwners(response.data);
      } catch (error) {
        alert('Error al obtener la lista de dueños');
      }
    };

    fetchOwners();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Vehículos</th>
        </tr>
      </thead>
      <tbody>
        {owners.map(owner => (
          <tr key={owner._id}>
            <td>{owner.firstName}</td>
            <td>{owner.lastName}</td>
            <td>{owner.dni}</td>
            <td>{owner.phoneNumber}</td>
            <td>{owner.email}</td>
            <td>
              <ul>
                {owner.vehicles.map(vehicle => (
                  <li key={vehicle._id}>
                    {vehicle.type} - {vehicle.licensePlate} <Button variant="primary" onClick={() => startWash(owner._id, vehicle._id)}>Comenzar Lavado</Button>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const startWash = async (ownerId, vehicleId) => {
  try {
    const response = await api.post('/start-wash', { ownerId, vehicleId });
    alert(`Lavado comenzado a las ${response.data.startTime}. Terminará aproximadamente a las ${response.data.estimatedEndTime}`);
  } catch (error) {
    alert('Error al iniciar el lavado');
  }
};

export default OwnerList;
