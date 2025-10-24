import React from 'react'
import { Divider as GluestackDivider } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

// Type definitions
export type DividerProps = ComponentProps<typeof GluestackDivider>

/**
 * Divider Component (Atom)
 *
 * Re-exports Gluestack UI's Divider component.
 * Supports horizontal and vertical orientations.
 *
 * @example
 * ```tsx
 * import { Divider } from '@cash-app/ui'
 *
 * // Horizontal divider (default)
 * <Divider />
 *
 * // With flex (for TextDivider)
 * <Divider flex={1} />
 * ```
 */
export const Divider: React.FC<DividerProps> = (props) => {
  return <GluestackDivider {...props} />
}

// Set display name for debugging
Divider.displayName = 'Divider'
