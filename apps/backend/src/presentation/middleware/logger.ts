import winston from 'winston'
import { Request, Response, NextFunction } from 'express'
import { config } from '../../infrastructure/config/environment'

/**
 * Winston Logger Configuration
 */
export const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    // Console transport with colorized output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
          const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          return `${timestamp as string} [${level}]: ${message as string} ${metaStr}`
        })
      ),
    }),
  ],
})

// Add file transport in production
if (config.server.nodeEnv === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    })
  )
  logger.add(
    new winston.transports.File({
      filename: 'logs/combined.log',
    })
  )
}

/**
 * Request Logger Middleware
 *
 * Logs incoming HTTP requests with method, URL, status code, and duration.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now()

  // Log after response is sent
  res.on('finish', () => {
    const duration = Date.now() - start

    logger.info('HTTP Request', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
  })

  next()
}
