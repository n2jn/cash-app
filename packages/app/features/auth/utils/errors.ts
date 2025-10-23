import { AuthErrorCode, type AuthError } from '../types'

/**
 * Maps authentication errors to user-friendly messages
 * @param error - Error from authentication attempt
 * @returns AuthError with user-friendly message
 */
export const mapAuthError = (error: Error | unknown): AuthError => {
  // Handle Error objects
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase()

    // Network errors
    if (
      errorMessage.includes('network') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('connection')
    ) {
      return {
        code: AuthErrorCode.NETWORK_ERROR,
        message: 'Unable to connect. Please check your internet connection',
        originalError: error,
      }
    }

    // Invalid credentials
    if (
      errorMessage.includes('invalid') ||
      errorMessage.includes('unauthorized') ||
      errorMessage.includes('credentials') ||
      errorMessage.includes('401')
    ) {
      return {
        code: AuthErrorCode.INVALID_CREDENTIALS,
        message: 'Invalid email or password',
        originalError: error,
      }
    }

    // Rate limiting
    if (
      errorMessage.includes('rate limit') ||
      errorMessage.includes('too many') ||
      errorMessage.includes('429')
    ) {
      return {
        code: AuthErrorCode.RATE_LIMIT,
        message: 'Too many attempts. Please try again later',
        originalError: error,
      }
    }

    // Generic error
    return {
      code: AuthErrorCode.UNKNOWN_ERROR,
      message: 'Something went wrong. Please try again',
      originalError: error,
    }
  }

  // Handle non-Error objects
  return {
    code: AuthErrorCode.UNKNOWN_ERROR,
    message: 'Something went wrong. Please try again',
  }
}

/**
 * Gets user-friendly message for a specific error code
 * @param code - AuthErrorCode
 * @returns User-friendly error message
 */
export const getErrorMessage = (code: AuthErrorCode): string => {
  switch (code) {
    case AuthErrorCode.INVALID_CREDENTIALS:
      return 'Invalid email or password'
    case AuthErrorCode.NETWORK_ERROR:
      return 'Unable to connect. Please check your internet connection'
    case AuthErrorCode.RATE_LIMIT:
      return 'Too many attempts. Please try again later'
    case AuthErrorCode.UNKNOWN_ERROR:
    default:
      return 'Something went wrong. Please try again'
  }
}
