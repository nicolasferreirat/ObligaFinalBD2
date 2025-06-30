const express = require('express');
const router = express.Router();
const pool = require('../database');
const jwt = require('jsonwebtoken');
const verificarToken = require('../middleware/auth');

// POST /admin/login
router.post('/admin/login', async (req, res) => {
  const { ci } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM Presidente_Mesa WHERE CI = ?',
      [ci]
    );

    if (rows.length > 0) {
      const token = jwt.sign({ ci }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.json({ ok: true, token });  //Mandamos el token al frontend
    } else {
      res.status(401).json({ ok: false, mensaje: 'Cédula no autorizada' });
    }
  } catch (error) {
    console.error('Error en login de presidente:', error);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// GET /admin/elecciones protegida con JWT 
//Usamos esta ruta para traer las credenciales asignadas al circuito del presidente y los nombres de las personas
router.get('/credencialesAsignadasCircuito/:idCircuito', verificarToken, async (req, res) => {
  const { idCircuito } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT cc.serie, cc.numero, p.nombre, p.apellido
       FROM Credencial_Civica cc
       JOIN Persona p ON cc.CI = p.CI
       WHERE cc.idCircuito = ?`,
      [idCircuito]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener credenciales:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// GET /admin/inicio protegida con JWT
router.get('/admin/inicio', verificarToken, async (req, res) => {
  const { ci } = req.user;

  try {
    const [rows] = await pool.query(
      `SELECT
        M.numero_mesa,
        M.idCircuito,
        E.nombre AS nombreEstablecimiento,
        D.nombre AS nombreDepartamento,
        P.nombre,
        P.apellido
      FROM Mesa M
      JOIN Circuito C ON M.idCircuito = C.id
      JOIN Establecimiento E ON C.idEstablecimiento = E.id
      JOIN Zona Z ON E.idZona = Z.id
      JOIN Departamento D ON Z.idDepartamento = D.id
      JOIN Persona P ON M.CIPresidente = P.CI
      WHERE M.CIPresidente = ?`,
      [ci]
    );


    if (rows.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'No se encontró la mesa del presidente' });
    }

    res.json({
      ok: true,
      usuario: ci,
      nombre: rows[0].nombre,
      apellido: rows[0].apellido,
      numeroMesa: rows[0].numero_mesa,
      idCircuito: rows[0].idCircuito,
      establecimiento: rows[0].nombreEstablecimiento,
      departamento: rows[0].nombreDepartamento
    });
  } catch (error) {
    console.error('Error al obtener datos del presidente:', error);
    res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
  }
});


module.exports = router;
