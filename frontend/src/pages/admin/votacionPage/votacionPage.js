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
    const token = localStorage.getItem('token');
    const idCircuito = localStorage.getItem('idCircuito');

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

  const confirmarCierre = () => {
    alert('La votación ha sido finalizada.');
    setMostrarModal(false);
    navigate('/admin/resultados');
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
        <ul className="lista-personas">
          {credenciales.map((c, i) => (
            <li key={i}>
              Serie: {c.serie} / Número: {c.numero}
            </li>
          ))}
        </ul>
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