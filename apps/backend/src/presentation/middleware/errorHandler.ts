import { Request, Response, NextFunction } from 'express'
import { logger } from './logger'

/**
 * Custom API Error
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Error Response Interface
 */
interface ErrorResponse {
  error: {
    message: string
    code?: string
    statusCode: number
    details?: unknown
  }
}

/**
 * Global Error Handler Middleware
 *
 * Catches all errors and formats them into consistent error responses.
 * Logs errors and sanitizes error messages in production.
 */
export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Default to 500 Internal Server Error
  let statusCode = 500
  let message = 'Internal server error'
  let code: string | undefined

  // Handle known ApiError instances
  if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    code = err.code
  }
  // Handle validation errors
  else if (err.name === 'ValidationError') {
    statusCode = 400
    message = err.message
    code = 'VALIDATION_ERROR'
  }
  // Handle generic errors
  else if (err instanceof Error) {
    message = err.message
  }

  // Log error details
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    statusCode,
    method: req.method,
    path: req.path,
    ip: req.ip,
  })

  // Prepare error response
  const errorResponse: ErrorResponse = {
    error: {
      message,
      statusCode,
      ...(code && { code }),
    },
  }

  // In development, include stack trace
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.details = {
      stack: err.stack,
    }
  }

  res.status(statusCode).json(errorResponse)
}

/**
 * 404 Not Found Handler
 *
 * Catches requests to non-existent routes.
 */
export function notFoundHandler(req: Request, res: Response): void {
  const message = `Route ${req.method} ${req.path} not found`

  logger.warn('404 Not Found', {
    method: req.method,
    path: req.path,
    ip: req.ip,
  })

  res.status(404).json({
    error: {
      message,
      statusCode: 404,
      code: 'NOT_FOUND',
    },
  })
}

/**
 * Async Handler Wrapper
 *
 * Wraps async route handlers to catch promise rejections.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
