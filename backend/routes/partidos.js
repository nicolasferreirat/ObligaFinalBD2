const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET /partidos → lista todas las partidos
router.get('/partidos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Partido_Politico');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener partido:', error);
    res.status(500).send('Error al obtener partidos');
  }
});

module.exports = router;
