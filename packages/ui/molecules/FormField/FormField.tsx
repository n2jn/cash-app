import React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from '@gluestack-ui/themed'
import { Input, InputField } from '../../atoms/Input'
import type { ComponentProps } from 'react'

// Re-export FormControl components for advanced usage
export {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
}

export interface FormFieldProps {
  label: string
  error?: string
  helperText?: string
  isRequired?: boolean
  isInvalid?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  inputProps?: ComponentProps<typeof InputField>
  children?: React.ReactNode // Support custom input components like PasswordInput
}

/**
 * FormField Component (Molecule)
 *
 * Combines FormControl, FormControlLabel, Input, and FormControlError
 * into a single reusable form field component.
 *
 * Provides label, error display, helper text, and required indicator.
 *
 * @example
 * ```tsx
 * import { FormField, PasswordInput } from '@cash-app/ui'
 *
 * // Simple input
 * <FormField
 *   label="Email"
 *   isRequired
 *   error={emailError}
 *   helperText="We'll never share your email"
 *   inputProps={{
 *     type: 'email',
 *     placeholder: 'Enter your email',
 *     value: email,
 *     onChangeText: setEmail,
 *   }}
 * />
 *
 * // Custom input component (like PasswordInput)
 * <FormField label="Password" error={passwordError}>
 *   <PasswordInput
 *     value={password}
 *     onChangeText={setPassword}
 *     showPassword={showPassword}
 *     onTogglePassword={() => setShowPassword(!showPassword)}
 *   />
 * </FormField>
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  isReadOnly = false,
  inputProps = {},
  children,
}) => {
  const hasError = Boolean(error) || isInvalid

  return (
    <FormControl
      isInvalid={hasError}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      {/* Label */}
      <FormControlLabel>
        <FormControlLabelText>
          {label}
          {isRequired && ' *'}
        </FormControlLabelText>
      </FormControlLabel>

      {/* Input Field - use children if provided, otherwise use default Input */}
      {children ? (
        children
      ) : (
        <Input
          isInvalid={hasError}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
        >
          <InputField {...inputProps} />
        </Input>
      )}

      {/* Helper Text */}
      {helperText && !hasError && (
        <FormControlHelper>
          <FormControlHelperText>
            {helperText}
          </FormControlHelperText>
        </FormControlHelper>
      )}

      {/* Error Message */}
      {hasError && error && (
        <FormControlError>
          <FormControlErrorText>
            {error}
          </FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  )
}

FormField.displayName = 'FormField'
