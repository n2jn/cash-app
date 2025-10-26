import { IUserRepository } from '../../domain/interfaces/IUserRepository'
import { UserResponseDTO } from '../dto/UserResponseDTO'
import { User } from '../../domain/entities/User'

/**
 * Get User Use Case
 *
 * Handles the business logic for retrieving a user by ID.
 */
export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the get user use case
   * @param id - User ID
   * @returns User response
   * @throws Error if user not found
   */
  async execute(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return this.toResponseDTO(user)
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
