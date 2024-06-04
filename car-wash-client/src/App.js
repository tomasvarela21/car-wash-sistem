import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';
import OwnerForm from './components/OwnerForm';
import VehicleForm from './components/VehicleForm';
import OwnerList from './components/OwnerList';
import StartWash from './components/StartWash';
import FinishWash from './components/FinishWash';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';  // Si tienes estilos adicionales



function App() {
  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Lavadero de Autos</Navbar.Brand>
      </Navbar>
      <Tabs defaultActiveKey="addOwner" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="addOwner" title="Agregar Dueño">
          <OwnerForm />
        </Tab>
        <Tab eventKey="addVehicle" title="Agregar Vehículo">
          <VehicleForm />
        </Tab>
        <Tab eventKey="viewOwners" title="Ver Dueños y Vehículos">
          <OwnerList />
        </Tab>
        <Tab eventKey="startWash" title="Comenzar Lavado">
          <StartWash />
        </Tab>
        <Tab eventKey="finishWash" title="Finalizar Lavado">
          <FinishWash />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
