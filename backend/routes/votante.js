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
    const [credenciales] = await pool.query(
      'SELECT * FROM Credencial_Civica WHERE serie = ? AND numero = ?',
      [serie, numero]
    );

    if (credenciales.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Credencial no encontrada' });
    }

    const credencial = credenciales[0];

    // Verificar si la credencial ya voto no lo dejamos   logearse
    if (credencial.yavoto) {
      return res.status(403).json({ ok: false, mensaje: 'Ya has emitido tu voto', yavoto: true });
    }

    const CI = credencial.CI;
    let circuitoAsignado = credencial.idCircuito;
    let esObservado = false;

    // Chequear si es agente policial
    const [agente] = await pool.query(
      'SELECT idEstablecimiento FROM Agente_Policial WHERE CI = ?',
      [CI]
    );

    if (agente.length > 0) {
      const idEstablecimiento = agente[0].idEstablecimiento;

      const [circuitoPolicial] = await pool.query(
        'SELECT id FROM Circuito WHERE idEstablecimiento = ? LIMIT 1',
        [idEstablecimiento]
      );

      if (circuitoPolicial.length > 0) {
        circuitoAsignado = circuitoPolicial[0].id;  //le asignamos el circuito a votar en donde trabaja
        esObservado = true;
      }
    } else {
      // Chequear si es miembro de mesa
      const [circuitoMesa] = await pool.query(`
        SELECT M.id AS idCircuito
        FROM Mesa M
        WHERE M.CIPresidente = ? OR M.CISecretario = ? OR M.CIVocal = ?
        LIMIT 1
      `, [CI, CI, CI]);

      if (circuitoMesa.length > 0) {
        circuitoAsignado = circuitoMesa[0].idCircuito;  //le asignamos el circuito a votar en donde trabaja
        esObservado = true;
      }
    }

    // Generar token
    const token = jwt.sign(
      { serie: credencial.serie, numero: credencial.numero },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      ok: true,
      token,
      mensaje: 'Login exitoso',
      idCircuito: circuitoAsignado,
      yavoto: credencial.yavoto,
      esObservado
    });

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