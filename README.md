# 🎫 Ticket System API

Una API robusta y escalable construida con **Node.js** y **Express** para la gestión de tickets de soporte. Este sistema permite el manejo de usuarios, autenticación segura, creación de tickets con prioridades y estados, además de funcionalidades avanzadas como paginación y filtrado dinámico.

---

## 🚀 Tecnologías Utilizadas

El proyecto utiliza un stack moderno de desarrollo backend:

- **Entorno de ejecución:** [Node.js](https://nodejs.org/) (ES Modules)
- **Framework Web:** [Express.js](https://expressjs.com/)
- **Base de Datos:** [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/)
- **Seguridad:**
  - `jsonwebtoken` (JWT) para autenticación.
  - `bcrypt` para el hashing de contraseñas.
  - `helmet` para cabeceras de seguridad HTTP.
  - `express-rate-limit` para prevenir ataques de fuerza bruta.
  - `cors` para el manejo de recursos de origen cruzado.
- **Validación de Datos:** Joi
- **Testing:** Jest y Supertest
- **Logging & Debugging:** `morgan` y `winston`
- **Optimización:** `compression` para comprimir respuestas HTTP.

---

## 📦 Estructura del Proyecto

```text
ticket-system/
├── middlewares/          # Middlewares personalizados (Auth, Admin, Errores, etc.)
├── model/                # Modelos de datos de Mongoose (User, Ticket)
├── routes/               # Definición de rutas de la API
├── scripts/              # Scripts de utilidad (ej. poblar la base de datos)
├── validations/          # Esquemas de validación con Joi
├── .env.example          # Plantilla de variables de entorno
├── app.js                # Configuración principal de la aplicación Express
├── server.js             # Punto de entrada del servidor
└── package.json          # Dependencias y scripts del proyecto
```

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd ticket-system
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`:

```bash
cp .env.example .env
```

Luego, edita el archivo `.env` y completa los valores necesarios:

- `PORT`: Puerto donde correrá el servidor (ej. 4000).
- `JWT_SECRET`: Una clave secreta segura para los tokens.
- `DB_URL`: Tu cadena de conexión a MongoDB.

### 4. Ejecutar el proyecto

**Modo Desarrollo (con auto-reload):**

```bash
npm run dev
```

**Modo Producción:**

```bash
npm start
```

**Poblar la base de datos (opcional):**

```bash
npm run db:populate
```

---

## 🧪 Testing

Para ejecutar la suite de pruebas con Jest:

```bash
npm test
```

---

## 🛣️ Endpoints Principales

- **Usuarios (`/api/users`):** Registro, Login y gestión de perfiles.
- **Tickets (`/api/tickets`):**
  - `GET /`: Listado paginado con filtros (Requiere Auth).
  - `POST /`: Creación de nuevos tickets.
  - `PUT /:id`: Actualización de tickets existentes.
  - `DELETE /:id`: Eliminación de tickets (Solo Administradores).

---

Developed by Gaston Mori
