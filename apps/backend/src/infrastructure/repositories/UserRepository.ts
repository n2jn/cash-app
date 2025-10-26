import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/interfaces/IUserRepository'
import { InMemoryDatabase } from '../database/InMemoryDatabase'

/**
 * User Repository Implementation
 *
 * Implements the IUserRepository interface using an in-memory database.
 * This follows the Repository pattern from Clean Architecture.
 */
export class UserRepository implements IUserRepository {
  constructor(private readonly database: InMemoryDatabase) {}

  async findById(id: string): Promise<User | null> {
    return Promise.resolve(this.database.getUserById(id))
  }

  async findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(this.database.getUserByEmail(email))
  }

  async findAll(): Promise<User[]> {
    return Promise.resolve(this.database.getUsers())
  }

  async create(user: User): Promise<User> {
    this.database.saveUser(user)
    return Promise.resolve(user)
  }

  async update(user: User): Promise<User> {
    this.database.saveUser(user)
    return Promise.resolve(user)
  }

  async delete(id: string): Promise<boolean> {
    return Promise.resolve(this.database.deleteUser(id))
  }
}
