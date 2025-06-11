import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [ci, setCi] = useState('');
  const [serie, setSerie] = useState('');
  const [numero, setNumero] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:4000/login', { //Esto me quedó rarísimo
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ci, serie, numero }),
    });

    const data = await response.json();
    if (response.ok) {
      onLoginSuccess(ci);
    } else {
      setError(data.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Ingresar al lugar de votación bicho:</h2>
        <input
          type="text"
          placeholder="Cédula"
          value={ci}
          onChange={(e) => setCi(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Serie de credencial"
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Número de credencial"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Ingresar
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '300px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    marginTop: '10px',
    color: 'red',
    fontSize: '14px',
  },
};

export default Login;
