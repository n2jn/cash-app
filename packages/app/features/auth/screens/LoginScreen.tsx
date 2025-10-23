import { type FC, useState, useCallback, useEffect } from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  FormField,
  Button,
  ButtonText,
  ButtonSpinner,
} from '@cash-app/ui'
import { useAuth } from '../../../provider'
import { validateEmail, validatePassword } from '../utils/validation'
import type { ValidationResult } from '../types'

export interface LoginScreenProps {
  /**
   * Callback function called after successful login
   * Platform experts will wire this to their navigation systems
   * Default: console.log success message
   */
  onLoginSuccess?: () => void
}

/**
 * LoginScreen - Cross-platform login form component
 *
 * Features:
 * - Email and password form fields
 * - Real-time validation with debouncing (300ms)
 * - Loading state during authentication
 * - Error display for validation and authentication failures
 * - Responsive layout for mobile and web
 * - Accessibility support
 *
 * Usage:
 * ```tsx
 * <LoginScreen onLoginSuccess={() => router.push('/home')} />
 * ```
 */
export const LoginScreen: FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Validation state
  const [emailValidation, setEmailValidation] = useState<ValidationResult>({
    isValid: true,
  })
  const [passwordValidation, setPasswordValidation] = useState<ValidationResult>(
    { isValid: true }
  )
  const [hasEmailBlurred, setHasEmailBlurred] = useState(false)
  const [hasPasswordBlurred, setHasPasswordBlurred] = useState(false)

  // Auth state
  const { login, isLoading, error: authError, clearError } = useAuth()

  // Derived state
  const isFormValid = emailValidation.isValid && passwordValidation.isValid && email.length > 0 && password.length > 0

  // Debounced validation for email
  useEffect(() => {
    const timer = setTimeout(() => {
      if (email.length > 0 || hasEmailBlurred) {
        setEmailValidation(validateEmail(email))
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [email, hasEmailBlurred])

  // Debounced validation for password
  useEffect(() => {
    const timer = setTimeout(() => {
      if (password.length > 0 || hasPasswordBlurred) {
        setPasswordValidation(validatePassword(password))
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [password, hasPasswordBlurred])

  // Clear auth error when user starts typing
  useEffect(() => {
    if (authError) {
      clearError()
    }
  }, [email, password])

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value)
  }, [])

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value)
  }, [])

  const handleEmailBlur = useCallback(() => {
    setHasEmailBlurred(true)
    setEmailValidation(validateEmail(email))
  }, [email])

  const handlePasswordBlur = useCallback(() => {
    setHasPasswordBlurred(true)
    setPasswordValidation(validatePassword(password))
  }, [password])

  const handleSubmit = useCallback(async () => {
    // Validate form before submission
    const emailResult = validateEmail(email)
    const passwordResult = validatePassword(password)

    setEmailValidation(emailResult)
    setPasswordValidation(passwordResult)
    setHasEmailBlurred(true)
    setHasPasswordBlurred(true)

    if (!emailResult.isValid || !passwordResult.isValid) {
      return
    }

    try {
      await login({ email, password })

      // Call success callback if provided
      if (onLoginSuccess) {
        onLoginSuccess()
      } else {
        console.log('Login successful! No onLoginSuccess callback provided.')
      }
    } catch (err) {
      // Error is handled by AuthProvider and displayed via authError
      console.error('Login failed:', err)
    }
  }, [email, password, login, onLoginSuccess])

  return (
    <Box
      // sx={{
      //   flex: 1,
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   padding: 16,
      //   backgroundColor: '$backgroundLight0',
      // }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 448, // md breakpoint
        }}
        padding="lg"
      >
        <VStack >
          {/* Header */}
          <Heading
            // sx={{
            //   textAlign: 'center',
            //   marginBottom: 8,
            //   fontSize: '$2xl',
            // }}
          >
            Login
          </Heading>

          {/* Authentication error display */}
          {authError && (
            <Box
              // sx={{
              //   backgroundColor: '$error100',
              //   padding: 12,
              //   borderRadius: 8,
              // }}
            >
              <Text
                // sx={{
                //   color: '$error700',
                //   fontSize: '$sm',
                // }}
              >
                {authError}
              </Text>
            </Box>
          )}

          {/* Email field */}
          <FormField
            label="Email"
            error={
              hasEmailBlurred && !emailValidation.isValid
                ? emailValidation.message
                : undefined
            }
            isInvalid={hasEmailBlurred && !emailValidation.isValid}
            inputProps={{
              type: 'text',
              placeholder: 'Enter your email',
              value: email,
              onChangeText: handleEmailChange,
              onBlur: handleEmailBlur,
              autoCapitalize: 'none',
              autoComplete: 'email',
              keyboardType: 'email-address',
              editable: !isLoading,
            }}
          />

          {/* Password field */}
          <FormField
            label="Password"
            error={
              hasPasswordBlurred && !passwordValidation.isValid
                ? passwordValidation.message
                : undefined
            }
            isInvalid={hasPasswordBlurred && !passwordValidation.isValid}
            inputProps={{
              type: 'password',
              placeholder: 'Enter your password',
              value: password,
              onChangeText: handlePasswordChange,
              onBlur: handlePasswordBlur,
              secureTextEntry: true,
              autoCapitalize: 'none',
              autoComplete: 'password',
              editable: !isLoading,
            }}
          />

          {/* Submit button */}
          <Button
            onPress={handleSubmit}
            isDisabled={!isFormValid || isLoading}
            sx={{
              marginTop: 16,
            }}
          >
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <ButtonText>Login</ButtonText>
            )}
          </Button>

          {/* Mock credentials hint for testing */}
          <Box
            // sx={{
            //   marginTop: 16,
            //   padding: 12,
            //   backgroundColor: '$backgroundLight100',
            //   borderRadius: 8,
            // }}
          >
            <Text
              // sx={{
              //   fontSize: '$xs',
              //   color: '$textLight500',
              //   textAlign: 'center',
              // }}
            >
              Mock credentials: Any valid email, password: password123
            </Text>
          </Box>
        </VStack>
      </Card>
    </Box>
  )
}
