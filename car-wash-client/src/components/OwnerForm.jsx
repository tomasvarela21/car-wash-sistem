import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../api';

const OwnerForm = () => {
  const [owner, setOwner] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phoneNumber: '',
    email: '',
    photoUrl: ''
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner({
      ...owner,
      [name]: value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('firstName', owner.firstName);
      formData.append('lastName', owner.lastName);
      formData.append('dni', owner.dni);
      formData.append('phoneNumber', owner.phoneNumber);
      formData.append('email', owner.email);

      await api.post('/owners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Dueño agregado exitosamente');
      // Limpiar el formulario después de enviar
      setOwner({
        firstName: '',
        lastName: '',
        dni: '',
        phoneNumber: '',
        email: '',
        photoUrl: ''
      });
      setPhoto(null);
    } catch (error) {
      alert('Error al agregar dueño');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} onDragOver={handleDragOver} onDrop={handleDrop}>
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="firstName" value={owner.firstName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" name="lastName" value={owner.lastName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>DNI</Form.Label>
        <Form.Control type="text" name="dni" value={owner.dni} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" name="phoneNumber" value={owner.phoneNumber} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={owner.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Foto</Form.Label>
        <Form.Control type="file" name="photo" onChange={handlePhotoChange} />
        {photo && (
          <div style={{ marginTop: '10px' }}>
            <img src={photo} alt="Owner" style={{ maxWidth: '200px' }} />
          </div>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Agregar Dueño
      </Button>
    </Form>
  );
};

export default OwnerForm;
