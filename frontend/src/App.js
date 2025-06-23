import { useEffect, useState } from "react";
import './App.css';
import Card from "./Components/Card";
import logo from './assets/CortElecLOGO.png';

function App() {
  const [listas, setListas] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState("todos");

  // Cargar partidos políticos
  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const res = await fetch('http://localhost:4000/partidos');
        const data = await res.json();
        setPartidos(data);
      } catch (error) {
        console.error("Error al traer partidos:", error);
      }
    };

    fetchPartidos();
  }, []);

  // Cargar listas (todas o por partido)
  useEffect(() => {
    const fetchListas = async () => {
      try {
        const url = partidoSeleccionado === "todos"
          ? 'http://localhost:4000/listas'
          : `http://localhost:4000/listas/partido/${partidoSeleccionado}`;
        
        const response = await fetch(url);
        const data = await response.json();
        setListas(data);
      } catch (error) {
        console.error("Error al traer las listas:", error);
      }
    };

    fetchListas();
  }, [partidoSeleccionado]);

  const handleVoteClick = (id) => {
    console.log("Votaste por:", id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: 'auto' }} />
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p>ELECCIONES 2025</p>
          <p>¿A QUIÉN VAS A VOTAR?</p>
        </div>
      </header>

     
      {/* Selector fuera y separado visualmente */}
      <div className="selector-container">
        <label htmlFor="partido-select">Filtrar por partido:</label>
        <select
          id="partido-select"
          onChange={(e) => setPartidoSeleccionado(e.target.value)}
        >
          <option value="todos">Todos</option>
          {partidos.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>

      <div className="cards-container">
        {listas.map((item, index) => (
          <Card
            key={index}
            integrantes={["Juan Pérez", "Ana Gómez", "Luis Rodríguez"]} // Hardcodeado por ahora
            mode="dark"
            photocandidate={item.photocandidate}
            namecandidate={item.namepartido}
            numberlist={item.numberlist}
            onClick={() => handleVoteClick(item.numberlist)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
