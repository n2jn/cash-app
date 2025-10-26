import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

/**
 * Environment Configuration
 *
 * Centralizes all environment variable access with type safety and defaults.
 */
export const config = {
  server: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '4000', 10),
  },
  api: {
    prefix: process.env.API_PREFIX || '/api',
    version: process.env.API_VERSION || 'v1',
  },
  cors: {
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',')
      : ['http://localhost:3000', 'http://localhost:8081'],
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
} as const

/**
 * Validates that all required environment variables are set
 */
export function validateConfig(): void {
  const required: string[] = []

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}
