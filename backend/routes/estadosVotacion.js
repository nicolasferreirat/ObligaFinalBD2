const express = require('express');
const router = express.Router();
const pool = require('../database'); 

// Habilitar votación en un circuito 
router.post('/habilitarVotacion/:idCircuito', async (req, res) => {
  const { idCircuito } = req.params;
  try {
    await pool.query(
      'UPDATE EstadoVotacion SET habilitada = true WHERE idCircuito = ?',
      [idCircuito]
    );
    res.json({ mensaje: 'Votación habilitada para el circuito ' + idCircuito });
  } catch (error) {
    console.error('Error al habilitar votación:', error);
    res.status(500).json({ error: 'Error al habilitar votación' });
  }
});

// Consultar si está habilitado un circuito
router.get('/estadoVotacion/:idCircuito', async (req, res) => {
  const { idCircuito } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT habilitada FROM EstadoVotacion WHERE idCircuito = ?',
      [idCircuito]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Circuito no encontrado' });
    }
    res.json({ habilitada: rows[0].habilitada });
  } catch (error) {
    console.error('Error al consultar estado de votación:', error);
    res.status(500).json({ error: 'Error al consultar estado de votación' });
  }
});

// Cerrar votación en un circuito
router.post('/cerrarVotacion/:idCircuito', async (req, res) => {
  const { idCircuito } = req.params;
  try {
    await pool.query(
      'UPDATE EstadoVotacion SET habilitada = false WHERE idCircuito = ?',
      [idCircuito]
    );
    res.json({ mensaje: 'Votación cerrada para el circuito ' + idCircuito });
  } catch (error) {
    console.error('Error al cerrar votación:', error);
    res.status(500).json({ error: 'Error al cerrar votación' });
  }
});

module.exports = router;
