import { z } from 'zod'

/**
 * Create User Validation Schema
 */
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address').max(255, 'Email too long'),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
})

/**
 * Update User Validation Schema
 */
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must not exceed 100 characters')
    .trim()
    .optional(),
})

/**
 * User ID Parameter Validation Schema
 */
export const userIdParamSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
})
