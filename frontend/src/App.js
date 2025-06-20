import logo from './assets/CortElecLOGO.png';
import './App.css';
import Card from "./Components/Card";


const dummyData = [
  {
    id: 1,
    namecandidate: "Lista Renovación Federal",
    photocandidate: "https://noticias.vtv.com.uy/wp-content/uploads/sites/2/2024/02/image_123650291.jpg",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001"
  },
  {
    id: 2,
    namecandidate: "Partido Progreso Nacional",
    photocandidate: "https://noticias.vtv.com.uy/wp-content/uploads/sites/2/2024/02/image_123650291.jpg",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001"
  },
  {
    id: 3,
    namecandidate: "Frente Ciudadano Unido",
    photocandidate: "https://noticias.vtv.com.uy/wp-content/uploads/sites/2/2024/02/image_123650291.jpg",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001"
  },
  {
    id: 4,
    namecandidate: "Movimiento Popular Auténtico",
    photocandidate: "https://noticias.vtv.com.uy/wp-content/uploads/sites/2/2024/02/image_123650291.jpg",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001"
  },
  {
    id: 5,
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    namecandidate: "Coalición Nacional Verde",
    numberlist: "91001",
    photocandidate: "https://media.elobservador.com.uy/p/efa99068122c75d5ff449eec26ba9ddc/adjuntos/362/imagenes/100/497/0100497151/1200x675/smart/andres-ojeda-pre-candidato-partido-colorado-elecciones-2024.jpg",
  },
  {
    id: 6,
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    namecandidate: "Fuerza Democrática del Pueblo",
    numberlist: "91001",
    photocandidate: "https://media.elobservador.com.uy/p/efa99068122c75d5ff449eec26ba9ddc/adjuntos/362/imagenes/100/497/0100497151/1200x675/smart/andres-ojeda-pre-candidato-partido-colorado-elecciones-2024.jpg",
  },
  {
    id: 7,
    namecandidate: "Partido Justicia Libre",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001",
    photocandidate: "https://media.elobservador.com.uy/p/efa99068122c75d5ff449eec26ba9ddc/adjuntos/362/imagenes/100/497/0100497151/1200x675/smart/andres-ojeda-pre-candidato-partido-colorado-elecciones-2024.jpg",
  },
  {
    id: 8,
    namecandidate: "Unión Patriótica Nacional",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001",
    photocandidate: "https://media.elobservador.com.uy/p/efa99068122c75d5ff449eec26ba9ddc/adjuntos/362/imagenes/100/497/0100497151/1200x675/smart/andres-ojeda-pre-candidato-partido-colorado-elecciones-2024.jpg",
  },
  {
    id: 8,
    namecandidate: "Unión Patriótica Nacional",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001",
    photocandidate: "https://i.ytimg.com/vi/S7ya4lP9nhE/maxresdefault.jpg",
  },
  {
    id: 8,
    namecandidate: "Unión Patriótica Nacional",
    numberlist: "91001",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    photocandidate: "https://i.ytimg.com/vi/S7ya4lP9nhE/maxresdefault.jpg",
  },
  {
    id: 8,
    namecandidate: "Unión Patriótica Nacional",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001",
    photocandidate: "https://i.ytimg.com/vi/S7ya4lP9nhE/maxresdefault.jpg",
  },
  {
    id: 8,
    namecandidate: "Unión Patriótica Nacional",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001",
    photocandidate: "https://i.ytimg.com/vi/S7ya4lP9nhE/maxresdefault.jpg",
  },
  {
    id: 8,
    namecandidate: "Unión Patriótica Nacional",
    integrantes: ["Juan Pérez", "Ana Gómez", "Luis Rodríguez"],
    numberlist: "91001",
    photocandidate: "https://i.ytimg.com/vi/S7ya4lP9nhE/maxresdefault.jpg",
  },
];

function App() {
  const handleVoteClick = (id) => {
    console.log("Votaste por:", id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>ELECCIONES &nbsp; 2025</p>
          <p>¿A QUIÉN VAS A VOTAR?</p>
        </div>
      </header>

      <div className="cards-container">
        {dummyData.map((item) => (
          <Card
            key={item.id}
            integrantes={item.integrantes}
            mode="light"
            photocandidate={item.photocandidate}
            namecandidate={item.namecandidate}
            onClick={() => handleVoteClick(item.id)}
            numberlist={item.numberlist}
          />
        ))}
      </div>
    </div>
  );
}

export default App;