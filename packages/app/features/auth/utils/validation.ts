import type { ValidationResult, FormValidationResult } from '../types'

// Email validation regex - standard email format
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Password requirements: minimum 8 characters, at least one number and one letter
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).+$/

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim().length === 0) {
    return {
      isValid: false,
      message: 'Email is required',
    }
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address',
    }
  }

  return {
    isValid: true,
  }
}

/**
 * Validates password format
 * @param password - Password to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.length === 0) {
    return {
      isValid: false,
      message: 'Password is required',
    }
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    }
  }

  if (!PASSWORD_REGEX.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one letter and one number',
    }
  }

  return {
    isValid: true,
  }
}

/**
 * Validates the entire login form
 * @param email - Email address
 * @param password - Password
 * @returns FormValidationResult with validation for each field and overall form validity
 */
export const validateLoginForm = (
  email: string,
  password: string
): FormValidationResult => {
  const emailValidation = validateEmail(email)
  const passwordValidation = validatePassword(password)

  return {
    email: emailValidation,
    password: passwordValidation,
    isFormValid: emailValidation.isValid && passwordValidation.isValid,
  }
}
