import React from 'react'
import { Box } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

// Re-export Box for advanced usage
export { Box }

export interface CardProps extends Omit<ComponentProps<typeof Box>, 'padding'> {
  variant?: 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

/**
 * Card Component (Molecule)
 *
 * Extends Gluestack UI's Box component with elevated and outlined variants.
 * Provides a container with shadow or border styling for grouping content.
 *
 * @example
 * ```tsx
 * import { Card } from '@cash-app/ui'
 *
 * // Elevated variant (with shadow)
 * <Card variant="elevated" padding="md">
 *   <Text>Card content here</Text>
 * </Card>
 *
 * // Outlined variant (with border)
 * <Card variant="outlined" padding="lg">
 *   <Text>Card content here</Text>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  children,
  ...props
}) => {
  // Padding values
  const paddingValues = {
    none: 0,
    sm: 12,
    md: 16,
    lg: 24,
  }

  // Style based on variant
  const variantStyles = variant === 'elevated'
    ? {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }
    : {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
      }

  return (
    <Box
      style={{
        padding: paddingValues[padding],
        borderRadius: 8,
        ...variantStyles,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

Card.displayName = 'Card'
