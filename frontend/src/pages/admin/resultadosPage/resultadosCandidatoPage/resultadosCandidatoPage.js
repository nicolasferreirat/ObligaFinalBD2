import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/CortElecLOGO.png';
import './resultadosCandidatoPage.css';

function ResultadosCandidatoPage() {
  const navigate = useNavigate();
  const idCircuito = sessionStorage.getItem('idCircuito');

  const [resultados, setResultados] = useState([]);
  const [enBlanco, setEnBlanco] = useState(0);
  const [anulados, setAnulados] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCandidatos, resOtros] = await Promise.all([
          fetch(`http://localhost:4000/resultados/candidatos/${idCircuito}`),
          fetch(`http://localhost:4000/resultados/diferentes/${idCircuito}`)
        ]);

        const candidatosData = await resCandidatos.json();
        const otrosData = await resOtros.json();

        setResultados(candidatosData.resultados);
        setEnBlanco(otrosData.cantidad_en_blanco);
        setAnulados(otrosData.cantidad_anulados);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener resultados:', error);
        setCargando(false);
      }
    };

    fetchData();
  }, [idCircuito]);

  if (cargando) return <p>Cargando resultados...</p>;

  const filas = resultados.map((r) => ({
    partido: r.nombre_partido,
    candidato: r.nombre_candidato,
    cantidad: Number(r.cantidad_votos)
  }));

  filas.push(
    { partido: 'En blanco', candidato: 'En blanco', cantidad: Number(enBlanco) },
    { partido: 'Anulado', candidato: 'Anulado', cantidad: Number(anulados) }
  );

  const totalVotos = filas.reduce((sum, fila) => sum + fila.cantidad, 0);

  const filasConPorcentaje = filas.map((fila) => ({
    ...fila,
    porcentaje: totalVotos > 0 ? `${((fila.cantidad / totalVotos) * 100).toFixed(0)}%` : '0%'
  }));

  return (
    <div className="habilitar-wrapper">
      <header className="inicio-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Elecciones Presidenciales 2024</h2>
          <button className="volver-btn" onClick={() => navigate('/admin/resultados')}>Volver</button>
        </div>
      </header>

      <h2 className="subtitulo">Resultados Finales por candidato - Circuito {idCircuito}</h2>

      <table className="resultados-tabla">
        <thead>
          <tr>
            <th>Partido</th>
            <th>Candidato</th>
            <th>Cant Votos</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {filasConPorcentaje.map((fila, index) => (
            <tr key={index}>
              <td>{fila.partido}</td>
              <td>{fila.candidato}</td>
              <td>{fila.cantidad}</td>
              <td>{fila.porcentaje}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="nota">
        <p>Nota: Los resultados incluyen votos válidos, observados, en blanco y anulados.</p>
      </div>
    </div>
  );
}

export default ResultadosCandidatoPage;
