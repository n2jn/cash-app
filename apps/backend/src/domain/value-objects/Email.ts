/**
 * Email Value Object
 *
 * Represents an email address with validation.
 * Value objects are immutable and self-validating.
 */
export class Email {
  private readonly value: string

  constructor(email: string) {
    this.value = this.validate(email)
  }

  private validate(email: string): string {
    const trimmed = email.trim().toLowerCase()

    if (!trimmed) {
      throw new Error('Email cannot be empty')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      throw new Error('Invalid email format')
    }

    if (trimmed.length > 255) {
      throw new Error('Email must not exceed 255 characters')
    }

    return trimmed
  }

  public getValue(): string {
    return this.value
  }

  public equals(other: Email): boolean {
    return this.value === other.value
  }

  public toString(): string {
    return this.value
  }
}
