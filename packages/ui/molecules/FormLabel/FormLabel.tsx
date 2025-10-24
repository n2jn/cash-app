import React from 'react'
import { Text } from '@gluestack-ui/themed'

export interface FormLabelProps {
  children: React.ReactNode
  required?: boolean
}

/**
 * FormLabel Component (Molecule)
 *
 * Text label for form inputs with optional required indicator.
 *
 * @example
 * ```tsx
 * import { FormLabel } from '@cash-app/ui'
 *
 * <FormLabel required>Email</FormLabel>
 * <FormLabel>Password</FormLabel>
 * ```
 */
export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required = false,
}) => {
  return (
    <Text>
      {children}
      {required && <Text> *</Text>}
    </Text>
  )
}

// Set display name for debugging
FormLabel.displayName = 'FormLabel'
