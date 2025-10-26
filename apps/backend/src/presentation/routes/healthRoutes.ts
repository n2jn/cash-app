import { Router } from 'express'
import { HealthController } from '../controllers/HealthController'
import { asyncHandler } from '../middleware/errorHandler'

/**
 * Health Routes
 *
 * Defines routes for health check endpoints.
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check the health and status of the API server. Returns system information including uptime, environment, and current timestamp.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy and operational
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - timestamp
 *                 - uptime
 *                 - environment
 *                 - version
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Health status of the API
 *                   example: "healthy"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: Current server timestamp
 *                   example: "2025-01-15T10:30:00.000Z"
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                   example: 3600.5
 *                 environment:
 *                   type: string
 *                   description: Current environment (development, production, test)
 *                   example: "development"
 *                 version:
 *                   type: string
 *                   description: API version
 *                   example: "1.0.0"
 *             example:
 *               status: "healthy"
 *               timestamp: "2025-01-15T10:30:00.000Z"
 *               uptime: 3600.5
 *               environment: "development"
 *               version: "1.0.0"
 */
export function createHealthRoutes(): Router {
  const router = Router()
  const healthController = new HealthController()

  // GET /api/health
  router.get('/', asyncHandler(healthController.check.bind(healthController)))

  return router
}
