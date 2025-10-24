import { type FC, useState, useCallback } from 'react'
import { Box, LoginForm } from '@cash-app/ui'
import { useAuth } from '../../../provider'
import type { SocialProvider } from '../types'

export interface LoginScreenProps {
  /**
   * Callback function called after successful login
   * Platform experts will wire this to their navigation systems
   * Default: console.log success message
   */
  onLoginSuccess?: () => void

  /**
   * Callback function called when user clicks "Sign up"
   * Platform experts will wire this to their navigation systems
   */
  onSignUpPress?: () => void

  /**
   * Callback function called when user clicks "Forgot Password?"
   * Platform experts will wire this to their navigation systems
   */
  onForgotPasswordPress?: () => void
}

/**
 * LoginScreen - Cross-platform login form component
 *
 * Features:
 * - Email and password form fields using the new LoginForm component
 * - Password visibility toggle
 * - Remember me checkbox
 * - Social login (Google, Twitter, GitHub)
 * - Loading state during authentication
 * - Responsive layout for mobile and web
 * - Accessibility support
 *
 * Usage:
 * ```tsx
 * <LoginScreen
 *   onLoginSuccess={() => router.push('/home')}
 *   onSignUpPress={() => router.push('/signup')}
 *   onForgotPasswordPress={() => router.push('/forgot-password')}
 * />
 * ```
 */
export const LoginScreen: FC<LoginScreenProps> = ({
  onLoginSuccess,
  onSignUpPress,
  onForgotPasswordPress,
}) => {
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Auth state
  const { login, loginWithSocial, isLoading } = useAuth()

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async () => {
    try {
      await login({ email, password })

      // Call success callback if provided
      if (onLoginSuccess) {
        onLoginSuccess()
      } else {
        console.log('Login successful! No onLoginSuccess callback provided.')
      }
    } catch (err) {
      // Error is handled by AuthProvider and displayed in the form
      console.error('Login failed:', err)
    }
  }, [email, password, login, onLoginSuccess])

  /**
   * Handle social login
   */
  const handleSocialLogin = useCallback(
    async (provider: SocialProvider) => {
      try {
        await loginWithSocial(provider)

        // Call success callback if provided
        if (onLoginSuccess) {
          onLoginSuccess()
        } else {
          console.log(
            `${provider} login successful! No onLoginSuccess callback provided.`
          )
        }
      } catch (err) {
        // Error is handled by AuthProvider
        console.error(`${provider} login failed:`, err)
      }
    },
    [loginWithSocial, onLoginSuccess]
  )

  /**
   * Handle toggle password visibility
   */
  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

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
      <LoginForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        showPassword={showPassword}
        isLoading={isLoading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onRememberMeChange={setRememberMe}
        onTogglePassword={handleTogglePassword}
        onSubmit={handleSubmit}
        onForgotPassword={
          onForgotPasswordPress || (() => console.log('Forgot password clicked'))
        }
        onSignUp={onSignUpPress || (() => console.log('Sign up clicked'))}
        onSocialLogin={handleSocialLogin}
      />
    </Box>
  )
}
