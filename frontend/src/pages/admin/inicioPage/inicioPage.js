import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './inicioPage.css';
import logo from '../../../assets/CortElecLOGO.png';

function InicioPage() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosPresidente, setDatosPresidente] = useState({
    ci: '',
    numeroMesa: '',
    idCircuito: '',
    establecimiento: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:4000/admin/inicio', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          localStorage.removeItem('token');
          navigate('/admin/login');
          return;
        }

        const data = await res.json();

        setDatosPresidente({
          ci: data.usuario,
          numeroMesa: data.numeroMesa,
          idCircuito: data.idCircuito,
          establecimiento: data.establecimiento
        });

        // Guardamos los datos en localstorage para usarlos en VotacionPage
        localStorage.setItem('ci', data.usuario);
        localStorage.setItem('numeroMesa', data.numeroMesa);
        localStorage.setItem('idCircuito', data.idCircuito);

      } catch (err) {
        console.error('Error al verificar token:', err);
        localStorage.removeItem('token');
        navigate('/admin/login'); 
      }
    };

    verificarToken();
  }, [navigate]);

  const confirmarHabilitacion = () => { 
    alert("Mesa habilitada con éxito");
    setMostrarModal(false);
    navigate('/admin/elecciones');  
  };

  const salir = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ci');
    localStorage.removeItem('numeroMesa');
    localStorage.removeItem('idCircuito');
    navigate('/admin/login');
  };

  return (
    <div className="habilitar-wrapper">
      <header className="inicio-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Elecciones Presidenciales 2024</h2>
          <button className="salir-btn" onClick={salir}>Salir</button>
        </div>
      </header>


      <h2 className="subtitulo">Bienvenido presidente CI: {datosPresidente.ci}</h2>

      <h3 className="mesa-info">
        Mesa N°{datosPresidente.numeroMesa} ~ Circuito N°{datosPresidente.idCircuito}
      </h3>

      <h3 className="mesa-info">
        Establecimiento: {datosPresidente.establecimiento}
      </h3>

      <h3 className="bienvenida">
        Haga Click en el botón "Habilitar Mesa" para comenzar la votación en el Circuito.
      </h3>


      <button className="boton-habilitar" onClick={() => setMostrarModal(true)}>
        Habilitar Mesa
      </button>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Seguro que desea habilitar la mesa?</p>
            <button className="confirmar" onClick={confirmarHabilitacion}>Confirmar</button>
            <button className="cancelar" onClick={() => setMostrarModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InicioPage;
