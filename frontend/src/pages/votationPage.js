import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Styles/votationPage.css";
import Card from "../Components/Card";
import logo from '../assets/CortElecLOGO.png';

function VotationPage() {
  const [listas, setListas] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState("todos");
  const [integrantesPorLista, setIntegrantesPorLista] = useState({});
  const [listasSeleccionadas, setListasSeleccionadas] = useState([]);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [forzarBlanco, setForzarBlanco] = useState(false);

  // Modal de éxito
  const [mostrarExito, setMostrarExito] = useState(false);
  const [contador, setContador] = useState(10);
  const navigate = useNavigate();

  // Countdown para redirección
  useEffect(() => {
    if (mostrarExito) {
      setContador(10);
      const interval = setInterval(() => {
        setContador(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mostrarExito, navigate]);

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

  // Cargar listas
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

  const emitirVoto = async (forzarBlanco) => {
    const fecha = new Date();
    const fechaEmitido = fecha.toISOString().split("T")[0];
    const horaEmitido = fecha.toTimeString().split(" ")[0];
    const idCircuito = Number(sessionStorage.getItem("idCircuito"));
    const esObservado = sessionStorage.getItem("esObservado") === "true"; 

    try {
      // 1. Crear voto
      const votoRes = await fetch("http://localhost:4000/voto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha_emitido: fechaEmitido, hora_emitido: horaEmitido, idCircuito }),
      });

      const voto = await votoRes.json();
      const idVoto = voto.insertId;

      if (forzarBlanco || listasSeleccionadas.length === 0) {
        await fetch("http://localhost:4000/voto/blanco", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idVoto }),
        });
      } else if (listasSeleccionadas.length === 1) {
        const endpoint = esObservado
          ? "http://localhost:4000/voto/observado"
          : "http://localhost:4000/voto/valido";

        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idVoto,
            numero_unicoLista: listasSeleccionadas[0],
          }),
        });


        alert(`✅ Voto ${esObservado ? "observado" : "válido"} registrado por la lista ${listasSeleccionadas[0]}`);
      } else {
        await fetch("http://localhost:4000/voto/anulado", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idVoto }),
        });
      }

      setMostrarExito(true);

      // para cmarcar el ya voto en true
      const token = sessionStorage.getItem("token");
      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const { serie, numero } = decoded;
        console.log("Payload del token:", decoded);

        await fetch("http://localhost:4000/voto/marcarYavoto", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serie, numero }),
        });
      }
      setListasSeleccionadas([]);
    } catch (err) {
      console.error("Error al emitir el voto:", err);
      alert("❌ Error al emitir el voto.");
    }
  };

  const solicitarConfirmacion = (blanco) => {
    setForzarBlanco(blanco);
    setMostrarConfirmacion(true);
  };

  const confirmarVoto = () => {
    emitirVoto(forzarBlanco);
    setMostrarConfirmacion(false);
  };

  const cancelarVoto = () => {
    setMostrarConfirmacion(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: 'auto' }} />
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p>ELECCIONES 2025</p>
          <p>¿A QUIÉN VAS A VOTAR?</p>
        </div>
      </header>

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
          onClick={() => solicitarConfirmacion(false)}
        >
          VOTAR
        </button>

        <button
          style={{
            marginLeft: "8px",
            padding: "8px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onClick={() => solicitarConfirmacion(true)}
        >
          VOTO BLANCO
        </button>
      </div>

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

      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmación de voto</h3>
            <p>¿Está seguro que desea confirmar su voto?</p>
            <div style={{ marginTop: "20px" }}>
              <button
                className="confirm-button"
                style={{ marginRight: "10px", padding: "8px 16px" }}
                onClick={confirmarVoto}
              >
                CONFIRMAR
              </button>
              <button
                className="cancel-button"
                style={{ padding: "8px 16px" }}
                onClick={cancelarVoto}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarExito && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ fontSize: "48px", color: "#28a745" }}>✅</div>
            <h3>Voto exitoso</h3>
            <p>Su voto se registró correctamente.</p>
            <p>Será redirigido en <strong>{contador}</strong> segundos...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VotationPage;
