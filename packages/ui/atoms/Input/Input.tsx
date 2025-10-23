import React from 'react'
import { Input as GluestackInput, InputField as GluestackInputField, InputSlot, InputIcon } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

// Re-export Gluestack Input components
export { InputSlot, InputIcon }

// Type definitions
export type InputProps = ComponentProps<typeof GluestackInput>

export type InputFieldProps = ComponentProps<typeof GluestackInputField>

/**
 * Input Component (Atom)
 *
 * Re-exports Gluestack UI's Input component with custom focus styles.
 * Supports email, password, and text input types.
 *
 * @example
 * ```tsx
 * import { Input, InputField } from '@cash-app/ui'
 *
 * <Input variant="outline" size="md">
 *   <InputField type="email" placeholder="Enter your email" />
 * </Input>
 * ```
 */
export const Input: React.FC<InputProps> = (props) => {
  return <GluestackInput {...props} />
}

/**
 * InputField Component
 *
 * The actual text input field that goes inside Input.
 * Supports type, placeholder, value, onChange, etc.
 */
export const InputField: React.FC<InputFieldProps> = (props) => {
  return <GluestackInputField {...props} />
}

// Set display names for debugging
Input.displayName = 'Input'
InputField.displayName = 'InputField'
