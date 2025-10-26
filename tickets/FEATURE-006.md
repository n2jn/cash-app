# FEATURE-006: Backend Repository with Node.js, TypeScript, and Clean Architecture

**Type:** Feature
**Platform:** Backend
**Status:** Done
**Created:** 2025-10-25
**Assignee:** backend-expert

## Description

Create a new backend repository located in `apps/backend` that implements Clean Architecture principles with Node.js and TypeScript. The backend will serve as the API layer for the Cash App monorepo, providing a well-structured, maintainable, and scalable foundation for future backend development.

The repository should demonstrate proper architectural separation with a working dummy API endpoint to validate the structure and serve as a reference implementation for future features.

### Business Value

- Establishes a scalable backend architecture that can grow with the application
- Provides clear separation of concerns for easier maintenance and testing
- Creates a reference implementation for the team to follow
- Sets up development tooling for consistent code quality
- Enables API-driven development for mobile and web applications

## Acceptance Criteria

- [ ] Backend repository exists at `apps/backend` with proper npm workspace configuration
- [ ] TypeScript is configured with strict type checking enabled
- [ ] Clean Architecture layers are clearly separated with appropriate folder structure
- [ ] At least one working dummy API endpoint is implemented (e.g., health check or simple CRUD)
- [ ] ESLint and Prettier are configured and working
- [ ] Error handling middleware is implemented and tested
- [ ] Logging middleware captures requests and errors appropriately
- [ ] README.md explains the architecture, folder structure, and how to run the project
- [ ] Development server can be started with `npm run dev:backend` from root
- [ ] API can be tested via HTTP client (Postman/Thunder Client/curl)
- [ ] All dependencies are properly declared in package.json

## Tasks

### 1. Project Setup and Configuration

- [ ] Create `apps/backend` directory structure
- [ ] Initialize package.json with workspace configuration
- [ ] Set up TypeScript configuration (tsconfig.json) with strict mode
- [ ] Configure ESLint with TypeScript support
- [ ] Configure Prettier with project standards
- [ ] Set up nodemon for development hot reload
- [ ] Create .gitignore for backend-specific files
- [ ] Add backend scripts to root package.json

### 2. Clean Architecture Structure

- [ ] Create domain layer structure:
  - `src/domain/entities/` - Business entities
  - `src/domain/interfaces/` - Repository and use case interfaces
  - `src/domain/value-objects/` - Value objects
- [ ] Create application layer structure:
  - `src/application/use-cases/` - Business logic use cases
  - `src/application/dto/` - Data transfer objects
- [ ] Create infrastructure layer structure:
  - `src/infrastructure/database/` - Database implementations
  - `src/infrastructure/repositories/` - Repository implementations
  - `src/infrastructure/config/` - Configuration management
- [ ] Create presentation layer structure:
  - `src/presentation/controllers/` - HTTP controllers
  - `src/presentation/routes/` - Express routes
  - `src/presentation/middleware/` - Middleware functions
  - `src/presentation/validators/` - Request validators

### 3. Core Server Implementation

- [ ] Install Express.js and required dependencies
- [ ] Install TypeScript types for Node.js and Express
- [ ] Create server entry point (`src/index.ts`)
- [ ] Set up Express application configuration
- [ ] Implement dependency injection container (optional: use tsyringe or awilix)
- [ ] Configure environment variables with dotenv
- [ ] Set up proper error handling for uncaught exceptions

### 4. Middleware Implementation

- [ ] Create error handling middleware:
  - Global error handler
  - 404 Not Found handler
  - Validation error formatter
- [ ] Create logging middleware:
  - Request logger (method, path, status, duration)
  - Error logger
  - Optional: integrate Winston or Pino for structured logging
- [ ] Create CORS middleware configuration
- [ ] Create request validation middleware
- [ ] Add helmet.js for security headers
- [ ] Add rate limiting middleware (express-rate-limit)

### 5. Dummy API Endpoint

- [ ] Implement example domain entity (e.g., User or Product)
- [ ] Create repository interface in domain layer
- [ ] Implement in-memory repository (infrastructure layer)
- [ ] Create use case for entity operations (CRUD)
- [ ] Create DTOs for request/response
- [ ] Implement controller with proper error handling
- [ ] Create Express routes for the endpoint
- [ ] Add input validation using Zod or class-validator
- [ ] Write example test for the endpoint

### 6. Development Tooling

- [ ] Set up build script with TypeScript compiler
- [ ] Create development script with nodemon
- [ ] Add lint script with auto-fix option
- [ ] Add format script with Prettier
- [ ] Create pre-commit hooks with husky (optional)
- [ ] Add type-check script for CI/CD
- [ ] Configure VS Code settings for the backend workspace

### 7. Documentation

- [ ] Write comprehensive README.md:
  - Project overview
  - Architecture explanation with diagram
  - Folder structure documentation
  - Installation instructions
  - Development workflow
  - API endpoint documentation
  - Testing guidelines
- [ ] Add inline code documentation (JSDoc/TSDoc)
- [ ] Create ARCHITECTURE.md with detailed layer explanations
- [ ] Document environment variables in .env.example
- [ ] Add API documentation with example requests/responses

### 8. Testing and Validation

- [ ] Test server starts successfully
- [ ] Test dummy API endpoint returns expected responses
- [ ] Verify error handling works correctly
- [ ] Verify logging captures requests
- [ ] Test TypeScript compilation works
- [ ] Test ESLint and Prettier work correctly
- [ ] Verify hot reload works in development
- [ ] Test API with HTTP client (Postman/curl)

## Technical Notes

### Recommended Dependencies

**Production:**
- `express` - Web framework
- `dotenv` - Environment variables
- `zod` or `class-validator` - Request validation
- `helmet` - Security headers
- `cors` - CORS configuration
- `express-rate-limit` - Rate limiting
- `winston` or `pino` - Structured logging (optional)

**Development:**
- `typescript` - Type checking
- `@types/node` - Node.js types
- `@types/express` - Express types
- `@types/cors` - CORS types
- `tsx` or `ts-node` - TypeScript execution
- `nodemon` - Development hot reload
- `eslint` - Code linting
- `@typescript-eslint/parser` - TypeScript ESLint parser
- `@typescript-eslint/eslint-plugin` - TypeScript ESLint rules
- `prettier` - Code formatting
- `eslint-config-prettier` - Disable conflicting ESLint rules

### Clean Architecture Layers

**Domain Layer** (innermost, no external dependencies):
- Contains business entities and rules
- Defines interfaces for repositories and use cases
- Pure TypeScript, no framework dependencies
- Most stable layer

**Application Layer**:
- Contains use cases (business logic orchestration)
- Depends only on domain layer
- Framework-agnostic
- Coordinates entities and repositories

**Infrastructure Layer**:
- Implements domain interfaces (repositories, services)
- Handles external dependencies (databases, APIs, file systems)
- Can depend on application and domain layers
- Contains framework-specific code

**Presentation Layer** (outermost):
- HTTP controllers and routes
- Request/response handling
- Input validation
- Depends on application layer
- Express-specific code

### Example Directory Structure

```
apps/backend/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── User.ts
│   │   ├── interfaces/
│   │   │   └── IUserRepository.ts
│   │   └── value-objects/
│   ├── application/
│   │   ├── use-cases/
│   │   │   └── CreateUserUseCase.ts
│   │   └── dto/
│   │       ├── CreateUserDTO.ts
│   │       └── UserResponseDTO.ts
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── InMemoryDatabase.ts
│   │   ├── repositories/
│   │   │   └── UserRepository.ts
│   │   └── config/
│   │       └── environment.ts
│   ├── presentation/
│   │   ├── controllers/
│   │   │   └── UserController.ts
│   │   ├── routes/
│   │   │   └── userRoutes.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   ├── logger.ts
│   │   │   └── validator.ts
│   │   └── validators/
│   │       └── userValidators.ts
│   ├── server.ts
│   └── index.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── tsconfig.json
├── nodemon.json
├── package.json
├── README.md
└── ARCHITECTURE.md
```

### Example Dummy API

**Endpoint:** `GET /api/health`
- Returns server health status
- Demonstrates basic routing and response

**Endpoint:** `POST /api/users` (optional, for CRUD example)
- Creates a user in memory
- Demonstrates full Clean Architecture flow
- Shows validation, error handling, and logging

**Endpoint:** `GET /api/users/:id` (optional)
- Retrieves user by ID
- Demonstrates repository pattern

### Port Configuration

- Development: `http://localhost:4000`
- Configurable via `PORT` environment variable

### TypeScript Configuration Notes

- Enable strict mode for type safety
- Use ESNext module resolution
- Output to `dist/` directory
- Include source maps for debugging
- Exclude tests and node_modules from compilation

### Integration with Monorepo

- Add `@cash-app/backend` to workspace
- Update root package.json with backend scripts
- Backend runs independently from mobile/web apps
- Can be called from mobile/web via HTTP
- Consider adding shared types package in future

### Security Considerations

- Use helmet.js for security headers
- Implement rate limiting to prevent abuse
- Validate all input with Zod or class-validator
- Use environment variables for sensitive data
- Add CORS configuration for allowed origins
- Sanitize error messages in production

### Future Enhancements (Out of Scope)

- Database integration (PostgreSQL, MongoDB)
- Authentication and authorization (JWT)
- API documentation with Swagger/OpenAPI
- Unit and integration tests with Jest
- Docker containerization
- CI/CD pipeline configuration
- API versioning strategy
- Request/response caching
- WebSocket support
- GraphQL support

## Related Tickets

- Foundation for future backend features
- Will be consumed by FEATURE-002 (Login) when authentication API is added
- May require shared types package in the future

## Success Metrics

- Backend server starts without errors
- Dummy API endpoint responds correctly
- Code passes all linting and formatting checks
- Architecture is easy to understand from documentation
- New developers can add features following the established pattern
