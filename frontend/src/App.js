
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
import ResultadosPartidoDeptoPage from './pages/admin/resultadosPage/resultadosPartidoDeptoPage/resultadosPartidoDeptoPage';
import ResultadosCandidatoDepartamentoPage from './pages/admin/resultadosPage/resultadosCandidatoDeptoPage/resultadosCandidatoDeptoPage';

function App() {
  return (
    <Router>
      <Routes>
        --Rutas del votante
        <Route path="/" element={<VotacionLoginPage />} /> -- ruta del login de votante
        <Route path="/eleccionesInicio" element={<VotationPage />} /> -- ruta del inicio de elecciones
    

        --Rutas del administrador
        <Route path="/admin/login" element={<LoginPage />} />  -- ruta del login de administrador
        <Route path="/admin/inicio" element={<InicioPage />} /> -- ruta del inicio de administrador
        <Route path="/admin/elecciones/enCurso" element={<VotacionPage />} /> -- ruta de la votación de administrador
        <Route path="/admin/resultados" element={<ResultadosPage />} /> -- ruta de resultados de administrador
        <Route path="/admin/resultadosCircuitos/listas" element={<ResultadosListaPage />} /> -- ruta de resultados de administrador
        <Route path="/admin/resultadosCircuitos/candidatos" element={<ResultadosCandidatoPage />} /> -- ruta de resultados por candidato
        <Route path="/admin/resultadosCircuitos/partidos" element={<ResultadosPartidoPage />} /> -- ruta de resultados por partido politico
        <Route path="/admin/resultadosPartidos/departamentos" element={<ResultadosPartidoDeptoPage />} /> -- ruta de resultados por partido politico por departamento
        <Route path="/admin/resultadosCandidatos/departamentos" element={<ResultadosCandidatoDepartamentoPage />} /> -- ruta de resultados por candidato por departamento
      </Routes>
    </Router>
  );
}

export default App;
