import React from 'react'
import { VStack, HStack, Heading } from '@gluestack-ui/themed'
import { Button, ButtonText } from '../../atoms/Button'
import { Link, LinkText } from '../../atoms/Link'
import { FormField } from '../../molecules/FormField'
import { PasswordInput } from '../../molecules/PasswordInput'
import { CheckboxField } from '../../molecules/CheckboxField'
import { TextDivider } from '../../molecules/TextDivider'
import { SocialButton, SocialProvider } from '../../molecules/SocialButton'

export interface LoginFormProps {
  // Form state (controlled component)
  email: string
  password: string
  rememberMe: boolean
  showPassword: boolean

  // Change handlers
  onEmailChange: (email: string) => void
  onPasswordChange: (password: string) => void
  onRememberMeChange: (checked: boolean) => void
  onTogglePassword: () => void

  // Action handlers
  onSubmit: () => void
  onForgotPassword: () => void
  onSignUp: () => void
  onSocialLogin: (provider: SocialProvider) => void

  // State
  isLoading?: boolean
  emailError?: string
  passwordError?: string
}

/**
 * LoginForm Component (Organism)
 *
 * Complete login form with email/password inputs, remember me checkbox,
 * social login buttons, and all necessary UI elements.
 *
 * This is a controlled component - all state is managed by the parent.
 * No business logic is implemented here, only UI composition.
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  rememberMe,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onTogglePassword,
  onSubmit,
  onForgotPassword,
  onSignUp,
  onSocialLogin,
  isLoading = false,
  emailError,
  passwordError,
}) => {
  return (
    <VStack>
      {/* Header with Sign up link */}
      <HStack justifyContent="space-between" alignItems="center">
        <Heading>Login to your account</Heading>
        <Link onPress={onSignUp}>
          <LinkText>Sign up</LinkText>
        </Link>
      </HStack>

      {/* Email Field */}
      <FormField
        label="Email"
        error={emailError}
        inputProps={{
          type: 'text',
          value: email,
          onChangeText: onEmailChange,
          placeholder: 'Enter your email',
          keyboardType: 'email-address',
        }}
      />

      {/* Password Field with Toggle */}
      <FormField label="Password" error={passwordError}>
        <PasswordInput
          value={password}
          onChangeText={onPasswordChange}
          placeholder="Enter your password"
          showPassword={showPassword}
          onTogglePassword={onTogglePassword}
          isInvalid={Boolean(passwordError)}
        />
      </FormField>

      {/* Remember Me + Forgot Password */}
      <HStack justifyContent="space-between" alignItems="center">
        <CheckboxField
          checked={rememberMe}
          onChange={onRememberMeChange}
          label="Remember me"
        />
        <Link onPress={onForgotPassword}>
          <LinkText>Forgot Password?</LinkText>
        </Link>
      </HStack>

      {/* Login Button */}
      <Button
      
        onPress={onSubmit}
        isLoading={isLoading}
      >
        <ButtonText>Login</ButtonText>
      </Button>

      {/* Divider */}
      <TextDivider text="OR CONTINUE WITH" />

      {/* Social Login Buttons */}
      <HStack justifyContent="center">
        <SocialButton
          provider="google"
          onPress={() => onSocialLogin('google')}
          disabled={isLoading}
        />
        <SocialButton
          provider="twitter"
          onPress={() => onSocialLogin('twitter')}
          disabled={isLoading}
        />
        <SocialButton
          provider="github"
          onPress={() => onSocialLogin('github')}
          disabled={isLoading}
        />
      </HStack>
    </VStack>
  )
}

// Set display name for debugging
LoginForm.displayName = 'LoginForm'
