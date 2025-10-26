import { Request, Response } from 'express'

/**
 * Health Controller
 *
 * Handles health check endpoints.
 */
export class HealthController {
  /**
   * Health check endpoint
   * @route GET /api/health
   */
  async check(_req: Request, res: Response): Promise<void> {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    }

    res.status(200).json(healthStatus)
  }
}
