const express = require('express');
const router = express.Router();
const pool = require('../database'); 
// GET /api/listas
router.get('/', async (req, res) => {
  try {
    const listas = await pool.query(`
      SELECT 
        l.id,
        l.numero_unico AS numberlist,
        l.imagen AS photocandidate,
        p.nombre AS namecandidate
      FROM lista l
      JOIN partido p ON l.idPartido_Politico = p.id
    `);

    const integrantesRaw = await pool.query(`
      SELECT rl.idLista, c.nombre
      FROM rol_lista_candidato rl
      JOIN candidato c ON rl.idCandidato = c.idCandidato
      ORDER BY rl.numero_orden ASC
    `);

    const listasConIntegrantes = listas.rows.map(lista => ({
      ...lista,
      integrantes: integrantesRaw.rows
        .filter(i => i.idlista === lista.id)
        .map(i => i.nombre)
    }));

    res.json(listasConIntegrantes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las listas" });
  }
});

module.exports = router;
