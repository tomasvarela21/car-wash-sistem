import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api' // Asegúrate de que el puerto es el correcto
});

export default api;
