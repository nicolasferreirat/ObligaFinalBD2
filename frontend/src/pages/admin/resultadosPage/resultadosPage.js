import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/CortElecLOGO.png';
import './resultadosPage.css';

function ResultadosPage() {
  const navigate = useNavigate();

  const salir = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  return (
    <div className="habilitar-wrapper">
      <header className="inicio-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Elecciones Presidenciales 2024: RESULTADOS</h2>
          <button className="salir-btn" onClick={salir}>Salir</button>
        </div>
      </header>

      <h1 className="subtitulo">¡Votación Finalizada!</h1>
      <p className="subtitulocli">Haga Click al tipo de resultado que desea ver:</p>

      <div className="botones-menu">
        <button onClick={() => navigate('/admin/resultadosCircuitos/listas')}>Resultados por Listas</button>
        <button onClick={() => navigate('/admin/resultadosCircuitos/candidatos')}>Resultados por Candidatos</button>
        <button onClick={() => navigate('/admin/resultadosCircuitos/partidos')}>Resultados por Partidos Políticos</button>
        <button onClick={() => navigate('/pagina4')}>Página 4</button>
        <button onClick={() => navigate('/pagina5')}>Página 5</button>
      </div>
    </div>
  );
}

export default ResultadosPage;
