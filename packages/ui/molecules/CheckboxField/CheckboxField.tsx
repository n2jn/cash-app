import React from 'react'
import { Text } from '@gluestack-ui/themed'
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '../../atoms/Checkbox'

export interface CheckboxFieldProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
  value?: string
}

/**
 * CheckboxField Component (Molecule)
 *
 * Combines Checkbox atom with Text label in horizontal layout.
 * Perfect for "Remember me" and similar form checkboxes.
 *
 * @example
 * ```tsx
 * import { CheckboxField } from '@cash-app/ui'
 *
 * const [rememberMe, setRememberMe] = useState(false)
 *
 * <CheckboxField
 *   checked={rememberMe}
 *   onChange={setRememberMe}
 *   label="Remember me"
 * />
 * ```
 */
export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  value,
}) => {
  return (
    <Checkbox
      value={value || 'checkbox'}
      isChecked={checked}
      onChange={onChange}
      isDisabled={disabled}
    >
      <CheckboxIndicator>
        <CheckboxIcon />
      </CheckboxIndicator>
      <CheckboxLabel>
        <Text>{label}</Text>
      </CheckboxLabel>
    </Checkbox>
  )
}

// Set display name for debugging
CheckboxField.displayName = 'CheckboxField'
