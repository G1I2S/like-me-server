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

// ------------------------------------------------------------------
// Requerimiento 1 (Parte II): Ruta PUT para sumar un like a un post.
// El cliente la llama cada vez que el usuario hace click en el corazón.
// ------------------------------------------------------------------
app.put("/posts/:id/like", async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      `UPDATE posts
       SET likes = likes + 1
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al dar like al post" });
  }
});

// ------------------------------------------------------------------
// Requerimiento 2 (Parte II): Ruta DELETE para eliminar un post.
// El cliente la llama al hacer click en la "X" de un post.
// ------------------------------------------------------------------
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json({ mensaje: "Post eliminado", post: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Like Me escuchando en http://localhost:${PORT}`);
});
