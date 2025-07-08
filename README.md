# Proyecto Individual - Backend E-commerce
API RESTful con NestJS, Node.js y PostgreSQL, enfocada en la gestión de productos, órdenes y usuarios para una aplicación e-commerce. El servidor está preparado para integrarse fácilmente con cualquier cliente web.

## Tecnologías utilizadas
- **Lenguaje:** TypeScript
- **Base de datos:** PostgreSQL
- **Documentación:** Swagger
- **Framework:** NestJS
- **Entorno de ejecución:** Node.js
- **ORM:** TypeORM

## Requisitos para ejecutar localmente
- PostgreSQL
- Node.js
- npm

## Instalación
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/JVallejoMorales/Backend-Ecommerce.git
   
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env basado en .env.example
   cp .env.example .env
   ```

   Editar el archivo `.env` con tus configuraciones:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=tu_password
   DB_PASSWORD=tu_password
   DB_NAME=ecommerce
   ```

4. **Configurar la base de datos**
   - Crear una base de datos PostgreSQL llamada `ecommerce`
   - Las tablas se crearán automáticamente al ejecutar la aplicación

## Ejecutar

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

## Endpoints

### Autenticación
- `POST /auth/signup` - Crear nuevo usuario
- `POST /auth/signip` - Iniciar sesión

### Categorías
- `GET /categories/seeder` - Obtener datos harcodeados para pruebas
- `GET /categories` - Obtener todas las categorías

### Carga de archivos
- `POST /files/uploadImage/:productId` - Crear una imagen por id del producto
- `POST /files/uploadImage/:userId` - Crear una imagen de foto de perfil por id del usuario

### Ordenes
- `POST /orders` - Crear una orden
- `GET /orders/:id` - Obtener una orden por id de la orden
- `PUT /orders/:id` - Actualizar una orden por id de la orden
- `DELETE /orders/:id` - Eliminar una orden por id de la orden

### Productos
- `GET /products/seeder` - Obtener datos harcodeados para pruebas
- `GET /products` - Obtener todos los productos
- `POST /products` - Crear producto
- `PUT /products/:id` - Actualizar producto por id del producto
- `PATCH /products/:id/stock` - Actualizar stock del producto por id del producto
- `DELETE /products/:id` - Eliminar producto por id del producto

### Usuarios
- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario por id del usuario
- `PUT /users/:id` - Actualizar usuario por id del usuario
- `DELETE /users/:id` - Eliminar usuario por id del usuario

## Licencia

Este proyecto está bajo la Licencia ISC. 
