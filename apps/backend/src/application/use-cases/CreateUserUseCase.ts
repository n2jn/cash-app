import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/interfaces/IUserRepository'
import { CreateUserDTO } from '../dto/CreateUserDTO'
import { UserResponseDTO } from '../dto/UserResponseDTO'

/**
 * Create User Use Case
 *
 * Handles the business logic for creating a new user.
 * This is application layer logic that orchestrates domain entities and repositories.
 */
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the create user use case
   * @param dto - Data for creating the user
   * @returns Created user response
   * @throws Error if email already exists
   */
  async execute(dto: CreateUserDTO): Promise<UserResponseDTO> {
    // Check if user with email already exists
    const existingUser = await this.userRepository.findByEmail(dto.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Create user entity
    const user = new User(this.generateId(), dto.email, dto.name, new Date(), new Date())

    // Persist user
    const createdUser = await this.userRepository.create(user)

    // Return response DTO
    return this.toResponseDTO(createdUser)
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private toResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  }
}
