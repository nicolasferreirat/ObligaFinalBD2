import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/admin/loginPage/loginPage'; 
import InicioPage from './pages/admin/inicioPage/inicioPage';
import VotacionPage from './pages/admin/votacionPage/votacionPage';
import VotacionLoginPage from './pages/Votante/loginPage/VotanteLoginPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />  -- ruta del login de administrador
        <Route path="/admin/inicio" element={<InicioPage />} /> -- ruta del inicio de administrador
        <Route path="/admin/elecciones" element={<VotacionPage />} /> -- ruta de la votación de administrador
        <Route path="/" element={<VotacionLoginPage />} /> -- ruta del login de votante
      </Routes>
    </Router>
  );
}

export default App;
