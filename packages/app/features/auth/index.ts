// Auth feature exports

// Types
export type {
  User,
  AuthState,
  LoginCredentials,
  AuthContextValue,
  ValidationResult,
  FormValidationResult,
  AuthError,
} from './types'
export { AuthErrorCode } from './types'

// Utilities
export {
  validateEmail,
  validatePassword,
  validateLoginForm,
} from './utils/validation'
export { mapAuthError, getErrorMessage } from './utils/errors'

// Screens
export { LoginScreen } from './screens/LoginScreen'
export type { LoginScreenProps } from './screens/LoginScreen'
