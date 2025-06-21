import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/admin/loginPage/loginPage'; 
import InicioPage from './pages/admin/inicioPage/inicioPage';
import VotacionPage from './pages/admin/votacionPage/votacionPage';
import VotanteLoginPage from './pages/Votante/loginPage/VotanteLoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/inicio" element={<InicioPage />} />
        <Route path="/admin/elecciones" element={<VotacionPage />} />
        <Route path="/" element={<VotanteLoginPage />} />

      </Routes>
    </Router>
  );
}

export default App;
