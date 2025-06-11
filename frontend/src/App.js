import './App.css';
import Login from './pages/login';
import React, { useState } from 'react';

function App() {
  const [ciLogueado, setCiLogueado] = useState(null);

  const handleLoginSuccess = (ci) => {
    setCiLogueado(ci);
  };

  //Si no hay nadie logueado muestra Login
  return (
    <div>
      {!ciLogueado ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <h2>Bienvenido, CI: {ciLogueado}</h2>
      )}
    </div>
  );
}

export default App;