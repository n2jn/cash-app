import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { SocialButton } from '@cash-app/ui'

const meta: Meta<typeof SocialButton> = {
  title: 'Molecules/SocialButton',
  component: SocialButton,
  tags: ['autodocs'],
  argTypes: {
    provider: {
      control: 'select',
      options: ['google', 'twitter', 'github'],
      description: 'The social provider',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
}

export default meta
type Story = StoryObj<typeof SocialButton>

/**
 * Google button
 */
export const Google: Story = {
  args: {
    provider: 'google',
    onPress: () => alert('Google login clicked'),
  },
}

/**
 * Twitter button
 */
export const Twitter: Story = {
  args: {
    provider: 'twitter',
    onPress: () => alert('Twitter login clicked'),
  },
}

/**
 * GitHub button
 */
export const GitHub: Story = {
  args: {
    provider: 'github',
    onPress: () => alert('GitHub login clicked'),
  },
}

/**
 * Disabled
 */
export const Disabled: Story = {
  args: {
    provider: 'google',
    disabled: true,
    onPress: () => {},
  },
}

/**
 * All providers
 */
export const AllProviders: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <SocialButton provider="google" onPress={() => alert('Google')} />
      <SocialButton provider="twitter" onPress={() => alert('Twitter')} />
      <SocialButton provider="github" onPress={() => alert('GitHub')} />
    </div>
  ),
}
