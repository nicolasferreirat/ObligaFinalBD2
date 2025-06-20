const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET /usuarios → lista todas las personas
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Persona');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener personas:', error);
    res.status(500).send('Error al obtener personas');
  }
});

module.exports = router;
