import { validateEmail, validatePassword, validateLoginForm } from '../validation'

describe('validateEmail', () => {
  it('should return valid for correct email format', () => {
    const result = validateEmail('test@example.com')
    expect(result.isValid).toBe(true)
    expect(result.message).toBeUndefined()
  })

  it('should return valid for email with subdomain', () => {
    const result = validateEmail('user@mail.example.com')
    expect(result.isValid).toBe(true)
  })

  it('should return valid for email with numbers', () => {
    const result = validateEmail('user123@example.com')
    expect(result.isValid).toBe(true)
  })

  it('should return invalid for empty email', () => {
    const result = validateEmail('')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Email is required')
  })

  it('should return invalid for whitespace-only email', () => {
    const result = validateEmail('   ')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Email is required')
  })

  it('should return invalid for email without @', () => {
    const result = validateEmail('testexample.com')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Please enter a valid email address')
  })

  it('should return invalid for email without domain', () => {
    const result = validateEmail('test@')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Please enter a valid email address')
  })

  it('should return invalid for email without TLD', () => {
    const result = validateEmail('test@example')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Please enter a valid email address')
  })

  it('should return invalid for email with spaces', () => {
    const result = validateEmail('test @example.com')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Please enter a valid email address')
  })
})

describe('validatePassword', () => {
  it('should return valid for password with 8+ chars, letter and number', () => {
    const result = validatePassword('password123')
    expect(result.isValid).toBe(true)
    expect(result.message).toBeUndefined()
  })

  it('should return valid for password with uppercase and number', () => {
    const result = validatePassword('Password1')
    expect(result.isValid).toBe(true)
  })

  it('should return valid for password with mixed case and numbers', () => {
    const result = validatePassword('MyP@ssw0rd')
    expect(result.isValid).toBe(true)
  })

  it('should return invalid for empty password', () => {
    const result = validatePassword('')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Password is required')
  })

  it('should return invalid for password less than 8 characters', () => {
    const result = validatePassword('pass1')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Password must be at least 8 characters')
  })

  it('should return invalid for password with exactly 7 characters', () => {
    const result = validatePassword('passw1d')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Password must be at least 8 characters')
  })

  it('should return invalid for password without numbers', () => {
    const result = validatePassword('passwordonly')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe(
      'Password must contain at least one letter and one number'
    )
  })

  it('should return invalid for password without letters', () => {
    const result = validatePassword('12345678')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe(
      'Password must contain at least one letter and one number'
    )
  })

  it('should return invalid for password with only special characters', () => {
    const result = validatePassword('!@#$%^&*()')
    expect(result.isValid).toBe(false)
    expect(result.message).toBe(
      'Password must contain at least one letter and one number'
    )
  })
})

describe('validateLoginForm', () => {
  it('should return valid for correct email and password', () => {
    const result = validateLoginForm('test@example.com', 'password123')
    expect(result.isFormValid).toBe(true)
    expect(result.email.isValid).toBe(true)
    expect(result.password.isValid).toBe(true)
  })

  it('should return invalid when email is invalid', () => {
    const result = validateLoginForm('invalid-email', 'password123')
    expect(result.isFormValid).toBe(false)
    expect(result.email.isValid).toBe(false)
    expect(result.email.message).toBe('Please enter a valid email address')
    expect(result.password.isValid).toBe(true)
  })

  it('should return invalid when password is invalid', () => {
    const result = validateLoginForm('test@example.com', 'short')
    expect(result.isFormValid).toBe(false)
    expect(result.email.isValid).toBe(true)
    expect(result.password.isValid).toBe(false)
    expect(result.password.message).toBe('Password must be at least 8 characters')
  })

  it('should return invalid when both email and password are invalid', () => {
    const result = validateLoginForm('invalid', 'short')
    expect(result.isFormValid).toBe(false)
    expect(result.email.isValid).toBe(false)
    expect(result.password.isValid).toBe(false)
  })

  it('should return invalid for empty fields', () => {
    const result = validateLoginForm('', '')
    expect(result.isFormValid).toBe(false)
    expect(result.email.isValid).toBe(false)
    expect(result.email.message).toBe('Email is required')
    expect(result.password.isValid).toBe(false)
    expect(result.password.message).toBe('Password is required')
  })
})
