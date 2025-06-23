import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/SelectPartyPage.module.css';

const SelectPartyPage = () => {
  const [partidos, setPartidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/partidos')
      .then(res => setPartidos(res.data))
      .catch(err => console.error('Error cargando partidos', err));
  }, []);

  const handleSeleccion = (partidoId) => {
    navigate(`/votation?partido=${partidoId}`);
  };

  return (
    <div className={styles.selectPartyContainer}>
      <h2 className={styles.title}>ZONA: CUARTO SECRETO</h2>
      <p className={styles.subtitle}>Seleccione el partido al que desea votar:</p>
      <div className={styles.partyGrid}>
        {partidos.map(p => (
          <button
            key={p.id}
            onClick={() => handleSeleccion(p.id)}
            className={styles.partyButton}
          >
            {p.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectPartyPage;
