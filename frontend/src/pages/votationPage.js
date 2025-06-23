import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import { useLocation } from 'react-router-dom';

const VotationPage = () => {
  const [listas, setListas] = useState([]);
  const location = useLocation();
  const partidoId = new URLSearchParams(location.search).get('partido');

  useEffect(() => {
    if (partidoId) {
      axios.get(`http://localhost:4000/listas/partido/${partidoId}`)
        .then(res => setListas(res.data))
        .catch(err => console.error('Error cargando listas', err));
    }
  }, [partidoId]);

  return (
    <div className="cards-container">
      {listas.map((lista) => (
        <Card
          key={lista.id}
          photocandidate={lista.photocandidate}
          namecandidate={lista.namepartido}
          numberlist={lista.numberlist}
          integrantes={["Nombre 1", "Nombre 2"]} // 🔧 hardcoded por ahora
        />
      ))}
    </div>
  );
};

export default VotationPage;
