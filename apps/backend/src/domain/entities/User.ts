/**
 * User Entity
 *
 * Represents a user in the domain model.
 * This is a pure domain entity with no external dependencies.
 */
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    this.validate()
  }

  /**
   * Validates the user entity
   * @throws Error if validation fails
   */
  private validate(): void {
    if (!this.id || this.id.trim().length === 0) {
      throw new Error('User ID is required')
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      throw new Error('Valid email is required')
    }

    if (!this.name || this.name.trim().length === 0) {
      throw new Error('User name is required')
    }

    if (this.name.length > 100) {
      throw new Error('User name must not exceed 100 characters')
    }
  }

  /**
   * Simple email validation
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Creates a new User instance with updated name
   */
  public updateName(newName: string): User {
    return new User(this.id, this.email, newName, this.createdAt, new Date())
  }

  /**
   * Converts the user entity to a plain object
   */
  public toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
