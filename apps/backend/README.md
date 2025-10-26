# Cash App Backend

A robust backend API server built with Node.js, TypeScript, and Express.js following Clean Architecture principles.

## Overview

This backend service provides a scalable, maintainable API foundation for the Cash App monorepo. It demonstrates proper architectural separation with clear boundaries between business logic, data access, and presentation layers.

## Features

- Clean Architecture with clear layer separation
- TypeScript for type safety
- Express.js for HTTP server
- In-memory database for development
- Request validation with Zod
- Comprehensive error handling
- Structured logging with Winston
- Security middleware (Helmet, CORS, Rate Limiting)
- Hot reload for development
- ESLint and Prettier for code quality
- Interactive API documentation with Swagger/OpenAPI 3.0

## Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

From the monorepo root:

```bash
npm install
```

### Development

Start the development server with hot reload:

```bash
# From monorepo root
npm run dev:backend

# Or from apps/backend directory
npm run dev
```

The server will start at `http://localhost:4000`

### Build

Compile TypeScript to JavaScript:

```bash
# From monorepo root
npm run build:backend

# Or from apps/backend directory
npm run build
```

### Production

Run the compiled server:

```bash
# From monorepo root
npm run start:backend

# Or from apps/backend directory
npm start
```

## Architecture

This project follows **Clean Architecture** principles with four distinct layers:

### Layer Structure

```
src/
├── domain/          # Business entities and rules (innermost)
├── application/     # Use cases and business logic
├── infrastructure/  # External dependencies (database, config)
└── presentation/    # HTTP controllers, routes, middleware
```

### Dependency Rule

Dependencies flow inward:
- **Presentation** depends on **Application**
- **Infrastructure** depends on **Application** and **Domain**
- **Application** depends on **Domain**
- **Domain** depends on nothing (pure business logic)

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed explanation.

## API Documentation

This API is fully documented using **Swagger/OpenAPI 3.0** with interactive documentation available via Swagger UI.

### Accessing the Documentation

Once the development server is running, you can access the interactive API documentation at:

**http://localhost:4000/api-docs**

### Features of Swagger UI

- **Interactive Testing**: Try out API endpoints directly from your browser
- **Request/Response Examples**: See realistic examples for all endpoints
- **Schema Definitions**: Explore detailed data models and validation rules
- **Error Documentation**: Understand all possible error responses
- **Request Builder**: Automatically builds proper request formats

### Quick Start with Swagger UI

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to: http://localhost:4000/api-docs

3. Explore available endpoints organized by tags:
   - **Health**: System health check endpoints
   - **Users**: User management CRUD operations

4. Click "Try it out" on any endpoint to test it interactively

5. Fill in parameters and request body, then click "Execute"

6. View the response with status code, headers, and body

### Adding Documentation to New Endpoints

See [SWAGGER.md](./SWAGGER.md) for detailed guidelines on documenting new API endpoints.

## API Endpoints

### Health Check

```bash
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-25T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development",
  "version": "1.0.0"
}
```

### Users API

#### Create User

```bash
POST /api/users
Content-Type: application/json

{
  "email": "john@example.com",
  "name": "John Doe"
}
```

Response (201):
```json
{
  "data": {
    "id": "user_1234567890_abc123",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2025-10-25T12:00:00.000Z",
    "updatedAt": "2025-10-25T12:00:00.000Z"
  }
}
```

#### Get All Users

```bash
GET /api/users
```

Response (200):
```json
{
  "data": [
    {
      "id": "user_1234567890_abc123",
      "email": "john@example.com",
      "name": "John Doe",
      "createdAt": "2025-10-25T12:00:00.000Z",
      "updatedAt": "2025-10-25T12:00:00.000Z"
    }
  ]
}
```

#### Get User by ID

```bash
GET /api/users/:id
```

Response (200):
```json
{
  "data": {
    "id": "user_1234567890_abc123",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2025-10-25T12:00:00.000Z",
    "updatedAt": "2025-10-25T12:00:00.000Z"
  }
}
```

#### Update User

```bash
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Jane Doe"
}
```

Response (200):
```json
{
  "data": {
    "id": "user_1234567890_abc123",
    "email": "john@example.com",
    "name": "Jane Doe",
    "createdAt": "2025-10-25T12:00:00.000Z",
    "updatedAt": "2025-10-25T12:00:01.000Z"
  }
}
```

#### Delete User

```bash
DELETE /api/users/:id
```

Response (200):
```json
{
  "data": {
    "success": true
  }
}
```

### Error Responses

All errors follow a consistent format:

```json
{
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

Common status codes:
- `400` - Validation error
- `404` - Resource not found
- `409` - Conflict (e.g., email already exists)
- `429` - Rate limit exceeded
- `500` - Internal server error

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Server Configuration
NODE_ENV=development
PORT=4000

# API Configuration
API_PREFIX=/api
API_VERSION=v1

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:8081

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

## Development Workflow

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type check
npm run type-check
```

### Project Structure

```
apps/backend/
├── src/
│   ├── domain/                 # Business logic layer
│   │   ├── entities/          # Business entities
│   │   ├── interfaces/        # Repository interfaces
│   │   └── value-objects/     # Value objects
│   ├── application/           # Use cases layer
│   │   ├── use-cases/        # Business logic orchestration
│   │   └── dto/              # Data transfer objects
│   ├── infrastructure/        # External dependencies layer
│   │   ├── database/         # Database implementations
│   │   ├── repositories/     # Repository implementations
│   │   └── config/           # Configuration management
│   ├── presentation/          # HTTP layer
│   │   ├── controllers/      # HTTP request handlers
│   │   ├── routes/           # Express routes
│   │   ├── middleware/       # Express middleware
│   │   └── validators/       # Request validators
│   ├── server.ts             # Express app setup
│   └── index.ts              # Application entry point
├── tests/                     # Test files
├── .env.example              # Environment variables template
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Testing API with curl

### Health Check
```bash
curl http://localhost:4000/api/health
```

### Create User
```bash
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### Get All Users
```bash
curl http://localhost:4000/api/users
```

### Get User by ID
```bash
curl http://localhost:4000/api/users/user_1234567890_abc123
```

### Update User
```bash
curl -X PUT http://localhost:4000/api/users/user_1234567890_abc123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:4000/api/users/user_1234567890_abc123
```

## Security

- **Helmet.js**: Sets secure HTTP headers
- **CORS**: Configured for allowed origins
- **Rate Limiting**: Prevents abuse (100 requests per 15 minutes)
- **Input Validation**: All requests validated with Zod schemas
- **Error Sanitization**: Production errors don't leak sensitive data

## Future Enhancements

- Database integration (PostgreSQL with Prisma ORM)
- Authentication and authorization (JWT)
- Unit and integration tests with Jest
- Docker containerization
- CI/CD pipeline
- API versioning
- Request/response caching
- WebSocket support
- GraphQL support

## Contributing

1. Follow the Clean Architecture pattern
2. Add new use cases in `application/use-cases/`
3. Keep domain layer pure (no external dependencies)
4. Use dependency injection for controllers
5. Validate all inputs with Zod schemas
6. Add proper error handling
7. Write JSDoc comments for public APIs
8. Run linting and formatting before committing

## License

MIT
