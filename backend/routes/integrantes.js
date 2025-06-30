const express = require('express');
const router = express.Router();
const pool = require('../database'); // conexión a MySQL


// GET /integrantes → devuelve los integrantes con nombre, apellido, rol y número de lista
router.get('/integrantes', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          rlc.idLista,
          l.numero_unico AS numberlist,
          per.nombre,
          per.apellido,
          r.descripcion AS rol
        FROM Rol_Lista_Candidato rlc
        JOIN Lista l ON l.numero_unico = rlc.idLista
        JOIN Candidato c ON c.CI = rlc.idCandidato
        JOIN Persona per ON per.CI = c.CI
        JOIN Rol r ON r.id = rlc.idRol
        ORDER BY rlc.idLista, rlc.numero_orden
      `);
  
      // Agrupar integrantes por lista
      const listasMap = new Map();
  
      for (const row of rows) {
        if (!listasMap.has(row.numberlist)) {
          listasMap.set(row.numberlist, []);
        }
        listasMap.get(row.numberlist).push({
          nombre: row.nombre,
          apellido: row.apellido,
          rol: row.rol
        });
      }
  
      res.json(Object.fromEntries(listasMap));
    } catch (error) {
      console.error('Error al obtener integrantes:', error);
      console.log(error.sqlMessage);
      res.status(500).json({ error: 'Error al obtener integrantes' });
    }
  });

  
module.exports = router;