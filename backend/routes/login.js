// backend/routes/login.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/', async (req, res) => {
  const { ci, serie, numero } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM Credencial_Civica WHERE CI = ? AND serie = ? AND numero = ?',
      [ci, serie, numero]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login exitoso' });
    } else {
      res.status(401).json({ success: false, message: 'CI o credencial inválidos' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

module.exports = router;
