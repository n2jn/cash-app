import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { asyncHandler } from '../middleware/errorHandler'
import { validate, validateParams } from '../middleware/validator'
import { createUserSchema, updateUserSchema, userIdParamSchema } from '../validators/userValidators'

// Use cases and repository
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase'
import { GetUserUseCase } from '../../application/use-cases/GetUserUseCase'
import { GetAllUsersUseCase } from '../../application/use-cases/GetAllUsersUseCase'
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUserUseCase'
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUserUseCase'
import { UserRepository } from '../../infrastructure/repositories/UserRepository'
import { inMemoryDatabase } from '../../infrastructure/database/InMemoryDatabase'

/**
 * User Routes
 *
 * Defines routes for user-related endpoints with dependency injection.
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user account with email and name. Email must be unique across all users.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *           example:
 *             email: "john.doe@example.com"
 *             name: "John Doe"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               data:
 *                 id: "clk1234567890abcdefghijk"
 *                 email: "john.doe@example.com"
 *                 name: "John Doe"
 *                 createdAt: "2025-01-15T10:30:00.000Z"
 *                 updatedAt: "2025-01-15T10:30:00.000Z"
 *       400:
 *         description: Validation error - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             example:
 *               error:
 *                 message: "Validation failed"
 *                 statusCode: 400
 *                 code: "VALIDATION_ERROR"
 *                 details:
 *                   - field: "email"
 *                     message: "Invalid email format"
 *       409:
 *         description: Conflict - user with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictError'
 *             example:
 *               error:
 *                 message: "User with this email already exists"
 *                 statusCode: 409
 *                 code: "RESOURCE_CONFLICT"
 *
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system. Returns an empty array if no users exist.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersListResponse'
 *             example:
 *               data:
 *                 - id: "clk1234567890abcdefghijk"
 *                   email: "john.doe@example.com"
 *                   name: "John Doe"
 *                   createdAt: "2025-01-15T10:30:00.000Z"
 *                   updatedAt: "2025-01-15T10:30:00.000Z"
 *                 - id: "clk0987654321zyxwvutsrqp"
 *                   email: "jane.smith@example.com"
 *                   name: "Jane Smith"
 *                   createdAt: "2025-01-15T11:00:00.000Z"
 *                   updatedAt: "2025-01-15T11:00:00.000Z"
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve detailed information about a specific user by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user identifier (CUID format)
 *         example: "clk1234567890abcdefghijk"
 *     responses:
 *       200:
 *         description: User found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               data:
 *                 id: "clk1234567890abcdefghijk"
 *                 email: "john.doe@example.com"
 *                 name: "John Doe"
 *                 createdAt: "2025-01-15T10:30:00.000Z"
 *                 updatedAt: "2025-01-15T10:30:00.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error:
 *                 message: "User not found"
 *                 statusCode: 404
 *                 code: "RESOURCE_NOT_FOUND"
 *
 *   put:
 *     summary: Update user
 *     description: Update an existing user's information. At least one field (email or name) must be provided.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user identifier (CUID format)
 *         example: "clk1234567890abcdefghijk"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *           example:
 *             name: "John Updated Doe"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               data:
 *                 id: "clk1234567890abcdefghijk"
 *                 email: "john.doe@example.com"
 *                 name: "John Updated Doe"
 *                 createdAt: "2025-01-15T10:30:00.000Z"
 *                 updatedAt: "2025-01-15T12:00:00.000Z"
 *       400:
 *         description: Validation error - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error:
 *                 message: "User not found"
 *                 statusCode: 404
 *                 code: "RESOURCE_NOT_FOUND"
 *       409:
 *         description: Conflict - email already in use by another user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictError'
 *             example:
 *               error:
 *                 message: "User with this email already exists"
 *                 statusCode: 409
 *                 code: "RESOURCE_CONFLICT"
 *
 *   delete:
 *     summary: Delete user
 *     description: Permanently delete a user from the system. This action cannot be undone.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user identifier (CUID format)
 *         example: "clk1234567890abcdefghijk"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *             example:
 *               message: "User deleted successfully"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error:
 *                 message: "User not found"
 *                 statusCode: 404
 *                 code: "RESOURCE_NOT_FOUND"
 */
export function createUserRoutes(): Router {
  const router = Router()

  // Dependency injection: Create repository and use cases
  const userRepository = new UserRepository(inMemoryDatabase)
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const getUserUseCase = new GetUserUseCase(userRepository)
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository)
  const updateUserUseCase = new UpdateUserUseCase(userRepository)
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  // Create controller with injected use cases
  const userController = new UserController(
    createUserUseCase,
    getUserUseCase,
    getAllUsersUseCase,
    updateUserUseCase,
    deleteUserUseCase
  )

  // Routes
  router.post(
    '/',
    validate(createUserSchema),
    asyncHandler(userController.create.bind(userController))
  )

  router.get('/', asyncHandler(userController.getAll.bind(userController)))

  router.get(
    '/:id',
    validateParams(userIdParamSchema),
    asyncHandler(userController.getById.bind(userController))
  )

  router.put(
    '/:id',
    validateParams(userIdParamSchema),
    validate(updateUserSchema),
    asyncHandler(userController.update.bind(userController))
  )

  router.delete(
    '/:id',
    validateParams(userIdParamSchema),
    asyncHandler(userController.delete.bind(userController))
  )

  return router
}
