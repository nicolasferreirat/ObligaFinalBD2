import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './inicioPage.css';
import logo from '../../../assets/CortElecLOGO.png';

function InicioPage() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosPresidente, setDatosPresidente] = useState({
    ci: '',
    nombre: '',
    apellido: '',
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
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          localStorage.removeItem('token');
          navigate('/admin/login');
          return;
        }

        const data = await res.json();
        setDatosPresidente({
          ci: data.usuario,
          nombre: data.nombre,
          apellido: data.apellido,
          numeroMesa: data.numeroMesa,
          idCircuito: data.idCircuito,
          establecimiento: data.establecimiento,
          departamento: data.departamento
        });

        // Guardamos datos en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('ci', data.usuario);
        localStorage.setItem('establecimiento', data.establecimiento);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('apellido', data.apellido);
        localStorage.setItem('numeroMesa', data.numeroMesa);
        localStorage.setItem('idCircuito', data.idCircuito);
        localStorage.setItem('departamento', data.departamento);

      } catch (err) {
        console.error('Error al verificar token:', err);
        localStorage.clear();
        navigate('/admin/login'); 
      }
    };

    verificarToken();
  }, [navigate]);

  const confirmarHabilitacion = async () => {
  const idCircuito = datosPresidente.idCircuito;

  try {
    const res = await fetch(`http://localhost:4000/habilitarVotacion/${idCircuito}`, {
      method: 'POST'
    });

    if (!res.ok) {
      console.error('Error al habilitar votación');
      return;
    }

    setMostrarModal(false);
    navigate('/admin/elecciones/enCurso');
    
  } catch (err) {
    console.error('Error al habilitar votación:', err);
  }
};

  const salir = () => {
    localStorage.clear();
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

      <h2>Bienvenido/a presidente {datosPresidente.nombre} {datosPresidente.apellido}</h2>

      <div className="info-box">
        <p><strong>Mesa N°</strong> {datosPresidente.numeroMesa}</p>
        <p><strong>Circuito N°</strong> {datosPresidente.idCircuito}</p>
        <p><strong>Establecimiento:</strong> {datosPresidente.establecimiento}</p>
        <p><strong>Departamento:</strong> {datosPresidente.departamento}</p>
      </div>

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
