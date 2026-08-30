// db.js
// Aquí configuramos la conexión a PostgreSQL usando el paquete "pg".
// Esto cumple el Requerimiento 2: "Usar el paquete pg para conectarse
// e interactuar con la base de datos".

require("dotenv").config();
const { Pool } = require("pg");

// Un Pool administra varias conexiones a la BD y las reutiliza,
// en vez de abrir/cerrar una conexión por cada consulta.
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = pool;
