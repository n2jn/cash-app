import { User } from '../entities/User'

/**
 * User Repository Interface
 *
 * Defines the contract for user data persistence.
 * Implementations in the infrastructure layer must fulfill this contract.
 */
export interface IUserRepository {
  /**
   * Find a user by ID
   * @param id - User ID
   * @returns User if found, null otherwise
   */
  findById(id: string): Promise<User | null>

  /**
   * Find a user by email
   * @param email - User email
   * @returns User if found, null otherwise
   */
  findByEmail(email: string): Promise<User | null>

  /**
   * Find all users
   * @returns Array of all users
   */
  findAll(): Promise<User[]>

  /**
   * Create a new user
   * @param user - User entity to create
   * @returns Created user
   */
  create(user: User): Promise<User>

  /**
   * Update an existing user
   * @param user - User entity with updated data
   * @returns Updated user
   */
  update(user: User): Promise<User>

  /**
   * Delete a user by ID
   * @param id - User ID
   * @returns True if deleted, false otherwise
   */
  delete(id: string): Promise<boolean>
}
