# Like Me

Backend de "Like Me", una red social donde los usuarios publican posts con
título, imagen y descripción, y pueden darles like.

El servidor está construido con Express y PostgreSQL, y expone estas rutas:

- **GET /posts**: devuelve todos los posts guardados.
- **POST /posts**: crea un nuevo post a partir de un título, una URL de
  imagen y una descripción, y lo guarda en la base de datos con 0 likes.
- **PUT /posts/:id/like**: suma un like al post indicado.
- **DELETE /posts/:id**: elimina el post indicado.

Todas las consultas a PostgreSQL están envueltas en try/catch para capturar
y responder con un error controlado si algo falla.

Tiene CORS habilitado para que la aplicación cliente (React) pueda
consumir estas rutas desde otro puerto.

## Cómo correrlo

```bash
npm install
cp .env.example .env   # completa con tus datos de PostgreSQL
npm start
```

El servidor queda disponible en `http://localhost:3000`.
