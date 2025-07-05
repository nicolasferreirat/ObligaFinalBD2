import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/CortElecLOGO.png';
import './resultadosPartidoPage.css'; 

function ResultadosPartidoPage() {
  const navigate = useNavigate();
  const idCircuito = sessionStorage.getItem('idCircuito');

  const [resultados, setResultados] = useState([]);
  const [anulados, setAnulados] = useState(0);
  const [enBlanco, setEnBlanco] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resPartidos, resOtros] = await Promise.all([
          fetch(`http://localhost:4000/resultados/partidos/${idCircuito}`),
          fetch(`http://localhost:4000/resultados/diferentes/${idCircuito}`)
        ]);

        const partidosData = await resPartidos.json();
        const otrosData = await resOtros.json();

        setResultados(partidosData);
        setEnBlanco(otrosData.cantidad_en_blanco);
        setAnulados(otrosData.cantidad_anulados);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener resultados por partido:', error);
        setCargando(false);
      }
    };

    fetchData();
  }, [idCircuito]);

  if (!idCircuito) return <p>Error: No se encontró el circuito en sessionStorage.</p>;
  if (cargando) return <p>Cargando resultados...</p>;

  // Armamos las filas
  const filasBase = resultados.map((r) => ({
    partido: r.partido,
    votos: Number(r.votos)
  }));

  // Agregamos en blanco y anulado
  filasBase.push(
    { partido: 'En Blanco', votos: Number(enBlanco) },
    { partido: 'Anulado', votos: Number(anulados) }
  );

  // Total para calcular % sobre válidos+observados+otros
  const totalVotos = filasBase.reduce((sum, fila) => sum + fila.votos, 0);

  const filasConPorcentaje = filasBase.map(fila => ({
    ...fila,
    porcentaje: totalVotos > 0 ? `${((fila.votos / totalVotos) * 100).toFixed(0)}%` : '0%'
  }));

  return (
    <div className="habilitar-wrapper">
      <header className="inicio-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Elecciones Presidenciales</h2>
          <button className="volver-btn" onClick={() => navigate('/admin/resultados')}>Volver</button>
        </div>
      </header>

      <h2 className="subtitulo">Resultados Finales por Partido - Circuito {idCircuito}</h2>

      <table className="resultados-tabla">
        <thead>
          <tr>
            <th>Partido</th>
            <th>Votos</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {filasConPorcentaje.map((fila, index) => (
            <tr key={index}>
              <td>{fila.partido}</td>
              <td>{fila.votos}</td>
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

export default ResultadosPartidoPage;
