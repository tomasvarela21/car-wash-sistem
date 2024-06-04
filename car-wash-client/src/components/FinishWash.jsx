import React, { useState } from 'react';
import api from '../api.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const FinishWash = () => {
  const [ownerId, setOwnerId] = useState('');
  const [vehicleId, setVehicleId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/finish-wash', { ownerId, vehicleId });
      alert(`Lavado terminado a las ${response.data.endTime}. El monto a pagar es ${response.data.price} pesos.`);
    } catch (error) {
      alert('Error al finalizar el lavado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} placeholder="ID del Dueño" required />
      <input type="text" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} placeholder="ID del Vehículo" required />
      <button type="submit">Finalizar Lavado</button>
    </form>
  );
};

export default FinishWash;
