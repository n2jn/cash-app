import React from 'react'
import {
  Checkbox as GluestackCheckbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

// Re-export Gluestack Checkbox sub-components
export { CheckboxIndicator, CheckboxIcon, CheckboxLabel }

// Type definitions
export type CheckboxProps = ComponentProps<typeof GluestackCheckbox> & {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

/**
 * Checkbox Component (Atom)
 *
 * Re-exports Gluestack UI's Checkbox component with Cash App branding.
 * Supports controlled component pattern for form usage.
 *
 * @example
 * ```tsx
 * import { Checkbox, CheckboxIndicator, CheckboxIcon } from '@cash-app/ui'
 * import { CheckIcon } from 'lucide-react-native'
 *
 * <Checkbox
 *   value="remember"
 *   isChecked={isChecked}
 *   onChange={(checked) => setIsChecked(checked)}
 *   size="md"
 * >
 *   <CheckboxIndicator>
 *     <CheckboxIcon as={CheckIcon} />
 *   </CheckboxIndicator>
 * </Checkbox>
 * ```
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled,
  isChecked,
  isDisabled,
  children,
  ...props
}) => {
  // Support both checked/onChange (custom API) and isChecked (Gluestack API)
  const handleChange = (value: boolean) => {
    if (onChange && !disabled && !isDisabled) {
      onChange(value)
    }
  }

  return (
    <GluestackCheckbox
      isChecked={checked !== undefined ? checked : isChecked}
      isDisabled={disabled !== undefined ? disabled : isDisabled}
      onChange={handleChange}
      {...props}
    >
      {children}
    </GluestackCheckbox>
  )
}

// Set display name for debugging
Checkbox.displayName = 'Checkbox'
