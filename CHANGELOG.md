# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.0.0] - Línea Base

### 🚀 Características Nuevas (Features)

#### 🔐 Autenticación
- **Backend:** Implementación de endpoint `/login` con validación de credenciales.
- **Frontend:** Página de inicio de sesión con diseño premium.
- **Seguridad:** Contexto de autenticación (`AuthContext`) para manejo de sesiones y protección de rutas.

#### 🍽 Menú Digital
- **Backend:** CRUD completo para productos y categorías endpoint `/api/menu`.
- **Frontend:** Visualización de carta digital con filtros por categoría.
- **Gestión:** Funcionalidad para agregar nuevos platos y cambiar disponibilidad (Stock).

#### 📝 Gestión de Pedidos
- **Backend:** Endpoints para creación y seguimiento de órdenes `/api/orders`.
- **Frontend (POS):** Interfaz táctil para meseros/clientes para armar pedidos.
- **Frontend (Cocina):** Tablero Kanban en tiempo real para gestión de estados (Pendiente -> Preparando -> Listo -> Servido).

#### 📅 Reservas
- **Backend:** Sistema de gestión de citas `/api/reservations` con validación de horarios.
- **Frontend:** Formulario de solicitud de reservas y listado de agenda diaria.

#### 📈 Reportes y Caja
- **Backend:** Endpoint de análisis de ventas diarias `/api/reports/daily`.
- **Frontend:** Dashboard administrativo con KPIs (Ventas totales, Ticket promedio) y Top Productos.

### 🏗 Infraestructura
- Inicialización de Monorepo (Frontend + Backend).
- Configuración de TypeScript en ambos entornos.
- Configuración de Vite para Frontend y Nodemon para Backend.
- Establecimiento de estructura de ramas: `main` (estable), `test` (QA), `dev` (desarrollo).
