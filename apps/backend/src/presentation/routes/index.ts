import { Router } from 'express'
import { createHealthRoutes } from './healthRoutes'
import { createUserRoutes } from './userRoutes'

/**
 * Main Router
 *
 * Combines all route modules into a single router.
 */
export function createRoutes(): Router {
  const router = Router()

  // Health check routes
  router.use('/health', createHealthRoutes())

  // User routes
  router.use('/users', createUserRoutes())

  return router
}
