import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

/**
 * Validation Middleware Factory
 *
 * Creates middleware to validate request body, params, or query using Zod schemas.
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: {
            message: 'Validation failed',
            statusCode: 400,
            code: 'VALIDATION_ERROR',
            details: error.errors.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
        })
      } else {
        next(error)
      }
    }
  }
}

/**
 * Validate Request Params
 */
export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.params)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: {
            message: 'Invalid request parameters',
            statusCode: 400,
            code: 'VALIDATION_ERROR',
            details: error.errors.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
        })
      } else {
        next(error)
      }
    }
  }
}

/**
 * Validate Request Query
 */
export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: {
            message: 'Invalid query parameters',
            statusCode: 400,
            code: 'VALIDATION_ERROR',
            details: error.errors.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
        })
      } else {
        next(error)
      }
    }
  }
}
