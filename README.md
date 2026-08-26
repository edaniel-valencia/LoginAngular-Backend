<p align="center">
  <img src="./logo.png" alt="Login Angular - Backend" width="480">
</p>

<h1 align="center">Login Backend (Node 24 + Express + Prisma)</h1>

<p align="center">
  API REST para autenticación y gestión de categorías, productos y roles.<br/>
  Backend del proyecto <strong>login-angular</strong>.
</p>

<p align="center">
  <a href="https://github.com/edaniel-valencia/login-frontend-with-angular">
    <img src="https://img.shields.io/badge/Descargar-Frontend%20Angular-1976D2?style=for-the-badge&logo=angular&logoColor=white" alt="Descargar Frontend Angular">
  </a>
</p>

---

## Tabla de contenidos

- [Stack](#stack)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Base de datos (Prisma)](#base-de-datos-prisma)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
- [Autenticación](#autenticación)
- [Tests](#tests)
- [Despliegue en producción](#despliegue-en-producción)
- [Proyecto relacionado](#proyecto-relacionado)

## Stack

| Capa            | Tecnología                                    |
|-----------------|------------------------------------------------|
| Runtime         | Node.js **24+**                                 |
| Lenguaje        | TypeScript 5.9                                  |
| Framework HTTP  | Express 4                                       |
| ORM             | Prisma 7 (`@prisma/adapter-mariadb` sobre MySQL) |
| Auth            | JWT (`jsonwebtoken`) + `bcrypt`                 |
| Gestor de paquetes | pnpm 11 (con `onlyBuiltDependencies` para limitar scripts de instalación) |
| Tests           | `node:test` nativo (sin dependencias extra)     |

## Requisitos

- Node.js **>= 24.0.0**
- pnpm **>= 10** (recomendado instalarlo vía [Corepack](https://pnpm.io/installation#using-corepack): `corepack enable`)
- Un servidor MySQL o MariaDB accesible

## Instalación

```bash
git clone https://github.com/edaniel-valencia/login-backend-with-angular.git
cd login-backend-with-angular
pnpm install
```

Al instalar, `pnpm` pedirá aprobar los build scripts de `bcrypt`, `prisma` y `@prisma/engines` (son los únicos necesarios: `bcrypt` compila un binding nativo y `prisma` descarga sus binarios de motor). El resto de las dependencias no ejecutan scripts de instalación, para minimizar superficie de ataque ante paquetes comprometidos.

```bash
pnpm approve-builds --all
```

Copiá el archivo de variables de entorno de ejemplo y completá tus datos:

```bash
cp .env.example .env
```

Corré la migración inicial contra tu base de datos:

```bash
pnpm exec prisma migrate dev
```

(Opcional) Sembrá un usuario de prueba:

```bash
pnpm run seed
```

## Variables de entorno

| Variable       | Descripción                                                             | Ejemplo                                              |
|----------------|--------------------------------------------------------------------------|-------------------------------------------------------|
| `PORT`         | Puerto donde escucha el servidor                                         | `3001`                                                 |
| `NODE_ENV`     | Entorno de ejecución                                                     | `development` \| `production`                          |
| `SECRET_KEY`   | Secreto para firmar y verificar los JWT. **Generá uno propio.**          | `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` |
| `DATABASE_URL` | Cadena de conexión de Prisma a MySQL/MariaDB                             | `mysql://usuario:password@host:3306/nombre_bd`         |

> ⚠️ `.env` está en `.gitignore` y nunca debe commitearse. Usá `.env.example` como plantilla.

## Scripts disponibles

| Script              | Descripción                                                        |
|---------------------|----------------------------------------------------------------------|
| `pnpm run dev`       | Levanta el servidor en modo desarrollo (recompila y reinicia con `nodemon` al detectar cambios en `src/` o `prisma/`) |
| `pnpm run build`     | Compila TypeScript a `dist/`                                        |
| `pnpm run start`     | Corre el build ya compilado (`node dist/index.js`) — pensado para producción |
| `pnpm run seed`      | Ejecuta `prisma/seed.ts`, crea un usuario de prueba                 |
| `pnpm test`          | Corre la suite de tests (`node:test`)                                |

## Base de datos (Prisma)

El schema vive en [`prisma/schema.prisma`](./prisma/schema.prisma) y define 5 modelos: `Category`, `Product`, `Role`, `User` y `UserHasRoles`.

Comandos útiles:

```bash
pnpm exec prisma migrate dev --name <nombre>   # crear y aplicar una migración
pnpm exec prisma studio                        # explorar la base de datos con UI
pnpm exec prisma generate                      # regenerar el cliente (se corre solo en postinstall)
```

La conexión se arma en [`src/database/connection.ts`](./src/database/connection.ts) usando el adapter `@prisma/adapter-mariadb`, que es el driver oficial de Prisma 7 para MySQL/MariaDB, apuntando a `DATABASE_URL`.

## Estructura del proyecto

```
src/
├── controllers/   # Lógica de cada recurso (category, product, role, user)
├── routes/        # Definición de endpoints Express + middleware de auth
├── models/        # Server.ts (bootstrap de Express)
└── database/      # Cliente de Prisma
prisma/
├── schema.prisma  # Modelos y datasource
├── migrations/    # Historial de migraciones SQL
└── seed.ts        # Datos de prueba
```

## Endpoints de la API

Base path: `http://localhost:<PORT>`

### Usuarios (`/api/user`)

| Método | Ruta                  | Descripción                          | Auth |
|--------|------------------------|----------------------------------------|:----:|
| GET    | `/api/user/read`       | Lista todos los usuarios               | No   |
| POST   | `/api/user/register`   | Registra un usuario nuevo              | No   |
| POST   | `/api/user/create`     | Alias de `register`                    | No   |
| POST   | `/api/user/login`      | Login, devuelve un JWT                 | No   |

### Categorías (`/api/category`)

| Método | Ruta                          | Descripción             |
|--------|--------------------------------|--------------------------|
| GET    | `/api/category/read`           | Lista todas las categorías |
| GET    | `/api/category/read/:Cid`      | Obtiene una categoría por ID |
| POST   | `/api/category/create`         | Crea una categoría        |
| PATCH  | `/api/category/update/:Cid`    | Actualiza una categoría   |
| DELETE | `/api/category/delete/:Cid`    | Elimina una categoría     |

### Productos (`/api/product`)

| Método | Ruta                         | Descripción                    | Auth |
|--------|-------------------------------|----------------------------------|:----:|
| GET    | `/api/product/read`           | Lista todos los productos        | **Sí** (Bearer token) |
| GET    | `/api/product/read/:Pid`      | Obtiene un producto por ID       | No   |
| POST   | `/api/product/create`         | Crea un producto                 | No   |
| PATCH  | `/api/product/update/:Pid`    | Actualiza un producto            | No   |
| DELETE | `/api/product/delete/:Pid`    | Elimina un producto              | No   |

### Roles (`/api/role`)

| Método | Ruta                      | Descripción          |
|--------|----------------------------|------------------------|
| GET    | `/api/role/read`           | Lista todos los roles  |
| GET    | `/api/role/read/:Rid`      | Obtiene un rol por ID  |
| POST   | `/api/role/create`         | Crea un rol            |
| PATCH  | `/api/role/update/:Rid`    | Actualiza un rol       |
| DELETE | `/api/role/delete/:Rid`    | Elimina un rol         |

## Autenticación

1. `POST /api/user/login` con `{ "Uemail": "...", "Upassword": "..." }` devuelve `{ "token": "<jwt>" }`.
2. Para los endpoints protegidos, mandá el token en el header:
   ```
   Authorization: Bearer <token>
   ```

## Tests

```bash
pnpm test
```

Corre tests unitarios (con el test runner nativo de Node, sin dependencias extra) sobre el middleware de autenticación y el flujo de hashing/firma de tokens. No requieren una base de datos levantada.

## Despliegue en producción

1. **Variables de entorno**: configurá `PORT`, `NODE_ENV=production`, `SECRET_KEY` (un valor fuerte y distinto al de desarrollo) y `DATABASE_URL` apuntando a la base de producción, como variables de entorno del hosting — no subas un `.env` real al servidor por control de versiones.

2. **Instalar dependencias y compilar**:
   ```bash
   pnpm install --prod=false   # necesita devDependencies (typescript, prisma) para el build
   pnpm exec prisma migrate deploy
   pnpm run build
   ```

3. **Arrancar el servidor**:
   ```bash
   pnpm run start
   ```
   En producción usá un gestor de procesos (PM2, systemd, o el propio orquestador del hosting) para reiniciar el proceso ante caídas, en vez de `nodemon`.

4. **Migraciones**: usá siempre `prisma migrate deploy` (no `migrate dev`) en producción — aplica las migraciones existentes sin generar nuevas ni pedir confirmación interactiva.

5. **CORS**: el server tiene `cors()` habilitado sin restricciones. Si el frontend se sirve desde un dominio conocido, restringilo en [`src/models/server.ts`](./src/models/server.ts) antes de desplegar.

## Proyecto relacionado

Frontend en Angular que consume esta API: **[login-frontend-with-angular](https://github.com/edaniel-valencia/login-frontend-with-angular)**
