import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { Icon } from '@cash-app/ui'

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['eye', 'eye-off', 'google', 'twitter', 'github'],
      description: 'The icon to display',
    },
    size: {
      control: 'number',
      description: 'The size of the icon in pixels',
    },
    color: {
      control: 'color',
      description: 'The color of the icon',
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

/**
 * Eye icon (password visible)
 */
export const Eye: Story = {
  args: {
    name: 'eye',
    size: 24,
    color: '#737373',
  },
}

/**
 * Eye-off icon (password hidden)
 */
export const EyeOff: Story = {
  args: {
    name: 'eye-off',
    size: 24,
    color: '#737373',
  },
}

/**
 * Google icon
 */
export const Google: Story = {
  args: {
    name: 'google',
    size: 24,
    color: '#DB4437',
  },
}

/**
 * Twitter icon
 */
export const Twitter: Story = {
  args: {
    name: 'twitter',
    size: 24,
    color: '#1DA1F2',
  },
}

/**
 * GitHub icon
 */
export const GitHub: Story = {
  args: {
    name: 'github',
    size: 24,
    color: '#333333',
  },
}

/**
 * All icons comparison
 */
export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Icon name="eye" size={24} color="#737373" />
      <Icon name="eye-off" size={24} color="#737373" />
      <Icon name="google" size={24} color="#DB4437" />
      <Icon name="twitter" size={24} color="#1DA1F2" />
      <Icon name="github" size={24} color="#333333" />
    </div>
  ),
}

/**
 * Different sizes
 */
export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Icon name="google" size={16} color="#DB4437" />
      <Icon name="google" size={24} color="#DB4437" />
      <Icon name="google" size={32} color="#DB4437" />
      <Icon name="google" size={48} color="#DB4437" />
    </div>
  ),
}
