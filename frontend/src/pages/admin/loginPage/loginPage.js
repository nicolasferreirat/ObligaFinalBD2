import React, { useState } from 'react';
import './loginPage.css';
import logo from '../../../assets/CortElecLOGO.png';



function LoginPage() {
  const [ci, setCi] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const res = await fetch('http://localhost:4000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ci })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`Bienvenido presidente CI: ${data.ci}`);
        // Podés guardar en localStorage o redirigir a otra ruta
        localStorage.setItem('ci', data.ci);
        //navigate('/admin/panel');
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
  </div>
</header>


    <div className="login-box">
      <h2>Administrador</h2>
      <p className="subtitulo">Ingrese su cédula para Ingresar:</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="ci">Cédula:</label>
        <input
          id="ci"
          type="text"
          placeholder="Ej: 45678901"
          value={ci}
          onChange={(e) => setCi(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  </div>
);

}

export default LoginPage;
