import { mapAuthError, getErrorMessage } from '../errors'
import { AuthErrorCode } from '../../types'

describe('mapAuthError', () => {
  it('should map network error', () => {
    const error = new Error('Network request failed')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.NETWORK_ERROR)
    expect(result.message).toBe(
      'Unable to connect. Please check your internet connection'
    )
    expect(result.originalError).toBe(error)
  })

  it('should map fetch error', () => {
    const error = new Error('Failed to fetch')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.NETWORK_ERROR)
  })

  it('should map timeout error', () => {
    const error = new Error('Request timeout')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.NETWORK_ERROR)
  })

  it('should map connection error', () => {
    const error = new Error('Connection refused')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.NETWORK_ERROR)
  })

  it('should map invalid credentials error', () => {
    const error = new Error('Invalid credentials')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.INVALID_CREDENTIALS)
    expect(result.message).toBe('Invalid email or password')
  })

  it('should map unauthorized error', () => {
    const error = new Error('Unauthorized access')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.INVALID_CREDENTIALS)
  })

  it('should map 401 error', () => {
    const error = new Error('HTTP 401 error')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.INVALID_CREDENTIALS)
  })

  it('should map rate limit error', () => {
    const error = new Error('Rate limit exceeded')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.RATE_LIMIT)
    expect(result.message).toBe('Too many attempts. Please try again later')
  })

  it('should map too many requests error', () => {
    const error = new Error('Too many requests')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.RATE_LIMIT)
  })

  it('should map 429 error', () => {
    const error = new Error('HTTP 429 error')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.RATE_LIMIT)
  })

  it('should map unknown error', () => {
    const error = new Error('Something unexpected happened')
    const result = mapAuthError(error)

    expect(result.code).toBe(AuthErrorCode.UNKNOWN_ERROR)
    expect(result.message).toBe('Something went wrong. Please try again')
  })

  it('should handle non-Error objects', () => {
    const result = mapAuthError('string error')

    expect(result.code).toBe(AuthErrorCode.UNKNOWN_ERROR)
    expect(result.message).toBe('Something went wrong. Please try again')
    expect(result.originalError).toBeUndefined()
  })

  it('should handle null error', () => {
    const result = mapAuthError(null)

    expect(result.code).toBe(AuthErrorCode.UNKNOWN_ERROR)
  })

  it('should handle undefined error', () => {
    const result = mapAuthError(undefined)

    expect(result.code).toBe(AuthErrorCode.UNKNOWN_ERROR)
  })
})

describe('getErrorMessage', () => {
  it('should return message for INVALID_CREDENTIALS', () => {
    const message = getErrorMessage(AuthErrorCode.INVALID_CREDENTIALS)
    expect(message).toBe('Invalid email or password')
  })

  it('should return message for NETWORK_ERROR', () => {
    const message = getErrorMessage(AuthErrorCode.NETWORK_ERROR)
    expect(message).toBe(
      'Unable to connect. Please check your internet connection'
    )
  })

  it('should return message for RATE_LIMIT', () => {
    const message = getErrorMessage(AuthErrorCode.RATE_LIMIT)
    expect(message).toBe('Too many attempts. Please try again later')
  })

  it('should return message for UNKNOWN_ERROR', () => {
    const message = getErrorMessage(AuthErrorCode.UNKNOWN_ERROR)
    expect(message).toBe('Something went wrong. Please try again')
  })
})
