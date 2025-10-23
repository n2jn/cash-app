import React from 'react'
import {
  Button as GluestackButton,
  ButtonText as GluestackButtonText,
  ButtonSpinner as GluestackButtonSpinner,
  ButtonIcon,
} from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

// Re-export Gluestack Button sub-components
export { ButtonIcon }

// Type definitions
export type ButtonProps = ComponentProps<typeof GluestackButton> & {
  isLoading?: boolean
}

export type ButtonTextProps = ComponentProps<typeof GluestackButtonText>

export type ButtonSpinnerProps = ComponentProps<typeof GluestackButtonSpinner>

/**
 * Button Component (Atom)
 *
 * Re-exports Gluestack UI's Button component with Cash App branding.
 * Supports solid, outline, and link variants with loading states.
 *
 * @example
 * ```tsx
 * import { Button, ButtonText, ButtonSpinner } from '@cash-app/ui'
 *
 * <Button action="primary" size="md" isLoading={false}>
 *   <ButtonText>Login</ButtonText>
 * </Button>
 *
 * // With loading state
 * <Button isLoading>
 *   <ButtonSpinner />
 *   <ButtonText>Loading...</ButtonText>
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  isDisabled,
  children,
  ...props
}) => {
  return (
    <GluestackButton
      isDisabled={isDisabled || isLoading}
      {...props}
    >
      {children}
    </GluestackButton>
  )
}

/**
 * ButtonText Component
 *
 * The text content inside a Button component.
 */
export const ButtonText: React.FC<ButtonTextProps> = (props) => {
  return <GluestackButtonText {...props} />
}

/**
 * ButtonSpinner Component
 *
 * Loading spinner for Button component.
 * Typically used with isLoading prop.
 */
export const ButtonSpinner: React.FC<ButtonSpinnerProps> = (props) => {
  return <GluestackButtonSpinner {...props} />
}

// Set display names for debugging
Button.displayName = 'Button'
ButtonText.displayName = 'ButtonText'
ButtonSpinner.displayName = 'ButtonSpinner'
