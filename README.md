# API Backend con Arquitectura Hexagonal

## Descripción
Este proyecto implementa una API RESTful que sigue principios de diseño y arquitectura modernos para asegurar un código limpio, mantenible y escalable. La aplicación permite el registro y autenticación de usuarios con JWT.

## Estructura del Proyecto y Arquitectura

### Arquitectura Hexagonal (Ports and Adapters)
El proyecto está estructurado siguiendo una arquitectura hexagonal rigurosa con una clara separación por capas:

```
src/
├── context/                # Contextos acotados (DDD)
│   └── user/
│       ├── userCreated/    # Contexto para creación de usuarios
│       │   ├── application/
│       │   ├── domain/
│       │   └── infrastructure/
│       └── userLoggedIn/   # Contexto para autenticación de usuarios
│           ├── application/
│           ├── domain/
│           └── infrastructure/
├── service/                # Capa de API/servicio
│   └── user/
│       └── user.route.ts   # Endpoints de usuario
├── utils/                  # Utilidades compartidas
│   ├── database/           # Configuración de base de datos
│   ├── jwt/                # Manejo de JWT
│   └── middleware/         # Middlewares Express
└── index.ts                # Punto de entrada de la aplicación
```

Esta estructura permite:
- **Alta cohesión**: Cada módulo tiene una responsabilidad bien definida
- **Bajo acoplamiento**: Las dependencias fluyen hacia el dominio
- **Testabilidad**: Las interfaces permiten sustituir implementaciones fácilmente

## Implementación de Principios SOLID

### S - Principio de Responsabilidad Única
- Cada clase tiene una única razón para cambiar
- Ejemplos: `UserCreator` (creación), `UserAuthenticator` (autenticación)

### O - Principio Abierto/Cerrado
- Las abstracciones permiten extender sin modificar
- Ejemplo: Interfaces `UserRepository` implementadas por adaptadores concretos

### L - Principio de Sustitución de Liskov
- Las implementaciones respetan el contrato de la interfaz
- Ejemplo: Los repositorios concretos (`CreateUserAuraDBRepository`, `FindUserAuraDBRepository`) implementan fielmente sus interfaces

### I - Principio de Segregación de Interfaces
- Interfaces específicas para cada necesidad
- Ejemplo: Separación de `repository/UserRepository.ts` en cada contexto

### D - Principio de Inversión de Dependencias
- Las dependencias apuntan hacia el dominio
- Ejemplo: Los casos de uso dependen de abstracciones (`UserCreator` depende de `UserRepository`)

## Domain-Driven Design (DDD)

Se han aplicado los siguientes conceptos de DDD:

- **Contextos Acotados**: Separación en `userCreated` y `userLoggedIn`
- **Entidades de Dominio**: Como `User` con comportamiento encapsulado
- **Repositorios**: Como interfaces que abstraen la persistencia
- **Servicios de Aplicación**: Orquestación de casos de uso (`UserCreator`, `UserAuthenticator`)

## TypeORM y Migraciones

- Configuración en `utils/database/dataSource.ts`
- Entidades TypeORM en `utils/database/entity/`
- Adaptadores de repositorio que conectan el dominio con TypeORM
- Configuración para migraciones y sincronización de esquema

## Gestión de Errores

Se implementa un sistema robusto de manejo de errores:
- Middleware global de errores en `utils/middleware/error.ts`
- Generación de IDs únicos para cada error
- Mapeo específico para errores de validación (Zod)
- Respuestas de error consistentes

## Validación con Zod

- Esquemas de validación en rutas (`createUserSchema`, `loginUserSchema`)
- Middleware de validación genérico en `utils/middleware/validate.ts`
- Validación de cuerpo, parámetros y consultas

## Seguridad

### Autenticación con JWT
- Implementación en `utils/jwt/jwt.ts`
- Firmado y verificación de tokens con clave secreta configurable
- Uso en rutas de autenticación

### Protección de Contraseñas
- Hash seguro de contraseñas con bcrypt en `utils/hash.ts`
- Validación segura en el dominio (`User.authenticate()`)

## Middlewares

- **Error Handling**: Captura centralizada de excepciones
- **Validación**: Validación de datos de entrada con Zod
- **CORS**: Configuración para permitir solicitudes cross-origin
- **Body Parser**: Procesamiento de cuerpos JSON

## Endpoints de la API

### Autenticación
- `POST /api/user/signup`: Registro de usuarios
  ```json
  {
    "name": "Usuario",
    "email": "usuario@example.com",
    "password": "contraseña"
  }
  ```

- `POST /api/user/login`: Inicio de sesión
  ```json
  {
    "email": "usuario@example.com",
    "password": "contraseña"
  }
  ```

## Base de datos

- PostgreSQL gestionado con Docker Compose en entorno local
- Scripts de inicialización en `db/init/init.sql`
- Variables de entorno para configuración de conexión
- En local se emplea Docker para tener un entorno controlado y aislado de la base de datos

## Despliegue

- La aplicación y la base de datos están desplegadas en [Railway](https://railway.app/)
- Railway proporciona un entorno gestionado para PostgreSQL y Node.js
- CI/CD automático a través de integración con GitHub
- Variables de entorno configuradas directamente en la plataforma
- Despliegue automático con cada push a la rama principal

## Requisitos

- Node.js v14+
- PostgreSQL
- Docker y Docker Compose (recomendado)

## Instalación y Ejecución 🚀

1. 📥 Clonar el repositorio
2. 📦 Instalar dependencias:
   ```
   npm install
   ```
3. ⚙️ Configurar variables de entorno:
   ```
   cp .env.example .env
   ```
4. 🐳 Iniciar la base de datos:
   ```
   cd db && docker-compose up -d
   ```
5. 🔥 Iniciar el servidor en modo desarrollo:
   ```
   npm run dev
   ```

## Scripts Disponibles 📜

- 🛠️ `npm run dev`: Inicia el servidor en modo desarrollo con hot reload
- 📦 `npm run build`: Compila el proyecto TypeScript
- 🚀 `npm run start`: Inicia el servidor desde la versión compilada

## Ventajas de esta Implementación ✨

- 🧹 **Mantenibilidad**: Código limpio y bien estructurado
- 🧪 **Testabilidad**: Dependencias claramente definidas e inyectadas
- 📈 **Escalabilidad**: Fácil añadir nuevos contextos o funcionalidades
- 🔄 **Independencia tecnológica**: Las tecnologías pueden ser reemplazadas sin afectar el núcleo
