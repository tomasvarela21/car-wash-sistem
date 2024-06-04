const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const mongoURI = 'mongodb://localhost:27017/lavadero';
mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((err) => {
  console.error('Error al conectar a MongoDB', err);
});

// Datos de ejemplo (puedes usar una base de datos en lugar de esto)
const owners = [
  {
    _id: '1',
    firstName: 'Juan',
    lastName: 'Perez',
    dni: '12345678',
    phoneNumber: '123456789',
    email: 'juan.perez@example.com',
    vehicles: [
      { _id: '1', type: 'Auto', licensePlate: 'ABC123' }
    ]
  },
  // Agrega más dueños según sea necesario
];

// Ruta para obtener los dueños
app.get('/api/owners', (req, res) => {
  res.json(owners);
});

// Inicia el servidor
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
