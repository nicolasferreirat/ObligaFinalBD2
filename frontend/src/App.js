
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/admin/loginPage/loginPage'; 
import InicioPage from './pages/admin/inicioPage/inicioPage';
import VotacionPage from './pages/admin/votacionPage/votacionPage';
import VotacionLoginPage from './pages/Votante/loginPage/VotanteLoginPage'; 
import VotationPage from "./pages/votationPage";
import ResultadosPage from './pages/admin/resultadosPage/resultadosPage';
import ResultadosListaPage from './pages/admin/resultadosPage/resultadosListaPage/resultadosListaPage';
import ResultadosCandidatoPage from './pages/admin/resultadosPage/resultadosCandidatoPage/resultadosCandidatoPage';
import ResultadosPartidoPage from './pages/admin/resultadosPage/resultadosPartidoPage/resultadosPartidoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VotacionLoginPage />} /> -- ruta del login de votante
        <Route path="/" element={<VotationPage />} /> -- ruta del login de votante
        <Route path="/admin/login" element={<LoginPage />} />  -- ruta del login de administrador
        <Route path="/admin/inicio" element={<InicioPage />} /> -- ruta del inicio de administrador
        <Route path="/admin/elecciones/enCurso" element={<VotacionPage />} /> -- ruta de la votación de administrador
        <Route path="/admin/resultados" element={<ResultadosPage />} /> -- ruta de resultados de administrador
        <Route path="/admin/resultadosCircuitos/listas" element={<ResultadosListaPage />} /> -- ruta de resultados de administrador
        <Route path="/admin/resultadosCircuitos/candidatos" element={<ResultadosCandidatoPage />} /> -- ruta de resultados por candidato
        <Route path="/admin/resultadosCircuitos/partidos" element={<ResultadosPartidoPage />} /> -- ruta de resultados por partido politico
      </Routes>
    </Router>
  );
}

export default App;
