// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar la conexión con la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const pool = require('./database');
    const result = await pool.query('SELECT NOW()');
    res.json({ serverTime: result.rows[0].now });
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    res.status(500).json({ error: 'Error conectando a la base de datos' });
  }
});

// Ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente');
});

// Importar y usar las rutas de usuarios
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
