import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VotanteLoginPage.css';
import logo from '../../../assets/CortElecLOGO.png';
import Modal from './Modal'; // Importamos el nuevo componente Modal

function VotanteLoginPage() {
  const [serie, setSerie] = useState('');
  const [numero, setNumero] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const res = await fetch('http://localhost:4000/votante/login', { //Debe ser igual a la ruta del backend que hace el endpoint de POST
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ serie, numero })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.mensaje);
        localStorage.setItem('token', data.token);
        navigate('/votacionPage');
      } else {
        setError(data.mensaje);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-wrapper">
      <header className="login-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Elecciones Presidenciales 2024</h1>
          <span className="info-icon" onClick={openModal} title="Información">ℹ️</span>
        </div>
      </header>

      <Modal isOpen={modalVisible} onClose={closeModal}>
        <h2>Información</h2>
        <p>Te encuentras a punto de votar en un nuevo acto electoral de Uruguay.</p>
      </Modal>

      <div className="login-box">
        <h2>Usuario votante:</h2>
        <p className="subtitulo">Ingrese su Credencial para Ingresar:</p>

        <form onSubmit={handleSubmit}>
          <label>Serie:</label>
          <input type="text" value={serie} onChange={(e) => setSerie(e.target.value)} />
          <label>Número:</label>
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
          <button type="submit">Ingresar</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default VotanteLoginPage;
