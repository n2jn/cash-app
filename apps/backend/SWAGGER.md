# Swagger/OpenAPI Documentation Guide

This guide explains how to add and maintain OpenAPI documentation for API endpoints in this project.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Documentation Structure](#documentation-structure)
- [JSDoc Annotations](#jsdoc-annotations)
- [Schema Definitions](#schema-definitions)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## Overview

This project uses **Swagger/OpenAPI 3.0** for API documentation with:
- **swagger-jsdoc**: Generates OpenAPI spec from JSDoc comments
- **swagger-ui-express**: Provides interactive documentation UI

Documentation is automatically generated from JSDoc comments in:
- Route files: `/src/presentation/routes/*.ts`
- Controller files: `/src/presentation/controllers/*.ts`
- Schema files: `/src/presentation/schemas/*.ts`

## Quick Start

### 1. Add Documentation to a New Endpoint

Add JSDoc comments above your route definition:

```typescript
/**
 * @swagger
 * /api/your-endpoint:
 *   get:
 *     summary: Brief description
 *     description: Detailed description
 *     tags: [YourTag]
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YourSchema'
 */
router.get('/your-endpoint', handler)
```

### 2. View Your Documentation

1. Start the server: `npm run dev`
2. Open: http://localhost:4000/api-docs
3. Your endpoint will appear under the tag you specified

### 3. Test Your Endpoint

1. Click on your endpoint in Swagger UI
2. Click "Try it out"
3. Fill in parameters
4. Click "Execute"
5. View the response

## Documentation Structure

### File Organization

```
src/
├── infrastructure/config/
│   └── swagger.config.ts        # Main Swagger configuration
├── presentation/
│   ├── routes/
│   │   ├── healthRoutes.ts      # Route-level documentation
│   │   └── userRoutes.ts        # Route-level documentation
│   └── schemas/
│       └── swagger-schemas.ts   # Reusable schema definitions
```

### Configuration (`swagger.config.ts`)

The main configuration includes:
- API metadata (title, version, description)
- Server URLs (development, production)
- Security schemes (Bearer auth, etc.)
- Tags for organizing endpoints
- File paths to scan for JSDoc comments

## JSDoc Annotations

### Basic Endpoint Documentation

```typescript
/**
 * @swagger
 * /api/resource:
 *   method:
 *     summary: Short description (1 line)
 *     description: Detailed description (can be multiple lines)
 *     tags: [ResourceTag]
 *     responses:
 *       200:
 *         description: Success response description
 */
```

### HTTP Methods

Supported methods: `get`, `post`, `put`, `patch`, `delete`, `options`, `head`

```typescript
/**
 * @swagger
 * /api/users:
 *   get:
 *     # GET documentation
 *   post:
 *     # POST documentation
 */
```

### Tags

Group related endpoints together:

```typescript
tags: [Users]           // Single tag
tags: [Users, Admin]    // Multiple tags
```

Tags are defined in `swagger.config.ts`:

```typescript
tags: [
  {
    name: 'Users',
    description: 'User management endpoints'
  }
]
```

## Schema Definitions

### Reusable Schemas

Define schemas in `/src/presentation/schemas/swagger-schemas.ts`:

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
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier
 *           example: "user_123"
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 */
```

### Using Schema References

Reference schemas with `$ref`:

```typescript
schema:
  $ref: '#/components/schemas/User'
```

### Schema Types

Common OpenAPI types:
- `string` - Text data
- `number` - Numeric data
- `integer` - Whole numbers
- `boolean` - true/false
- `array` - Lists
- `object` - Complex structures

### Schema Formats

Additional validation with formats:
- `email` - Email address
- `date-time` - ISO 8601 date-time
- `date` - ISO 8601 date
- `password` - Password (hidden in UI)
- `uri` - URL/URI

## Common Patterns

### 1. GET Endpoint (Retrieve Resource)

```typescript
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve detailed information about a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: "user_123"
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
```

### 2. POST Endpoint (Create Resource)

```typescript
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *           example:
 *             email: "john@example.com"
 *             name: "John Doe"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictError'
 */
```

### 3. PUT/PATCH Endpoint (Update Resource)

```typescript
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     description: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 */
```

### 4. DELETE Endpoint (Delete Resource)

```typescript
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Permanently delete a user account
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *       404:
 *         description: User not found
 */
```

### 5. Query Parameters

```typescript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of users
 */
```

### 6. Array Responses

```typescript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
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

### 7. Authentication (Future)

When JWT is implemented, add security requirements:

```typescript
/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Protected endpoint
 *     tags: [Protected]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
```

## Best Practices

### 1. Use Descriptive Summaries

```typescript
// ✅ Good
summary: "Create a new user account"

// ❌ Bad
summary: "Create user"
```

### 2. Provide Detailed Descriptions

```typescript
// ✅ Good
description: "Create a new user account with email and name. Email must be unique across all users. Returns the created user with generated ID and timestamps."

// ❌ Bad
description: "Creates a user"
```

### 3. Document All Response Codes

```typescript
// ✅ Good - Documents all possible responses
responses:
  200:
    description: Success
  400:
    description: Validation error
  404:
    description: Not found
  500:
    description: Server error

// ❌ Bad - Only documents success case
responses:
  200:
    description: Success
```

### 4. Use Schema References

```typescript
// ✅ Good - Reusable schema
schema:
  $ref: '#/components/schemas/User'

// ❌ Bad - Inline schema (not reusable)
schema:
  type: object
  properties:
    id:
      type: string
    # ... repeated everywhere
```

### 5. Include Realistic Examples

```typescript
// ✅ Good - Realistic example
example:
  email: "john.doe@example.com"
  name: "John Doe"

// ❌ Bad - Generic example
example:
  email: "string"
  name: "string"
```

### 6. Document Required Fields

```typescript
// ✅ Good - Clearly marks required fields
required:
  - email
  - name

// ❌ Bad - No required fields specified
```

### 7. Use Proper HTTP Status Codes

- `200` - OK (successful GET, PUT, PATCH, DELETE)
- `201` - Created (successful POST)
- `204` - No Content (successful DELETE with no response)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `422` - Unprocessable Entity (semantic errors)
- `429` - Too Many Requests (rate limiting)
- `500` - Internal Server Error (server errors)

### 8. Organize with Tags

```typescript
// ✅ Good - Organized by feature
tags: [Users]
tags: [Authentication]
tags: [Health]

// ❌ Bad - No tags or unclear tags
tags: [API]
```

## Examples

### Complete Endpoint Documentation

See actual examples in:
- `/src/presentation/routes/healthRoutes.ts` - Health check endpoint
- `/src/presentation/routes/userRoutes.ts` - Full CRUD operations

### Schema Examples

See schema definitions in:
- `/src/presentation/schemas/swagger-schemas.ts` - All reusable schemas

## Troubleshooting

### Documentation Not Appearing

1. **Check JSDoc syntax**: Ensure `@swagger` tag is present
2. **Check file paths**: Verify file is in a scanned directory
3. **Restart server**: Changes may require restart
4. **Check console**: Look for swagger-jsdoc errors

### Schema Reference Errors

```typescript
// ✅ Correct reference format
$ref: '#/components/schemas/User'

// ❌ Incorrect - missing #
$ref: 'components/schemas/User'

// ❌ Incorrect - wrong path
$ref: '#/definitions/User'
```

### Swagger UI Not Loading

1. Check that server is running on correct port (4000)
2. Verify Swagger middleware is before routes in `server.ts`
3. Check helmet CSP configuration allows Swagger UI
4. Check browser console for errors

### Validation Errors

Test your OpenAPI spec at: https://editor.swagger.io/

1. Copy the spec: Visit http://localhost:4000/api-docs.json
2. Paste into Swagger Editor
3. Fix any validation errors shown

## Adding a New Feature

When adding a new feature, follow this workflow:

1. **Create the schema** in `swagger-schemas.ts`
   ```typescript
   /**
    * @swagger
    * components:
    *   schemas:
    *     MyResource:
    *       type: object
    *       # ... schema definition
    */
   ```

2. **Document the routes** in your route file
   ```typescript
   /**
    * @swagger
    * /api/my-resource:
    *   get:
    *     # ... route documentation
    */
   ```

3. **Add a tag** (if needed) in `swagger.config.ts`
   ```typescript
   tags: [
     {
       name: 'MyFeature',
       description: 'Feature description'
     }
   ]
   ```

4. **Test in Swagger UI**
   - Verify documentation appears
   - Test with "Try it out"
   - Validate responses match documentation

5. **Validate the spec**
   - Visit https://editor.swagger.io/
   - Copy spec from http://localhost:4000/api-docs.json
   - Fix any validation errors

## Resources

- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [Swagger Editor](https://editor.swagger.io/)
- [swagger-jsdoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [Swagger UI Documentation](https://swagger.io/docs/open-source-tools/swagger-ui/)

## Conclusion

Following these guidelines ensures consistent, comprehensive API documentation that:
- Helps developers understand the API
- Provides interactive testing capabilities
- Serves as a contract between frontend and backend
- Reduces onboarding time for new developers

For questions or improvements to this guide, please update this document and share with the team.
