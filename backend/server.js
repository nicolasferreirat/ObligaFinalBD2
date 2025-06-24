// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración del pool de conexiones a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,       // usuario de la BD
  host: process.env.DB_HOST,       // host de la BD (nombre del servicio Docker)
  database: process.env.DB_NAME,   // nombre de la BD
  password: process.env.DB_PASS,   // contraseña
  port: process.env.DB_PORT,       // puerto (normalmente 5432)
});

app.use(cors());
app.use(express.json());

// Ruta de prueba para ver si backend y BD funcionan
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // consulta sencilla
    res.json({ serverTime: result.rows[0].now });
  } catch (error) {
    console.error('Error conectando a BD:', error);
    res.status(500).json({ error: 'Error conectando a la base de datos' });
  }
});

// Aquí deberías importar y usar tus rutas (por ejemplo usuarios)
const personaRoutes = require('./routes/persona');
app.use('/', personaRoutes);

app.use('/',require('./routes/listas')); 

app.use('/',require('./routes/partidos')); 

app.use('/',require('./routes/integrantes')); 


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
