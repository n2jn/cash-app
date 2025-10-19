import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField, VStack } from '@cash-app/ui'
import { useState } from 'react'

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the form field',
    },
    error: {
      control: 'text',
      description: 'Error message to display when field is invalid',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to guide the user',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the field is in an invalid state',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the field is read-only',
    },
  },
}

export default meta
type Story = StoryObj<typeof FormField>

/**
 * Default form field with label
 */
export const Default: Story = {
  args: {
    label: 'Username',
    inputProps: {
      placeholder: 'Enter your username',
    },
  },
}

/**
 * Email field for login forms
 */
export const EmailField: Story = {
  args: {
    label: 'Email',
    isRequired: true,
    helperText: "We'll never share your email",
    inputProps: {
      type: 'email',
      placeholder: 'email@example.com',
    },
  },
}

/**
 * Password field
 */
export const PasswordField: Story = {
  args: {
    label: 'Password',
    isRequired: true,
    helperText: 'Must be at least 8 characters',
    inputProps: {
      type: 'password',
      placeholder: 'Enter your password',
    },
  },
}

/**
 * Required field with asterisk
 */
export const Required: Story = {
  args: {
    label: 'Full Name',
    isRequired: true,
    inputProps: {
      placeholder: 'John Doe',
    },
  },
}

/**
 * Field with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Phone Number',
    helperText: 'Include country code',
    inputProps: {
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
    },
  },
}

/**
 * Field with error message
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    isRequired: true,
    error: 'Please enter a valid email address',
    inputProps: {
      type: 'email',
      placeholder: 'email@example.com',
      value: 'invalid-email',
    },
  },
}

/**
 * Invalid field state
 */
export const Invalid: Story = {
  args: {
    label: 'Username',
    isInvalid: true,
    error: 'This username is already taken',
    inputProps: {
      placeholder: 'Enter username',
      value: 'taken-username',
    },
  },
}

/**
 * Disabled field
 */
export const Disabled: Story = {
  args: {
    label: 'Account ID',
    isDisabled: true,
    inputProps: {
      value: 'ACC-12345',
    },
  },
}

/**
 * Read-only field
 */
export const ReadOnly: Story = {
  args: {
    label: 'User ID',
    isReadOnly: true,
    helperText: 'This value cannot be changed',
    inputProps: {
      value: 'user-123456',
    },
  },
}

/**
 * Controlled email field with validation
 */
export const ControlledWithValidation: Story = {
  render: (args) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const validateEmail = (value: string) => {
      if (!value) {
        setError('Email is required')
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setError('Please enter a valid email address')
      } else {
        setError('')
      }
    }

    const handleChange = (value: string) => {
      setEmail(value)
      validateEmail(value)
    }

    return (
      <FormField
        {...args}
        error={error}
        inputProps={{
          type: 'email',
          placeholder: 'email@example.com',
          value: email,
          onChangeText: handleChange,
          onBlur: () => validateEmail(email),
        }}
      />
    )
  },
  args: {
    label: 'Email',
    isRequired: true,
    helperText: 'Enter your email address',
  },
}

/**
 * Password field with validation
 */
export const PasswordWithValidation: Story = {
  render: (args) => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const validatePassword = (value: string) => {
      if (!value) {
        setError('Password is required')
      } else if (value.length < 8) {
        setError('Password must be at least 8 characters')
      } else {
        setError('')
      }
    }

    const handleChange = (value: string) => {
      setPassword(value)
      validatePassword(value)
    }

    return (
      <FormField
        {...args}
        error={error}
        inputProps={{
          type: 'password',
          placeholder: 'Enter password',
          value: password,
          onChangeText: handleChange,
          onBlur: () => validatePassword(password),
        }}
      />
    )
  },
  args: {
    label: 'Password',
    isRequired: true,
    helperText: 'Must be at least 8 characters',
  },
}

/**
 * Complete login form example
 */
export const LoginFormExample: Story = {
  render: () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validateEmail = (value: string) => {
      if (!value) {
        setEmailError('Email is required')
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setEmailError('Please enter a valid email address')
      } else {
        setEmailError('')
      }
    }

    const validatePassword = (value: string) => {
      if (!value) {
        setPasswordError('Password is required')
      } else if (value.length < 8) {
        setPasswordError('Password must be at least 8 characters')
      } else {
        setPasswordError('')
      }
    }

    return (
      <VStack space="md">
        <FormField
          label="Email"
          isRequired
          error={emailError}
          inputProps={{
            type: 'email',
            placeholder: 'email@example.com',
            value: email,
            onChangeText: (value) => {
              setEmail(value)
              validateEmail(value)
            },
            onBlur: () => validateEmail(email),
          }}
        />
        <FormField
          label="Password"
          isRequired
          error={passwordError}
          helperText="Must be at least 8 characters"
          inputProps={{
            type: 'password',
            placeholder: 'Enter password',
            value: password,
            onChangeText: (value) => {
              setPassword(value)
              validatePassword(value)
            },
            onBlur: () => validatePassword(password),
          }}
        />
      </VStack>
    )
  },
}
