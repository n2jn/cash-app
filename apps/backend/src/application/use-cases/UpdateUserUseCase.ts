import { IUserRepository } from '../../domain/interfaces/IUserRepository'
import { UpdateUserDTO } from '../dto/UpdateUserDTO'
import { UserResponseDTO } from '../dto/UserResponseDTO'
import { User } from '../../domain/entities/User'

/**
 * Update User Use Case
 *
 * Handles the business logic for updating a user.
 */
export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the update user use case
   * @param id - User ID
   * @param dto - Data for updating the user
   * @returns Updated user response
   * @throws Error if user not found
   */
  async execute(id: string, dto: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    // Update user with new data
    const updatedUser = dto.name ? user.updateName(dto.name) : user

    // Persist changes
    const savedUser = await this.userRepository.update(updatedUser)

    return this.toResponseDTO(savedUser)
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
