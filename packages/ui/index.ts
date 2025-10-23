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

// ============================================================
// GLUESTACK UI RE-EXPORTS
// ============================================================
// Re-export commonly used Gluestack components for convenience

// Layout
export { HStack, VStack, Center, Divider } from '@gluestack-ui/themed'

// Typography
export { Text, Heading } from '@gluestack-ui/themed'

// Other components can be imported directly from @gluestack-ui/themed
// when needed by fullstack-expert
