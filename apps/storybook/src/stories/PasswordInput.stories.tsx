import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'
import { PasswordInput } from '@cash-app/ui'

const meta: Meta<typeof PasswordInput> = {
  title: 'Molecules/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PasswordInput>

/**
 * Default password input
 */
export const Default: Story = {
  render: () => {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    return (
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
    )
  },
}

/**
 * With value
 */
export const WithValue: Story = {
  render: () => {
    const [password, setPassword] = useState('securePassword123')
    const [showPassword, setShowPassword] = useState(false)

    return (
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
    )
  },
}

/**
 * Password visible
 */
export const PasswordVisible: Story = {
  render: () => {
    const [password, setPassword] = useState('securePassword123')
    const [showPassword, setShowPassword] = useState(true)

    return (
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
    )
  },
}

/**
 * With error state
 */
export const WithError: Story = {
  render: () => {
    const [password, setPassword] = useState('123')
    const [showPassword, setShowPassword] = useState(false)

    return (
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
        isInvalid={true}
      />
    )
  },
}

/**
 * Disabled
 */
export const Disabled: Story = {
  render: () => (
    <PasswordInput
      value="password123"
      onChangeText={() => {}}
      placeholder="Enter your password"
      showPassword={false}
      onTogglePassword={() => {}}
      isDisabled={true}
    />
  ),
}
