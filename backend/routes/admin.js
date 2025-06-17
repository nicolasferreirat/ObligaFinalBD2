const express = require('express');
const router = express.Router();
const pool = require('../database');

// POST /admin/login
router.post('/admin/login', async (req, res) => {
  const { ci } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM Presidente_Mesa WHERE CI = ?',
      [ci]
    );

    if (rows.length > 0) {
      res.json({ ok: true, mensaje: 'Acceso permitido', ci });
    } else {
      res.status(401).json({ ok: false, mensaje: 'Cédula no autorizada' });
    }
  } catch (error) {
    console.error('Error en login de presidente:', error);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

module.exports = router;
