/**
 * Swagger/OpenAPI Schema Definitions
 *
 * This file contains reusable component schemas for the OpenAPI specification.
 * These schemas are referenced throughout the API documentation using $ref.
 */

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
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: Unique user identifier (CUID format)
 *           example: "clk1234567890abcdefghijk"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address (must be unique)
 *           example: "john.doe@example.com"
 *         name:
 *           type: string
 *           description: User's full name (1-100 characters)
 *           minLength: 1
 *           maxLength: 100
 *           example: "John Doe"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *           example: "2025-01-15T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated
 *           example: "2025-01-15T10:30:00.000Z"
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - email
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address (must be unique)
 *           example: "john.doe@example.com"
 *         name:
 *           type: string
 *           description: User's full name (1-100 characters)
 *           minLength: 1
 *           maxLength: 100
 *           example: "John Doe"
 *
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Updated email address (optional)
 *           example: "jane.doe@example.com"
 *         name:
 *           type: string
 *           description: Updated full name (optional, 1-100 characters)
 *           minLength: 1
 *           maxLength: 100
 *           example: "Jane Doe"
 *       description: At least one field must be provided for update
 *
 *     HealthCheck:
 *       type: object
 *       required:
 *         - status
 *         - timestamp
 *         - uptime
 *         - environment
 *       properties:
 *         status:
 *           type: string
 *           enum: [ok]
 *           description: Health status of the API
 *           example: "ok"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Current server timestamp
 *           example: "2025-01-15T10:30:00.000Z"
 *         uptime:
 *           type: number
 *           description: Server uptime in seconds
 *           example: 3600.5
 *         environment:
 *           type: string
 *           description: Current environment (development, production, test)
 *           example: "development"
 *
 *     SuccessResponse:
 *       type: object
 *       required:
 *         - data
 *       properties:
 *         data:
 *           description: Response data (type varies by endpoint)
 *
 *     UsersListResponse:
 *       type: object
 *       required:
 *         - data
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: Array of user objects
 *
 *     UserResponse:
 *       type: object
 *       required:
 *         - data
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/User'
 *
 *     DeleteResponse:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *           example: "User deleted successfully"
 *
 *     Error:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: object
 *           required:
 *             - message
 *             - statusCode
 *           properties:
 *             message:
 *               type: string
 *               description: Human-readable error message
 *               example: "Resource not found"
 *             statusCode:
 *               type: integer
 *               description: HTTP status code
 *               example: 404
 *             code:
 *               type: string
 *               description: Machine-readable error code
 *               example: "RESOURCE_NOT_FOUND"
 *             details:
 *               type: object
 *               description: Additional error details (optional)
 *
 *     ValidationError:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: object
 *           required:
 *             - message
 *             - statusCode
 *             - code
 *           properties:
 *             message:
 *               type: string
 *               description: Human-readable validation error message
 *               example: "Validation failed"
 *             statusCode:
 *               type: integer
 *               description: HTTP status code (always 400 for validation errors)
 *               example: 400
 *             code:
 *               type: string
 *               description: Error code (VALIDATION_ERROR)
 *               example: "VALIDATION_ERROR"
 *             details:
 *               type: array
 *               description: Array of validation error details
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                     description: Field name that failed validation
 *                     example: "email"
 *                   message:
 *                     type: string
 *                     description: Validation error message for the field
 *                     example: "Invalid email format"
 *
 *     ConflictError:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: object
 *           required:
 *             - message
 *             - statusCode
 *             - code
 *           properties:
 *             message:
 *               type: string
 *               description: Human-readable conflict error message
 *               example: "User with this email already exists"
 *             statusCode:
 *               type: integer
 *               description: HTTP status code (always 409 for conflicts)
 *               example: 409
 *             code:
 *               type: string
 *               description: Error code (RESOURCE_CONFLICT)
 *               example: "RESOURCE_CONFLICT"
 */

// This file only contains JSDoc comments for Swagger documentation
// No runtime code is needed here
export {}
