const express = require('express');
const router = express.Router();
const pool = require('../database'); // tu conexión a MySQL

// 1. Crear un voto (siempre se registra acá primero)
router.post('/voto', async (req, res) => {
  const { fecha_emitido, hora_emitido, idCircuito } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO Voto (fecha_emitido, hora_emitido, idCircuito) VALUES (?, ?, ?)`,
      [fecha_emitido, hora_emitido, idCircuito]
    );

    res.status(201).json({ insertId: result.insertId });
  } catch (error) {
    console.error('Error al registrar voto:', error);
    res.status(500).json({ error: 'Error al registrar voto' });
  }
});

// 2. Registrar voto válido
router.post('/voto/valido', async (req, res) => {
  const { idVoto, numero_unicoLista } = req.body;

  try {
    await pool.query(
      `INSERT INTO Es_Valido (idVoto, numero_unicoLista) VALUES (?, ?)`,
      [idVoto, numero_unicoLista]
    );

    res.status(201).json({ message: 'Voto válido registrado' });
  } catch (error) {
    console.error('Error al registrar voto válido:', error);
    res.status(500).json({ error: 'Error al registrar voto válido' });
  }
});

// 3. Registrar voto anulado
router.post('/voto/anulado', async (req, res) => {
  const { idVoto } = req.body;

  try {
    await pool.query(
      `INSERT INTO Es_Anulado (idVoto) VALUES (?)`,
      [idVoto]
    );

    res.status(201).json({ message: 'Voto anulado registrado' });
  } catch (error) {
    console.error('Error al registrar voto anulado:', error);
    res.status(500).json({ error: 'Error al registrar voto anulado' });
  }
});

// 4. Registrar voto en blanco
router.post('/voto/blanco', async (req, res) => {
  const { idVoto } = req.body;

  try {
    await pool.query(
      `INSERT INTO En_Blanco (idVoto) VALUES (?)`,
      [idVoto]
    );

    res.status(201).json({ message: 'Voto en blanco registrado' });
  } catch (error) {
    console.error('Error al registrar voto en blanco:', error);
    res.status(500).json({ error: 'Error al registrar voto en blanco' });
  }
});

// 5. Registrar voto observado
router.post('/voto/observado', async (req, res) => {
  const { idVoto, numero_unicoLista } = req.body;

  try {
    await pool.query(
      `INSERT INTO Es_Observado (idVoto, numero_unicoLista) VALUES (?, ?)`,
      [idVoto, numero_unicoLista]
    );

    res.status(201).json({ message: 'Voto observado registrado' });
  } catch (error) {
    console.error('Error al registrar voto observado:', error);
    res.status(500).json({ error: 'Error al registrar voto observado' });
  }
});

router.put('/voto/marcarYavoto', async (req, res) => {
  const { serie, numero } = req.body;

  try {
    await pool.query(
      'UPDATE Credencial_Civica SET yavoto = true WHERE serie = ? AND numero = ?',
      [serie, numero]
    );

    res.json({ ok: true, mensaje: 'Credencial marcada como ya votó' });
  } catch (error) {
    console.error('Error al marcar yavoto:', error);
    res.status(500).json({ ok: false, mensaje: 'Error al marcar como votado' });
  }
});
module.exports = router;
