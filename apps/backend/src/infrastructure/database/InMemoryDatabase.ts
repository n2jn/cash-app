import { User } from '../../domain/entities/User'

/**
 * In-Memory Database
 *
 * Simple in-memory data store for development and testing.
 * In production, this would be replaced with a real database implementation.
 */
export class InMemoryDatabase {
  private users: Map<string, User> = new Map()

  /**
   * Get all users
   */
  getUsers(): User[] {
    return Array.from(this.users.values())
  }

  /**
   * Get user by ID
   */
  getUserById(id: string): User | null {
    return this.users.get(id) || null
  }

  /**
   * Get user by email
   */
  getUserByEmail(email: string): User | null {
    return this.getUsers().find((user) => user.email === email) || null
  }

  /**
   * Save user (create or update)
   */
  saveUser(user: User): void {
    this.users.set(user.id, user)
  }

  /**
   * Delete user by ID
   */
  deleteUser(id: string): boolean {
    return this.users.delete(id)
  }

  /**
   * Clear all users (for testing)
   */
  clear(): void {
    this.users.clear()
  }

  /**
   * Get total count of users
   */
  count(): number {
    return this.users.size
  }
}

// Singleton instance
export const inMemoryDatabase = new InMemoryDatabase()
