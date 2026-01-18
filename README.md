# Sistema Integral de Gestión de Restaurante (SIGR)

## Descripción
Aplicación web para gestionar pedidos, reservas, administración de menús, control de caja y generación de reportes. Este proyecto sirve como línea base para el desarrollo de un sistema de gestión de restaurantes.

## Estructura del Proyecto
El repositorio está organizado como un monorepo:

- `frontend/`: Aplicación React + TypeScript (Vite).
- `backend/`: API REST Node.js + Express + TypeScript.

## Requisitos Previos
- Node.js (v18 o superior recomendado)
- Git

## Instalación y Ejecución

### Backend
1. Navega a la carpeta backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   *El servidor correrá en `http://localhost:4000`*

### Frontend
1. Navega a la carpeta frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta la aplicación:
   ```bash
   npm run dev
   ```
   *La aplicación abrirá en `http://localhost:5173`*

## 📚 Documentación de API

### Autenticación
- **POST** `/api/auth/login`: Inicia sesión.
  - Body: `{ "email": "admin@sigr.com", "password": "admin" }`

### Menú
- **GET** `/api/menu`: Obtiene categorías y productos.
- **POST** `/api/menu`: Crea un nuevo producto.
- **PUT** `/api/menu/:id`: Actualiza un producto (ej. disponibilidad).
- **DELETE** `/api/menu/:id`: Elimina un producto.

### Pedidos (Orders)
- **GET** `/api/orders`: Obtiene la cola de pedidos (Cocina).
- **POST** `/api/orders`: Crea un nuevo pedido (POS).
  - Body: `{ "tableNumber": 1, "items": [...], "total": 50000 }`
- **PATCH** `/api/orders/:id/status`: Cambia el estado del pedido (`pending`, `preparing`, `ready`, `served`, `paid`).

### Reservas
- **GET** `/api/reservations`: Lista todas las reservas.
- **POST** `/api/reservations`: Crea una nueva reserva.
  - Body: `{ "customerName": "Juan", "date": "2026-01-20", "time": "19:00", "people": 2, ... }`

### Reportes
- **GET** `/api/reports/daily`: Obtiene resumen de ventas y productos top del día.

## 👥 Roles de Usuario (Demo)
- **Admin**: `admin@sigr.com` / `admin`
- **Mesero**: `waiter@sigr.com` / `waiter`
- **Cliente**: `client@sigr.com` / `client`

## Licencia
MIT
