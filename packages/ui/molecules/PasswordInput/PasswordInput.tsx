import React from 'react'
import { Pressable } from 'react-native'
import { Input, InputField, InputSlot } from '../../atoms/Input'
import { Icon } from '../../atoms/Icon'

export interface PasswordInputProps {
  value: string
  onChangeText: (value: string) => void
  placeholder?: string
  showPassword: boolean
  onTogglePassword: () => void
  isInvalid?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
}

/**
 * PasswordInput Component (Molecule)
 *
 * Input component with password visibility toggle.
 * Combines Input atom with Icon atom for eye/eye-off toggle.
 *
 * @example
 * ```tsx
 * import { PasswordInput } from '@cash-app/ui'
 *
 * const [password, setPassword] = useState('')
 * const [showPassword, setShowPassword] = useState(false)
 *
 * <PasswordInput
 *   value={password}
 *   onChangeText={setPassword}
 *   placeholder="Enter your password"
 *   showPassword={showPassword}
 *   onTogglePassword={() => setShowPassword(!showPassword)}
 * />
 * ```
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Enter your password',
  showPassword,
  onTogglePassword,
  isInvalid = false,
  isDisabled = false,
  isReadOnly = false,
}) => {
  return (
    <Input
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      <InputField
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      <InputSlot onPress={onTogglePassword}>
        <Pressable onPress={onTogglePassword}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#737373"
          />
        </Pressable>
      </InputSlot>
    </Input>
  )
}

// Set display name for debugging
PasswordInput.displayName = 'PasswordInput'
