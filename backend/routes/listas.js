const express = require('express');
const router = express.Router();
const pool = require('../database'); // conexión a MySQL

// GET /listas → devuelve todas las listas con el nombre del partido
router.get('/listas', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        l.numero_unico AS numberlist,
        l.imagen AS photocandidate,
        p.nombre AS namepartido
      FROM Lista l
      JOIN Partido_Politico p ON l.idPartido_Politico = p.id
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener listas:', error);
    res.status(500).json({ error: 'Error al obtener listas' });
  }
});

// GET /listas/partido/:id → devuelve solo las listas de un partido específico
router.get('/listas/partido/:id', async (req, res) => {
    const partidoId = req.params.id;
  
    try {
      const [rows] = await pool.query(`
        SELECT 
          l.numero_unico AS numberlist,
          l.imagen AS photocandidate,
          p.nombre AS namepartido
        FROM Lista l
        JOIN Partido_Politico p ON l.idPartido_Politico = p.id
        WHERE l.idPartido_Politico = ?
      `, [partidoId]);
  
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener listas por partido:', error);
      res.status(500).json({ error: 'Error al obtener listas por partido' });
    }
  });
  

module.exports = router;
