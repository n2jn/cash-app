// @cash-app/ui - Cross-platform UI component library

// ============================================================
// PROVIDER
// ============================================================
export { UIProvider } from './provider'

// ============================================================
// CONFIG
// ============================================================
export { config } from './config/gluestack-ui.config'
export type { Config } from './config/gluestack-ui.config'

// ============================================================
// ATOMS
// ============================================================

// Input
export { Input, InputField, InputSlot, InputIcon } from './atoms/Input'
export type { InputProps, InputFieldProps } from './atoms/Input'

// Button
export { Button, ButtonText, ButtonSpinner, ButtonIcon } from './atoms/Button'
export type { ButtonProps, ButtonTextProps, ButtonSpinnerProps } from './atoms/Button'

// Checkbox
export { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from './atoms/Checkbox'
export type { CheckboxProps } from './atoms/Checkbox'

// Link
export { Link, LinkText } from './atoms/Link'
export type { LinkProps } from './atoms/Link'

// Icon
export { Icon } from './atoms/Icon'
export type { IconProps, IconName } from './atoms/Icon'

// Divider
export { Divider } from './atoms/Divider'
export type { DividerProps } from './atoms/Divider'

// ============================================================
// MOLECULES
// ============================================================

// FormField
export { FormField } from './molecules/FormField'
export type { FormFieldProps } from './molecules/FormField'

// FormControl components (re-exported for advanced usage)
export {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from './molecules/FormField'

// Card
export { Card, Box } from './molecules/Card'
export type { CardProps } from './molecules/Card'

// PasswordInput
export { PasswordInput } from './molecules/PasswordInput'
export type { PasswordInputProps } from './molecules/PasswordInput'

// FormLabel
export { FormLabel } from './molecules/FormLabel'
export type { FormLabelProps } from './molecules/FormLabel'

// CheckboxField
export { CheckboxField } from './molecules/CheckboxField'
export type { CheckboxFieldProps } from './molecules/CheckboxField'

// TextDivider
export { TextDivider } from './molecules/TextDivider'
export type { TextDividerProps } from './molecules/TextDivider'

// SocialButton
export { SocialButton } from './molecules/SocialButton'
export type { SocialButtonProps, SocialProvider } from './molecules/SocialButton'

// ============================================================
// ORGANISMS
// ============================================================

// LoginForm
export { LoginForm } from './organisms/LoginForm'
export type { LoginFormProps } from './organisms/LoginForm'

// ============================================================
// GLUESTACK UI RE-EXPORTS
// ============================================================
// Re-export commonly used Gluestack components for convenience

// Layout
export { HStack, VStack, Center } from '@gluestack-ui/themed'

// Typography
export { Text, Heading } from '@gluestack-ui/themed'

// Other components can be imported directly from @gluestack-ui/themed
// when needed by fullstack-expert
