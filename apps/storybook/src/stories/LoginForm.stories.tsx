import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'
import { LoginForm } from '@cash-app/ui'

const meta: Meta<typeof LoginForm> = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof LoginForm>

/**
 * Default login form
 */
export const Default: Story = {
  render: () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    return (
      <LoginForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        showPassword={showPassword}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onRememberMeChange={setRememberMe}
        onTogglePassword={() => setShowPassword(!showPassword)}
        onSubmit={() => alert('Login submitted!')}
        onForgotPassword={() => alert('Forgot password clicked')}
        onSignUp={() => alert('Sign up clicked')}
        onSocialLogin={(provider) => alert(`${provider} login clicked`)}
      />
    )
  },
}

/**
 * With validation errors
 */
export const WithErrors: Story = {
  render: () => {
    const [email, setEmail] = useState('invalid-email')
    const [password, setPassword] = useState('123')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    return (
      <LoginForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        showPassword={showPassword}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onRememberMeChange={setRememberMe}
        onTogglePassword={() => setShowPassword(!showPassword)}
        onSubmit={() => {}}
        onForgotPassword={() => {}}
        onSignUp={() => {}}
        onSocialLogin={() => {}}
        emailError="Please enter a valid email address"
        passwordError="Password must be at least 8 characters"
      />
    )
  },
}

/**
 * Loading state
 */
export const Loading: Story = {
  render: () => {
    const [email, setEmail] = useState('user@example.com')
    const [password, setPassword] = useState('password123')
    const [rememberMe, setRememberMe] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    return (
      <LoginForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        showPassword={showPassword}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onRememberMeChange={setRememberMe}
        onTogglePassword={() => setShowPassword(!showPassword)}
        onSubmit={() => {}}
        onForgotPassword={() => {}}
        onSignUp={() => {}}
        onSocialLogin={() => {}}
        isLoading={true}
      />
    )
  },
}

/**
 * Pre-filled form
 */
export const PreFilled: Story = {
  render: () => {
    const [email, setEmail] = useState('user@example.com')
    const [password, setPassword] = useState('securePassword123')
    const [rememberMe, setRememberMe] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    return (
      <LoginForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        showPassword={showPassword}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onRememberMeChange={setRememberMe}
        onTogglePassword={() => setShowPassword(!showPassword)}
        onSubmit={() => alert('Login submitted!')}
        onForgotPassword={() => alert('Forgot password clicked')}
        onSignUp={() => alert('Sign up clicked')}
        onSocialLogin={(provider) => alert(`${provider} login clicked`)}
      />
    )
  },
}

/**
 * Interactive demo
 */
export const Interactive: Story = {
  render: () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handleSubmit = () => {
      setEmailError('')
      setPasswordError('')

      // Basic validation
      if (!email) {
        setEmailError('Email is required')
        return
      }
      if (!email.includes('@')) {
        setEmailError('Please enter a valid email address')
        return
      }
      if (!password) {
        setPasswordError('Password is required')
        return
      }
      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters')
        return
      }

      // Simulate login
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        alert('Login successful!')
      }, 2000)
    }

    return (
      <LoginForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        showPassword={showPassword}
        onEmailChange={(value) => {
          setEmail(value)
          setEmailError('')
        }}
        onPasswordChange={(value) => {
          setPassword(value)
          setPasswordError('')
        }}
        onRememberMeChange={setRememberMe}
        onTogglePassword={() => setShowPassword(!showPassword)}
        onSubmit={handleSubmit}
        onForgotPassword={() => alert('Forgot password clicked')}
        onSignUp={() => alert('Sign up clicked')}
        onSocialLogin={(provider) => alert(`${provider} login clicked`)}
        isLoading={isLoading}
        emailError={emailError}
        passwordError={passwordError}
      />
    )
  },
}
