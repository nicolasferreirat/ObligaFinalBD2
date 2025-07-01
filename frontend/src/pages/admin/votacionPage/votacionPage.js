import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/CortElecLOGO.png';
import './votacionPage.css';

function VotacionPage() {
  const [credenciales, setCredenciales] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [horaActual, setHoraActual] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const bloquearAtras = (e) => {
      e.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', bloquearAtras);

    return () => {
      window.removeEventListener('popstate', bloquearAtras);
    };
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const idCircuito = sessionStorage.getItem('idCircuito');

    if (!token || !idCircuito) {
      navigate('/admin/login');
      return;
    }

    fetch(`http://localhost:4000/credencialesAsignadasCircuito/${idCircuito}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Error al obtener credenciales');
        return await res.json();
      })
      .then(data => setCredenciales(data))
      .catch(err => {
        console.error('Error al obtener credenciales:', err);
        navigate('/');
      });
  }, [navigate]);

  useEffect(() => {
    const actualizarHora = () => {
      const opciones = { timeZone: 'America/Montevideo', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const hora = new Intl.DateTimeFormat('es-UY', opciones).format(new Date());
      setHoraActual(hora);
    };

    actualizarHora();
    const intervalo = setInterval(actualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const confirmarCierre = async () => {
  const idCircuito = sessionStorage.getItem('idCircuito');

  try {
    const res = await fetch(`http://localhost:4000/cerrarVotacion/${idCircuito}`, {
      method: 'POST'
    });

    if (!res.ok) {
      console.error('Error al cerrar la votación');
      return;
    }

    setMostrarModal(false);
    navigate('/admin/resultados');
  } catch (error) {
    console.error('Error al cerrar votación:', error);
  }
};


  return (
    <div className="votacion-wrapper">
      <header className="login-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Elecciones Presidenciales 2024</h1>
        </div>
      </header>

      <div className="contenedor-hora-titulo">
        <span className="hora">{horaActual}</span>
        <h2 className="titulo-votacion">Personas habilitadas a votar en este Circuito</h2>
      </div>

      {credenciales.length === 0 ? (
        <p>Cargando credenciales...</p>
      ) : (
        <table className="tabla-personas">
          <thead>
            <tr>
              <th>Credencial</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {credenciales.map((c, i) => (
              <tr key={i}>
                <td>{c.serie} {c.numero}</td>
                <td>{c.nombre} {c.apellido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn-terminar" onClick={() => setMostrarModal(true)}>
        Terminar Votación
      </button>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Seguro que desea finalizar la votación?</p>
            <button className="confirmar" onClick={confirmarCierre}>Confirmar</button>
            <button className="cancelar" onClick={() => setMostrarModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VotacionPage;
