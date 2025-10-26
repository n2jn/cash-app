import { Request, Response } from 'express'
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase'
import { GetUserUseCase } from '../../application/use-cases/GetUserUseCase'
import { GetAllUsersUseCase } from '../../application/use-cases/GetAllUsersUseCase'
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUserUseCase'
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUserUseCase'
import { ApiError } from '../middleware/errorHandler'

/**
 * User Controller
 *
 * Handles HTTP requests for user-related operations.
 * Delegates business logic to use cases (Application layer).
 */
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  /**
   * Create a new user
   * @route POST /api/users
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.createUserUseCase.execute(req.body)
      res.status(201).json({ data: user })
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        throw new ApiError(409, error.message, 'USER_ALREADY_EXISTS')
      }
      throw error
    }
  }

  /**
   * Get user by ID
   * @route GET /api/users/:id
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.getUserUseCase.execute(req.params.id)
      res.status(200).json({ data: user })
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        throw new ApiError(404, 'User not found', 'USER_NOT_FOUND')
      }
      throw error
    }
  }

  /**
   * Get all users
   * @route GET /api/users
   */
  async getAll(_req: Request, res: Response): Promise<void> {
    const users = await this.getAllUsersUseCase.execute()
    res.status(200).json({ data: users })
  }

  /**
   * Update user
   * @route PUT /api/users/:id
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.updateUserUseCase.execute(req.params.id, req.body)
      res.status(200).json({ data: user })
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        throw new ApiError(404, 'User not found', 'USER_NOT_FOUND')
      }
      throw error
    }
  }

  /**
   * Delete user
   * @route DELETE /api/users/:id
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.deleteUserUseCase.execute(req.params.id)
      res.status(200).json({ data: result })
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        throw new ApiError(404, 'User not found', 'USER_NOT_FOUND')
      }
      throw error
    }
  }
}
