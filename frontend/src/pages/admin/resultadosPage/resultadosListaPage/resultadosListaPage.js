import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/CortElecLOGO.png';
import './resultadosListaPage.css';

function ResultadosListaPage() {
  const navigate = useNavigate();
  const idCircuito = localStorage.getItem('idCircuito');

  const [resultados, setResultados] = useState([]);
  const [anulados, setAnulados] = useState(0);
  const [enBlanco, setEnBlanco] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!idCircuito) {
        console.error('Circuito no definido');
        setCargando(false);
        return;
      }

      try {
        const [res1, res2] = await Promise.all([
          fetch(`http://localhost:4000/resultados/${idCircuito}`),
          fetch(`http://localhost:4000/resultados/diferentes/${idCircuito}`)
        ]);

        if (!res1.ok || !res2.ok) throw new Error('Error al obtener los datos');

        const data1 = await res1.json();
        const data2 = await res2.json();

        setResultados(data1.resultados || data1);
        setAnulados(data2.cantidad_anulados);
        setEnBlanco(data2.cantidad_en_blanco);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener resultados:', error);
        setCargando(false);
      }
    };

    fetchData();
  }, [idCircuito]);

  if (!idCircuito) return <p>Error: No se encontró el circuito en localStorage.</p>;
  if (cargando) return <p>Cargando resultados...</p>;

  const filas = resultados.map((res) => {
  const validos = Number(res.cantidad_validos || 0);
  const observados = Number(res.cantidad_observados || 0);
  const total = validos + observados;

  return {
    lista: `Lista ${res.numero_lista}`,
    partido: res.nombre_partido,
    cantidad: total,
  };
});

filas.push(
  { lista: 'En Blanco', partido: 'En Blanco', cantidad: Number(enBlanco) },
  { lista: 'Anulado', partido: 'Anulado', cantidad: Number(anulados) }
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

      <h2 className="subtitulo">Resultados Finales por Lista- Circuito {idCircuito}</h2>

      <table className="resultados-tabla">
        <thead>
          <tr>
            <th>Lista</th>
            <th>Partido</th>
            <th>Cant. Votos</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {filasConPorcentaje.map((fila, index) => (
            <tr key={index}>
              <td>{fila.lista}</td>
              <td>{fila.partido}</td>
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

export default ResultadosListaPage;
