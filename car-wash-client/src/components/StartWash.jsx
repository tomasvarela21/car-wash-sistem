import React, { useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const StartWash = () => {
  const [ownerId, setOwnerId] = useState('');
  const [vehicleId, setVehicleId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/start-wash', { ownerId, vehicleId });
      alert(`Lavado comenzado a las ${response.data.startTime}. Terminará aproximadamente a las ${response.data.estimatedEndTime}`);
    } catch (error) {
      alert('Error al iniciar el lavado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} placeholder="ID del Dueño" required />
      <input type="text" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} placeholder="ID del Vehículo" required />
      <button type="submit">Comenzar Lavado</button>
    </form>
  );
};

export default StartWash;
