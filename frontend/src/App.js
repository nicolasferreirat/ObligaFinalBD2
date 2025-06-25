import { useEffect, useState } from "react";
import './App.css';
import Card from "./Components/Card";
import logo from './assets/CortElecLOGO.png';

function App() {
  const [listas, setListas] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState("todos");
  const [integrantesPorLista, setIntegrantesPorLista] = useState({});
  const [listasSeleccionadas, setListasSeleccionadas] = useState([]);

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

  // Cargar integrantes
  useEffect(() => {
    const fetchIntegrantes = async () => {
      try {
        const res = await fetch('http://localhost:4000/integrantes');
        const data = await res.json();
        setIntegrantesPorLista(data);
      } catch (error) {
        console.error("Error al traer integrantes:", error);
      }
    };

    fetchIntegrantes();
  }, []);

  const handleCardClick = (numeroLista) => {
    setListasSeleccionadas((prev) =>
      prev.includes(numeroLista)
        ? prev.filter((num) => num !== numeroLista)
        : [...prev, numeroLista]
    );
  };

  const emitirVoto = async () => {
    const fecha = new Date();
    const fechaEmitido = fecha.toISOString().split("T")[0];
    const horaEmitido = fecha.toTimeString().split(" ")[0];
    const idCircuito = 1; // hardcodeado

    try {
      // 1. Crear voto
      const votoRes = await fetch("http://localhost:4000/voto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha_emitido: fechaEmitido, hora_emitido: horaEmitido, idCircuito }),
      });

      const voto = await votoRes.json();
      const idVoto = voto.insertId;

      
      if (listasSeleccionadas.length === 0) {
        // En blanco
        await fetch("http://localhost:4000/voto/blanco", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idVoto }),
        });
        alert("Voto en blanco registrado.");
      } else if (listasSeleccionadas.length === 1) {
        // Válido
        await fetch("http://localhost:4000/voto/valido", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idVoto,
            numero_unicoLista: listasSeleccionadas[0],
          }),
        });
        alert(`Voto válido registrado por la lista ${listasSeleccionadas[0]}`);
      } else {
        // Anulado
        await fetch("http://localhost:4000/voto/anulado", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idVoto }),
        });
        alert("Voto anulado por seleccionar más de una lista.");
      }

  
      setListasSeleccionadas([]);
    } catch (err) {
      console.error("Error al emitir el voto:", err);
      alert("Error al emitir el voto.");
    }
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

      {/* Selector + botón votar */}
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

        <button
          style={{ marginLeft: "16px", padding: "8px 20px" }}
          onClick={emitirVoto}
        >
          VOTAR
        </button>
      </div>

      {/* Tarjetas */}
      <div className="cards-container">
        {listas.map((item, index) => (
          <Card
            key={index}
            integrantes={integrantesPorLista[item.numberlist] || []}
            mode="dark"
            photocandidate={item.photocandidate}
            namecandidate={item.namepartido}
            numberlist={item.numberlist}
            isSelected={listasSeleccionadas.includes(item.numberlist)}
            onClick={() => handleCardClick(item.numberlist)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
