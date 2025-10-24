import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { Link, LinkText } from '@cash-app/ui'

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'muted'],
      description: 'The visual variant of the link',
    },
    underline: {
      control: 'boolean',
      description: 'Whether the link should be underlined',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the link is disabled',
    },
  },
}

export default meta
type Story = StoryObj<typeof Link>

/**
 * Primary link (blue)
 */
export const Primary: Story = {
  render: (args) => (
    <Link {...args} onPress={() => alert('Link pressed!')}>
      <LinkText>Sign up</LinkText>
    </Link>
  ),
  args: {
    variant: 'primary',
  },
}

/**
 * Secondary link (black)
 */
export const Secondary: Story = {
  render: (args) => (
    <Link {...args} onPress={() => alert('Link pressed!')}>
      <LinkText>Learn more</LinkText>
    </Link>
  ),
  args: {
    variant: 'secondary',
  },
}

/**
 * Muted link (gray)
 */
export const Muted: Story = {
  render: (args) => (
    <Link {...args} onPress={() => alert('Link pressed!')}>
      <LinkText>Terms of Service</LinkText>
    </Link>
  ),
  args: {
    variant: 'muted',
  },
}

/**
 * Underlined link
 */
export const Underlined: Story = {
  render: (args) => (
    <Link {...args} onPress={() => alert('Link pressed!')}>
      <LinkText>Forgot Password?</LinkText>
    </Link>
  ),
  args: {
    variant: 'primary',
    underline: true,
  },
}

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Link variant="primary" onPress={() => {}}>
        <LinkText>Primary Link</LinkText>
      </Link>
      <Link variant="secondary" onPress={() => {}}>
        <LinkText>Secondary Link</LinkText>
      </Link>
      <Link variant="muted" onPress={() => {}}>
        <LinkText>Muted Link</LinkText>
      </Link>
    </div>
  ),
}
