# Backend Architecture

This document explains the Clean Architecture implementation in the Cash App backend.

## Clean Architecture Overview

Clean Architecture is a software design philosophy that separates concerns into layers, each with specific responsibilities. The key principle is the **Dependency Rule**: dependencies always point inward toward the business logic.

```
┌────────────────────────────────────────────┐
│         Presentation Layer                 │  ← HTTP, Controllers, Routes
│  (Express routes, controllers, middleware) │
└────────────────────────────────────────────┘
              ↓ depends on
┌────────────────────────────────────────────┐
│        Infrastructure Layer                │  ← Database, Repositories
│   (Repositories, Database, Config)         │
└────────────────────────────────────────────┘
              ↓ depends on
┌────────────────────────────────────────────┐
│         Application Layer                  │  ← Use Cases, Business Logic
│      (Use Cases, DTOs)                     │
└────────────────────────────────────────────┘
              ↓ depends on
┌────────────────────────────────────────────┐
│          Domain Layer                      │  ← Entities, Business Rules
│  (Entities, Value Objects, Interfaces)     │  (No external dependencies)
└────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Domain Layer (Innermost)

**Location**: `src/domain/`

**Purpose**: Contains the core business logic and rules. This is the heart of the application.

**Characteristics**:
- No external dependencies (no Express, no database libraries)
- Pure TypeScript/JavaScript
- Most stable layer (rarely changes)
- Contains business entities, value objects, and interfaces

**Components**:

#### Entities (`domain/entities/`)
Business objects that have an identity and lifecycle.

Example: `User.ts`
```typescript
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    this.validate()
  }

  private validate(): void {
    // Business rules validation
  }

  public updateName(newName: string): User {
    // Business logic for updating name
  }
}
```

#### Interfaces (`domain/interfaces/`)
Contracts that outer layers must implement.

Example: `IUserRepository.ts`
```typescript
export interface IUserRepository {
  findById(id: string): Promise<User | null>
  create(user: User): Promise<User>
  // ... other methods
}
```

#### Value Objects (`domain/value-objects/`)
Immutable objects that represent concepts with no identity.

Example: `Email.ts`
```typescript
export class Email {
  private readonly value: string

  constructor(email: string) {
    this.value = this.validate(email)
  }

  private validate(email: string): string {
    // Validation logic
  }
}
```

### 2. Application Layer

**Location**: `src/application/`

**Purpose**: Contains application-specific business logic and orchestrates the domain entities.

**Characteristics**:
- Depends only on the domain layer
- Framework-agnostic (no Express knowledge)
- Contains use cases (application-specific business logic)
- Coordinates entities and repositories

**Components**:

#### Use Cases (`application/use-cases/`)
Application-specific business logic that orchestrates domain entities.

Example: `CreateUserUseCase.ts`
```typescript
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<UserResponseDTO> {
    // Check business rules
    const existingUser = await this.userRepository.findByEmail(dto.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    // Create and persist entity
    const user = new User(/* ... */)
    const createdUser = await this.userRepository.create(user)

    return this.toResponseDTO(createdUser)
  }
}
```

#### DTOs (`application/dto/`)
Data Transfer Objects for input/output.

Example: `CreateUserDTO.ts`
```typescript
export interface CreateUserDTO {
  email: string
  name: string
}
```

### 3. Infrastructure Layer

**Location**: `src/infrastructure/`

**Purpose**: Implements interfaces defined in the domain layer and handles external dependencies.

**Characteristics**:
- Implements domain interfaces
- Handles database access, file systems, external APIs
- Can depend on application and domain layers
- Contains framework-specific code

**Components**:

#### Repositories (`infrastructure/repositories/`)
Concrete implementations of repository interfaces.

Example: `UserRepository.ts`
```typescript
export class UserRepository implements IUserRepository {
  constructor(private readonly database: InMemoryDatabase) {}

  async findById(id: string): Promise<User | null> {
    return this.database.getUserById(id)
  }

  async create(user: User): Promise<User> {
    this.database.saveUser(user)
    return user
  }
}
```

#### Database (`infrastructure/database/`)
Database connection and data access logic.

Example: `InMemoryDatabase.ts`
```typescript
export class InMemoryDatabase {
  private users: Map<string, User> = new Map()

  getUserById(id: string): User | null {
    return this.users.get(id) || null
  }
}
```

#### Configuration (`infrastructure/config/`)
Environment variables and configuration management.

Example: `environment.ts`
```typescript
export const config = {
  server: {
    port: parseInt(process.env.PORT || '4000', 10),
  },
  // ... other config
}
```

### 4. Presentation Layer (Outermost)

**Location**: `src/presentation/`

**Purpose**: Handles HTTP requests and responses. The interface to the outside world.

**Characteristics**:
- Depends on application layer
- Contains Express-specific code
- Handles HTTP concerns (requests, responses, middleware)
- No business logic (delegates to use cases)

**Components**:

#### Controllers (`presentation/controllers/`)
Handle HTTP requests and delegate to use cases.

Example: `UserController.ts`
```typescript
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response): Promise<void> {
    const user = await this.createUserUseCase.execute(req.body)
    res.status(201).json({ data: user })
  }
}
```

#### Routes (`presentation/routes/`)
Define HTTP routes and wire up dependencies.

Example: `userRoutes.ts`
```typescript
export function createUserRoutes(): Router {
  const router = Router()

  // Dependency injection
  const userRepository = new UserRepository(inMemoryDatabase)
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const userController = new UserController(createUserUseCase)

  // Routes
  router.post('/', validate(schema), asyncHandler(userController.create))

  return router
}
```

#### Middleware (`presentation/middleware/`)
Express middleware for cross-cutting concerns.

Examples:
- `errorHandler.ts` - Global error handling
- `logger.ts` - Request logging
- `validator.ts` - Input validation

#### Validators (`presentation/validators/`)
Zod schemas for request validation.

Example: `userValidators.ts`
```typescript
export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
})
```

## Data Flow

### Request Flow (Create User Example)

1. **HTTP Request** arrives at Express
   ```
   POST /api/users
   { "email": "test@example.com", "name": "Test" }
   ```

2. **Middleware** processes request
   - Request logging
   - Input validation (Zod schema)
   - Rate limiting

3. **Route Handler** receives request
   - Routes to `UserController.create()`

4. **Controller** extracts data
   - Gets data from `req.body`
   - Calls `CreateUserUseCase.execute(dto)`

5. **Use Case** executes business logic
   - Checks if user already exists (via repository)
   - Creates `User` entity (domain)
   - Persists via repository
   - Returns DTO

6. **Repository** handles data access
   - Implements `IUserRepository` interface
   - Saves to database (in-memory for now)

7. **Response** flows back
   - Controller sends JSON response
   - Middleware logs response
   - HTTP response sent to client

```
Client Request
     ↓
[Middleware: Logging, Validation]
     ↓
[Route Handler]
     ↓
[Controller] ← Presentation Layer
     ↓
[Use Case] ← Application Layer
     ↓
[Repository] ← Infrastructure Layer
     ↓
[Entity] ← Domain Layer
     ↓
[Database]
```

## Dependency Injection

The application uses **manual dependency injection** in route files.

Example:
```typescript
// Infrastructure
const database = new InMemoryDatabase()
const userRepository = new UserRepository(database)

// Application
const createUserUseCase = new CreateUserUseCase(userRepository)

// Presentation
const userController = new UserController(createUserUseCase)
```

This ensures:
- Loose coupling between layers
- Easy testing (can inject mocks)
- Clear dependency graph

## Testing Strategy

### Unit Tests

Test each layer in isolation:

**Domain Layer**:
```typescript
describe('User Entity', () => {
  it('should validate email format', () => {
    expect(() => new User('id', 'invalid', 'Name', new Date(), new Date()))
      .toThrow('Valid email is required')
  })
})
```

**Application Layer**:
```typescript
describe('CreateUserUseCase', () => {
  it('should create user', async () => {
    const mockRepo = createMock<IUserRepository>()
    const useCase = new CreateUserUseCase(mockRepo)
    // ... test logic
  })
})
```

### Integration Tests

Test multiple layers together:

```typescript
describe('User API', () => {
  it('should create user via HTTP', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test' })

    expect(response.status).toBe(201)
  })
})
```

## Benefits of This Architecture

### 1. Separation of Concerns
Each layer has a single, well-defined responsibility.

### 2. Testability
Pure business logic in domain/application layers is easy to test.

### 3. Independence
- **Framework Independence**: Can swap Express for Fastify
- **Database Independence**: Can swap in-memory for PostgreSQL
- **UI Independence**: Same backend for web, mobile, CLI

### 4. Maintainability
- Clear boundaries make code easier to understand
- Changes in one layer don't affect others
- New features follow established patterns

### 5. Scalability
- Can replace in-memory DB with real database
- Can add caching layer without changing business logic
- Can add API versioning easily

## Common Patterns

### Repository Pattern
Abstracts data access behind interfaces.

```typescript
// Domain defines contract
interface IUserRepository {
  findById(id: string): Promise<User | null>
}

// Infrastructure implements it
class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    // Database-specific code
  }
}
```

### Use Case Pattern
Encapsulates application-specific business logic.

```typescript
class CreateUserUseCase {
  async execute(dto: CreateUserDTO): Promise<UserResponseDTO> {
    // Business logic here
  }
}
```

### Dependency Inversion
High-level modules don't depend on low-level modules. Both depend on abstractions.

```typescript
// Use case depends on interface (abstraction)
class CreateUserUseCase {
  constructor(private readonly repository: IUserRepository) {}
}

// Concrete repository implements interface
class UserRepository implements IUserRepository {
  // Implementation
}
```

## Evolution Path

### Current State
- In-memory database
- Manual dependency injection
- Dummy CRUD operations

### Future Enhancements
1. **Database Integration**
   - Add Prisma ORM in infrastructure layer
   - Implement `UserRepository` with Prisma
   - No changes needed in application/domain layers

2. **Authentication**
   - Add `AuthUseCase` in application layer
   - Add JWT middleware in presentation layer
   - Add authentication entities in domain layer

3. **API Versioning**
   - Add versioned route handlers
   - Keep old and new use cases
   - Gradual migration

4. **GraphQL**
   - Add GraphQL resolvers in presentation layer
   - Reuse existing use cases
   - Same business logic, different presentation

## Best Practices

1. **Keep Domain Pure**
   - No external dependencies in domain layer
   - Business rules belong in entities

2. **Use Interfaces**
   - Define contracts in domain layer
   - Implement in infrastructure layer

3. **One Use Case, One Responsibility**
   - Each use case does one thing
   - Compose use cases for complex operations

4. **Validate Early**
   - Input validation at presentation layer
   - Business rule validation in domain layer

5. **Fail Fast**
   - Throw errors immediately when rules violated
   - Use middleware to handle errors consistently

6. **Immutability**
   - Entities return new instances when modified
   - Value objects are always immutable

## Conclusion

This Clean Architecture implementation provides a solid foundation for the Cash App backend. It's designed to be maintainable, testable, and scalable as the application grows.

For questions or suggestions, refer to the team's architecture documentation or reach out to the backend team.
