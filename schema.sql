-- Ejecuta esto conectado a PostgreSQL (por ejemplo con psql o pgAdmin)

-- 1. Crear la base de datos
CREATE DATABASE likeme;

-- 2. Conéctate a la base de datos "likeme" y luego crea la tabla:
CREATE TABLE posts (
  id SERIAL,
  titulo VARCHAR(25),
  img VARCHAR(1000),
  descripcion VARCHAR(255),
  likes INT
);
