# Like Me - Servidor (Desafío Parte I)

Servidor Express + PostgreSQL (paquete `pg`) para la app "Like Me".
Ya fue probado y funciona (CORS, GET /posts, POST /posts).

## 1. Requisitos previos

- Node.js instalado
- PostgreSQL instalado y corriendo en tu computador

## 2. Crear la base de datos

Con tu cliente de PostgreSQL favorito (psql, pgAdmin, DBeaver, etc.),
ejecuta el contenido de `schema.sql`:

```sql
CREATE DATABASE likeme;

CREATE TABLE posts (
  id SERIAL,
  titulo VARCHAR(25),
  img VARCHAR(1000),
  descripcion VARCHAR(255),
  likes INT
);
```

## 3. Configurar las credenciales

Copia `.env.example` como `.env` y reemplaza con TUS datos de PostgreSQL:

```
cp .env.example .env
```

```
PGUSER=postgres
PGPASSWORD=tu_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=likeme
```

## 4. Instalar dependencias

```
npm install
```

(`node_modules` no viene incluido en la entrega, por eso hay que instalar).

## 5. Levantar el servidor

```
npm start
```

o, si quieres que se reinicie solo cada vez que cambias código:

```
npm run dev
```

Deberías ver:

```
Servidor Like Me escuchando en http://localhost:3000
```

## 6. Probarlo

Sin el frontend, puedes probar con curl:

```bash
# Ver posts
curl http://localhost:3000/posts

# Crear un post
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Jack Sparrow","img":"https://ejemplo.com/foto.jpg","descripcion":"Sigue tu propia brujula"}'
```

O conecta la app React de apoyo ("Apoyo Desafío - Like Me") que ya está
programada para hablar con `http://localhost:3000`. Solo asegúrate de
correr este servidor primero y luego la app de React.

## Estructura del proyecto

- `index.js` -> servidor Express, rutas GET y POST, CORS (requisitos 1, 3 y 4)
- `db.js` -> conexión a PostgreSQL con el paquete `pg` (requisito 2)
- `schema.sql` -> SQL para crear la base de datos y la tabla
- `.env.example` -> plantilla de variables de entorno (copiar a `.env`)

## Errores comunes

- **"ECONNREFUSED" al hacer GET/POST**: PostgreSQL no está corriendo, o
  los datos del `.env` (usuario/password/puerto) no coinciden con tu
  instalación local.
- **CORS error en la consola del navegador**: revisa que `app.use(cors())`
  esté antes de las rutas en `index.js`, y que el servidor esté
  efectivamente corriendo en el puerto 3000.
- **"relation posts does not exist"**: te faltó correr el `CREATE TABLE`
  de `schema.sql` en la base de datos `likeme`.
