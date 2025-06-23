const express = require('express');
const router = express.Router();
const pool = require('../database');
const jwt = require('jsonwebtoken');
const verificarToken = require('../middleware/auth'); // Middleware que valida el token

// POST /votante/login
// Endpoint para loguearse con serie y número de credencial
router.post('/votante/login', async (req, res) => {
  const { serie, numero } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM Credencial_Civica WHERE serie = ? AND numero = ?',
      [serie, numero]
    );

    if (rows.length > 0) {
      const credencial = rows[0];

      // Crear el token
      const token = jwt.sign(
        { serie: credencial.serie, numero: credencial.numero },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Devolver también el circuito y si ya votó
      res.json({
        ok: true,
        token,
        mensaje: 'Login exitoso',
        idCircuito: credencial.idCircuito,
        yavoto: credencial.yavoto
      });

    } else {
      res.status(401).json({ ok: false, mensaje: 'Credencial no encontrada' });
    }
  } catch (error) {
    console.error('Error en login de votante:', error);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});


// GET /votante/inicio
// Ruta protegida: solo accesible con token válido
router.get('/votante/inicio', verificarToken, (req, res) => {
  const { serie, numero } = req.user;

  res.json({
    ok: true,
    mensaje: 'Acceso autorizado',
    credencial: {
      serie,
      numero
    }
  });
});

module.exports = router;