# FEATURE-007: Add Swagger/OpenAPI Documentation to Backend

**Type:** Enhancement
**Platform:** Backend
**Status:** Done
**Created:** 2025-10-25
**Assignee:** backend-expert

## Description

Add comprehensive Swagger/OpenAPI 3.0 documentation to the backend application at `apps/backend`. This will provide interactive API documentation via Swagger UI, making it easier for developers to understand, test, and integrate with the API.

The backend already has a well-structured Clean Architecture implementation with user endpoints and health check endpoints. This enhancement will add self-documenting capabilities to all existing API endpoints using OpenAPI 3.0 standards.

## Business Value

- Reduce onboarding time for new developers
- Provide interactive API testing capabilities without external tools
- Generate standardized API documentation automatically
- Improve API discoverability and developer experience
- Enable easier integration with frontend teams and external consumers

## Acceptance Criteria

- [x] Swagger UI is accessible at `/api-docs` route
- [x] All existing API endpoints are documented with:
  - Endpoint paths and HTTP methods
  - Request parameters (path, query, body)
  - Request body schemas
  - Response schemas for all status codes
  - Example requests and responses
  - Error response formats
- [x] OpenAPI specification follows version 3.0 standards
- [x] Reusable schemas are created for common models (User, Error, HealthCheck)
- [x] API documentation is automatically generated from JSDoc comments
- [x] README is updated with API documentation section
- [x] Documentation includes server information and contact details
- [x] All endpoints have proper tags for organization
- [x] Security schemes are defined (even if not yet implemented)

## Tasks

### 1. Install Dependencies
- [ ] Install `swagger-ui-express` for Swagger UI middleware
- [ ] Install `swagger-jsdoc` for generating OpenAPI specs from JSDoc
- [ ] Install type definitions: `@types/swagger-ui-express` and `@types/swagger-jsdoc`
- [ ] Update package.json with new dependencies

### 2. Create Swagger Configuration
- [ ] Create `/src/infrastructure/config/swagger.config.ts`
- [ ] Define OpenAPI 3.0 base configuration with:
  - API title, description, version
  - Server URLs (development, production)
  - Contact information
  - License information
- [ ] Configure swagger-jsdoc options with file paths to scan
- [ ] Set up component schemas location

### 3. Create Reusable Schemas
- [ ] Create `/src/presentation/schemas/swagger-schemas.ts`
- [ ] Define User schema with all properties
- [ ] Define Error schema for error responses
- [ ] Define HealthCheck schema for health endpoint
- [ ] Define validation error schema for 400 responses
- [ ] Add JSDoc annotations for schema documentation

### 4. Document Health Check Endpoint
- [ ] Add OpenAPI JSDoc comments to health check route/controller
- [ ] Document GET /api/health with:
  - Summary and description
  - Response 200 schema
  - Example response
  - Tags: ['Health']

### 5. Document User Endpoints
- [ ] Document POST /api/users (Create User):
  - Request body schema
  - Response 201 (success) schema
  - Response 400 (validation error) schema
  - Response 409 (conflict) schema
  - Example request/response
  - Tags: ['Users']
- [ ] Document GET /api/users (Get All Users):
  - Response 200 schema (array of users)
  - Example response
  - Tags: ['Users']
- [ ] Document GET /api/users/:id (Get User by ID):
  - Path parameter :id
  - Response 200 schema
  - Response 404 schema
  - Example response
  - Tags: ['Users']
- [ ] Document PUT /api/users/:id (Update User):
  - Path parameter :id
  - Request body schema
  - Response 200 schema
  - Response 400, 404 schemas
  - Example request/response
  - Tags: ['Users']
- [ ] Document DELETE /api/users/:id (Delete User):
  - Path parameter :id
  - Response 200 schema
  - Response 404 schema
  - Example response
  - Tags: ['Users']

### 6. Integrate Swagger Middleware
- [ ] Import swagger configuration in `/src/server.ts`
- [ ] Add Swagger UI middleware at `/api-docs` route
- [ ] Configure Swagger UI options (custom CSS, explorer enabled)
- [ ] Add redirect from `/api-docs` to `/api-docs/`
- [ ] Ensure Swagger loads before other routes

### 7. Add Security Definitions
- [ ] Define Bearer authentication scheme (for future JWT implementation)
- [ ] Document security requirements (even if not enforced yet)
- [ ] Add notes about future authentication implementation

### 8. Update Documentation
- [ ] Update `/apps/backend/README.md` with:
  - New "API Documentation" section
  - Link to Swagger UI at http://localhost:4000/api-docs
  - Instructions for accessing interactive docs
  - Screenshot or description of Swagger UI
- [ ] Update "Future Enhancements" section to remove Swagger (now implemented)
- [ ] Add JSDoc comments to all controllers and routes
- [ ] Create `/apps/backend/SWAGGER.md` with:
  - How to add documentation to new endpoints
  - Best practices for JSDoc annotations
  - Examples of common patterns

### 9. Testing and Validation
- [ ] Start development server and verify Swagger UI loads at `/api-docs`
- [ ] Test all documented endpoints via Swagger UI "Try it out" feature
- [ ] Verify all schemas render correctly
- [ ] Validate OpenAPI spec at https://editor.swagger.io/
- [ ] Test with example requests for all endpoints
- [ ] Verify error responses are properly documented
- [ ] Check that examples are accurate and working

### 10. Code Quality
- [ ] Ensure all code follows existing ESLint/Prettier rules
- [ ] Add TypeScript types for Swagger configuration
- [ ] Ensure no console.log or debug statements
- [ ] Run `npm run type-check` successfully
- [ ] Run `npm run lint` successfully

## Technical Notes

### Dependencies to Install
```json
{
  "dependencies": {
    "swagger-ui-express": "^5.0.0",
    "swagger-jsdoc": "^6.2.8"
  },
  "devDependencies": {
    "@types/swagger-ui-express": "^4.1.6",
    "@types/swagger-jsdoc": "^6.0.4"
  }
}
```

### Swagger Configuration Structure
```typescript
// src/infrastructure/config/swagger.config.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cash App API',
      version: '1.0.0',
      description: 'RESTful API for Cash App',
      contact: {
        name: 'API Support',
        email: 'support@cashapp.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [
    './src/presentation/routes/*.ts',
    './src/presentation/controllers/*.ts',
    './src/presentation/schemas/*.ts'
  ]
};

export const swaggerSpec = swaggerJsdoc(options);
```

### Example JSDoc Annotations
```typescript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
```

### Integration Pattern
```typescript
// In src/server.ts
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './infrastructure/config/swagger.config';

// Add before other routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Cash App API Docs'
}));
```

### Schema Definition Pattern
```typescript
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Unique user identifier
 *           example: user_1234567890_abc123
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: john@example.com
 *         name:
 *           type: string
 *           description: User's full name
 *           example: John Doe
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of user creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 */
```

### File Organization
- Configuration: `/src/infrastructure/config/swagger.config.ts`
- Schemas: `/src/presentation/schemas/swagger-schemas.ts`
- Route documentation: Add JSDoc to existing route files
- Controller documentation: Add JSDoc to existing controller files

### Best Practices
1. Use `$ref` for reusable schemas to avoid duplication
2. Document all possible response status codes
3. Include realistic example values
4. Group endpoints by tags (Health, Users, etc.)
5. Add descriptions that explain the purpose, not just restate the endpoint name
6. Keep schema definitions in a central location
7. Use OpenAPI 3.0 features (not Swagger 2.0)

### Future Considerations
- When JWT authentication is added, update security schemes
- Add request/response examples for all endpoints
- Consider adding API versioning to the OpenAPI spec
- Export OpenAPI spec as JSON for external tools
- Add validation tests for OpenAPI spec compliance

## Related Tickets

- Related to: FEATURE-006 (Backend application initialization)
- Blocks: None
- Blocked by: None

## Definition of Done

- [x] Swagger UI is accessible and functional at `/api-docs`
- [x] All existing endpoints are fully documented
- [x] OpenAPI spec passes validation at swagger.io editor
- [x] All endpoints can be tested via Swagger UI
- [x] README is updated with API documentation section
- [x] No ESLint or TypeScript errors
- [x] Code follows existing project standards
- [x] Documentation guide (SWAGGER.md) is created for future developers
