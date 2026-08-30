// index.js
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3000;

// ------------------------------------------------------------------
// Requerimiento 1: Habilitar CORS con el paquete de npm "cors".
// Sin esto, el navegador bloquearía las peticiones que hace la app
// de React (que corre en otro puerto, ej. 5173) hacia este servidor
// (puerto 3000), porque son "orígenes" distintos.
// ------------------------------------------------------------------
app.use(cors());

// Middleware para que Express entienda JSON en el body de las
// peticiones POST (lo que envía el formulario "Agregar post").
app.use(express.json());

// ------------------------------------------------------------------
// Requerimiento 3: Ruta GET para devolver los posts guardados en
// PostgreSQL.
// ------------------------------------------------------------------
app.get("/posts", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM posts ORDER BY id ASC"
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
});

// ------------------------------------------------------------------
// Requerimiento 4: Ruta POST que recibe un nuevo post desde el
// formulario de React y lo guarda en PostgreSQL.
// ------------------------------------------------------------------
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;

    const resultado = await pool.query(
      `INSERT INTO posts (titulo, img, descripcion, likes)
       VALUES ($1, $2, $3, 0)
       RETURNING *`,
      [titulo, img, descripcion]
    );

    // Devolvemos el post recién creado (con su id generado por SERIAL)
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar el post" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Like Me escuchando en http://localhost:${PORT}`);
});
