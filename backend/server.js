const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Ruta de prueba con MySQL
const pool = require('./database');

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW()');
    res.json({ serverTime: rows[0]['NOW()'] });
  } catch (error) {
    console.error('Error conectando a BD:', error);
    res.status(500).json({ error: 'Error conectando a la base de datos' });
  }
});

// Rutas
app.use('/', require('./routes/persona'));
app.use('/', require('./routes/admin')); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
