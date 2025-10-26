import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import { config } from './infrastructure/config/environment'
import { swaggerSpec } from './infrastructure/config/swagger.config'
import { requestLogger } from './presentation/middleware/logger'
import { errorHandler, notFoundHandler } from './presentation/middleware/errorHandler'
import { createRoutes } from './presentation/routes'

/**
 * Create Express Application
 *
 * Configures the Express app with middleware and routes.
 */
export function createApp(): Application {
  const app = express()

  // Security middleware - Configure helmet to allow Swagger UI
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
          // scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          // imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
          // fontSrc: ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
          // connectSrc: ["'self'", 'https:', 'http:'],
          // workerSrc: ["'self'", 'blob:'],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  )

  // CORS configuration
  app.use(
    cors({
      origin: config.cors.origin,
      credentials: true,
    })
  )

  // Rate limiting
  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: {
      error: {
        message: 'Too many requests, please try again later',
        statusCode: 429,
        code: 'RATE_LIMIT_EXCEEDED',
      },
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
  app.use(limiter)

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))

  // Request logging
  app.use(requestLogger)

  // Swagger API Documentation (must be before API routes)
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Cash App API Documentation',
      customfavIcon: '/favicon.ico',
    })
  )

  // API routes
  app.use(config.api.prefix, createRoutes())

  // 404 handler (must be before error handler)
  app.use(notFoundHandler)

  // Global error handler (must be last)
  app.use(errorHandler)

  return app
}
