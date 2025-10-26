import { IUserRepository } from '../../domain/interfaces/IUserRepository'
import { UserResponseDTO } from '../dto/UserResponseDTO'
import { User } from '../../domain/entities/User'

/**
 * Get All Users Use Case
 *
 * Handles the business logic for retrieving all users.
 */
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the get all users use case
   * @returns Array of user responses
   */
  async execute(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll()
    return users.map((user) => this.toResponseDTO(user))
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
