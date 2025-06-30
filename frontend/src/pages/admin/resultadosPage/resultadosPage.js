import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/CortElecLOGO.png';
import './resultadosPage.css';

function ResultadosPage() {
  const navigate = useNavigate();
  const [ganador, setGanador] = useState(null);

  const salir = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  useEffect(() => {
  const fetchGanador = async () => {
    try {
      const res = await fetch('http://localhost:4000/resultados/ganador');
      const data = await res.json();
      setGanador(data);
    } catch (error) {
      console.error('Error al obtener el ganador:', error);
    }
  };

  fetchGanador();
}, []);


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

      {ganador && ganador.nombre && (
        <div className="ganador-box">
          <h3>Ganador:</h3>
          <div className="ganador-info">
            <div><strong>Candidato:</strong> <span className="destacado1">{ganador.nombre} {ganador.apellido}</span></div>
            <div><strong>Partido:</strong> <span className="destacado2">{ganador.partido}</span></div>
            <div><strong>Votos Totales:</strong> <span className="destacado2">{ganador.votos}</span></div>
          </div>
        </div>
      )}


      <p className="subtitulocli">Resultados Finales del Circuito:</p>

      <div className="botones-menu">
          <button onClick={() => navigate('/admin/resultadosCircuitos/listas')}>por Listas</button>
          <button onClick={() => navigate('/admin/resultadosCircuitos/candidatos')}>Por Candidatos</button>
          <button onClick={() => navigate('/admin/resultadosCircuitos/partidos')}>Por Partidos Políticos</button>
          <p className="subtitulocli">Resultados Finales por Departamentos:</p>
          <button onClick={() => navigate('/admin/resultadosPartidos/departamentos')}>Por Partidos</button>
          <button onClick={() => navigate('/admin/resultadosCandidatos/departamentos')}>Por Candidatos</button>
          <p>-</p>
        </div>
      </div>
  );
}

export default ResultadosPage;
