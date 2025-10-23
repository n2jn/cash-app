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
 * import { FormField } from '@cash-app/ui'
 *
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

      {/* Input Field */}
      <Input
        isInvalid={hasError}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
      >
        <InputField {...inputProps} />
      </Input>

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
