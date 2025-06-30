import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VotanteLoginPage.css';
import logo from '../../../assets/CortElecLOGO.png';
import Modal from './Modal'; 

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
    // validar credencial y obtener circuito
    const res = await fetch('http://localhost:4000/votante/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serie, numero })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.mensaje || 'Credencial incorrecta');
      return;
    }

    // Chequear si ya votó
    if (data.yavoto === 1) {
      setError('Ya has emitido tu voto.');
      return;
    }

    const idCircuito = data.idCircuito;

    // Consultar si la votación está habilitada
    const estadoRes = await fetch(`http://localhost:4000/estadoVotacion/${idCircuito}`);
    const estadoData = await estadoRes.json();

    if (!estadoData.habilitada) {
      setError('La votación aún no ha sido habilitada para este circuito.');
      return;
    }

    // si esta habilitada la votacion, avanza 
    localStorage.setItem('token', data.token);
    localStorage.setItem('idCircuito', idCircuito);

    navigate('/eleccionesInicio');
    
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
        <p>Bienvenido al sistema de votación electrónica.
        A continuación, podrás emitir tu voto de forma segura y confidencial. Te recordamos que este proceso es único y no puede repetirse.</p>
      </Modal>

      <div className="login-box">
        <h2>Usuario votante:</h2>
        <p className="subtituloing">Ingrese su Credencial para Ingresar</p>

        <form onSubmit={handleSubmit}>
          <label>Serie:</label>
          <input type="text" placeholder="Ej: ABC" value={serie} onChange={(e) => setSerie(e.target.value)} maxLength={3} />
          <label>Número:</label>
          <input type="text" placeholder="Ej: 12345" value={numero} onChange={(e) => setNumero(e.target.value)} maxLength={5} />
          <button type="submit">Ingresar</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default VotanteLoginPage;
