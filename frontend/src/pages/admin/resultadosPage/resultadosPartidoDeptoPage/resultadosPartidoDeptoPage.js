import React, { useEffect, useState } from 'react';
import logo from '../../../../assets/CortElecLOGO.png';
import { useNavigate } from 'react-router-dom';
import './resultadosPartidoDeptoPage.css';

function ResultadosPorDepartamentoPage() {
  const navigate = useNavigate();
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const res = await fetch('http://localhost:4000/departamentos');
        const data = await res.json();
        setDepartamentos(data);
      } catch (err) {
        console.error('Error al obtener departamentos:', err);
      }
    };

    fetchDepartamentos();
  }, []);

  const handleSeleccion = async (e) => {
    const idDepto = e.target.value;
    setDepartamentoSeleccionado(idDepto);
    setCargando(true);

    try {
      const res = await fetch(`http://localhost:4000/resultados/partido/departamento/${idDepto}`);
      const data = await res.json();
      setResultados(data);
    } catch (err) {
      console.error('Error al obtener resultados:', err);
    } finally {
      setCargando(false);
    }
  };

  const totalVotos = resultados.reduce((sum, r) => sum + Number(r.votos), 0);
  const resultadosConPorcentaje = resultados.map((r) => ({
    ...r,
    porcentaje: totalVotos > 0 ? `${((r.votos / totalVotos) * 100).toFixed(0)}%` : '0%'
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

      <h2 className="subtitulo">Resultados por Partido - Departamento</h2>

      <h3 className="selector-titulo">Seleccione un departamento:</h3>
      <select className="selector-departamento" onChange={handleSeleccion} value={departamentoSeleccionado}>

        <option value="">-- Seleccionar --</option>
        {departamentos.map((d) => (
          <option key={d.id} value={d.id}>
            {d.nombre}
          </option>
        ))}
      </select>

      {cargando && <p>Cargando resultados...</p>}

      {!cargando && departamentoSeleccionado && (
        <>
          <h3>Resultados para el Departamento seleccionado</h3>
          <table className="resultados-tabla">
            <thead>
              <tr>
                <th>Partido</th>
                <th>Votos</th>
                <th>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {resultadosConPorcentaje.map((fila, i) => (
                <tr key={i}>
                  <td>{fila.partido}</td>
                  <td>{fila.votos}</td>
                  <td>{fila.porcentaje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ResultadosPorDepartamentoPage;
