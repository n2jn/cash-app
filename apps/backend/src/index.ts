import { createApp } from './server'
import { config, validateConfig } from './infrastructure/config/environment'
import { logger } from './presentation/middleware/logger'

/**
 * Bootstrap Application
 *
 * Initializes and starts the Express server.
 */
async function bootstrap() {
  try {
    // Validate environment configuration
    validateConfig()

    // Create Express app
    const app = createApp()

    // Start server
    const server = app.listen(config.server.port, () => {
      logger.info('Server started successfully', {
        port: config.server.port,
        environment: config.server.nodeEnv,
        apiPrefix: config.api.prefix,
      })
      logger.info(`Server running at http://localhost:${config.server.port}`)
      logger.info(`API available at http://localhost:${config.server.port}${config.api.prefix}`)
    })

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`${signal} received, shutting down gracefully...`)
      server.close(() => {
        logger.info('Server closed')
        process.exit(0)
      })

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown due to timeout')
        process.exit(1)
      }, 10000)
    }

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception', { error: error.message, stack: error.stack })
      process.exit(1)
    })

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: unknown) => {
      logger.error('Unhandled Rejection', { reason })
      process.exit(1)
    })
  } catch (error) {
    logger.error('Failed to start server', { error })
    process.exit(1)
  }
}

// Start the application
void bootstrap()
