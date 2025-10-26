import swaggerJsdoc from 'swagger-jsdoc'
import { config } from './environment'

/**
 * Swagger/OpenAPI Configuration
 *
 * Configures the OpenAPI 3.0 specification for the Cash App API.
 * The specification is generated from JSDoc comments in route and schema files.
 */
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cash App API',
      version: '1.0.0',
      description: `RESTful API for Cash App with Clean Architecture.

This API provides endpoints for user management and system health monitoring.
Built with TypeScript, Express, and following Clean Architecture principles.`,
      contact: {
        name: 'API Support',
        email: 'support@cashapp.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.server.port}`,
        description: 'Development server',
      },
      {
        url: 'https://api.cashapp.com',
        description: 'Production server (not yet deployed)',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT authorization header using the Bearer scheme. Note: JWT authentication is not yet implemented.',
        },
      },
    },
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints for monitoring system status',
      },
      {
        name: 'Users',
        description: 'User management endpoints (CRUD operations)',
      },
    ],
  },
  apis: [
    './src/presentation/routes/*.ts',
    './src/presentation/controllers/*.ts',
    './src/presentation/schemas/*.ts',
  ],
}

/**
 * Generated Swagger Specification
 *
 * This object contains the complete OpenAPI specification
 * generated from JSDoc comments in the codebase.
 */
export const swaggerSpec = swaggerJsdoc(options)
