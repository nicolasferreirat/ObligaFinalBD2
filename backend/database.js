const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',     // host de la DB
  port: Number(process.env.DB_PORT) || 3306,     // puerto de la DB
  user: process.env.DB_USER || 'root',           // usuario de la DB
  password: process.env.DB_PASSWORD || '',       // contraseña
  database: process.env.DB_NAME || '',            // nombre base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
