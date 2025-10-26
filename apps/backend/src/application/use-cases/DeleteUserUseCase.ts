import { IUserRepository } from '../../domain/interfaces/IUserRepository'

/**
 * Delete User Use Case
 *
 * Handles the business logic for deleting a user.
 */
export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the delete user use case
   * @param id - User ID
   * @returns Success status
   * @throws Error if user not found
   */
  async execute(id: string): Promise<{ success: boolean }> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    const deleted = await this.userRepository.delete(id)

    return { success: deleted }
  }
}
