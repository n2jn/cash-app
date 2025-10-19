import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { Button, ButtonText, ButtonSpinner } from '@cash-app/ui'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button',
    },
    action: {
      control: 'select',
      options: ['primary', 'secondary', 'positive', 'negative'],
      description: 'The semantic action/intent of the button',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Primary button - default solid variant
 */
export const Primary: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Primary Button</ButtonText>
    </Button>
  ),
  args: {
    action: 'primary',
    variant: 'solid',
    size: 'md',
  },
}

/**
 * Secondary button
 */
export const Secondary: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Secondary Button</ButtonText>
    </Button>
  ),
  args: {
    action: 'secondary',
    variant: 'solid',
    size: 'md',
  },
}

/**
 * Outline variant
 */
export const Outline: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Outline Button</ButtonText>
    </Button>
  ),
  args: {
    variant: 'outline',
    action: 'primary',
    size: 'md',
  },
}

/**
 * Link variant (text-only)
 */
export const Link: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Link Button</ButtonText>
    </Button>
  ),
  args: {
    variant: 'link',
    action: 'primary',
    size: 'md',
  },
}

/**
 * Small size
 */
export const Small: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Small Button</ButtonText>
    </Button>
  ),
  args: {
    size: 'sm',
    action: 'primary',
  },
}

/**
 * Medium size (default)
 */
export const Medium: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Medium Button</ButtonText>
    </Button>
  ),
  args: {
    size: 'md',
    action: 'primary',
  },
}

/**
 * Large size
 */
export const Large: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Large Button</ButtonText>
    </Button>
  ),
  args: {
    size: 'lg',
    action: 'primary',
  },
}

/**
 * Loading state with spinner
 */
export const Loading: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonSpinner />
      <ButtonText>Loading...</ButtonText>
    </Button>
  ),
  args: {
    isLoading: true,
    action: 'primary',
    size: 'md',
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Disabled Button</ButtonText>
    </Button>
  ),
  args: {
    isDisabled: true,
    action: 'primary',
    size: 'md',
  },
}

/**
 * Positive action (success)
 */
export const Positive: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Success Button</ButtonText>
    </Button>
  ),
  args: {
    action: 'positive',
    size: 'md',
  },
}

/**
 * Negative action (danger/error)
 */
export const Negative: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Danger Button</ButtonText>
    </Button>
  ),
  args: {
    action: 'negative',
    size: 'md',
  },
}

/**
 * Full width button
 */
export const FullWidth: Story = {
  render: (args) => (
    <div style={{ width: '100%' }}>
      <Button {...args} width="$full">
        <ButtonText>Full Width Button</ButtonText>
      </Button>
    </div>
  ),
  args: {
    action: 'primary',
    size: 'md',
  },
}

/**
 * Login button example
 */
export const LoginButton: Story = {
  render: (args) => (
    <Button {...args} width="$full">
      <ButtonText>Login</ButtonText>
    </Button>
  ),
  args: {
    action: 'primary',
    size: 'lg',
  },
}

/**
 * Outline secondary
 */
export const OutlineSecondary: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Outline Secondary</ButtonText>
    </Button>
  ),
  args: {
    variant: 'outline',
    action: 'secondary',
    size: 'md',
  },
}

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Button size="xs">
        <ButtonText>Extra Small</ButtonText>
      </Button>
      <Button size="sm">
        <ButtonText>Small</ButtonText>
      </Button>
      <Button size="md">
        <ButtonText>Medium</ButtonText>
      </Button>
      <Button size="lg">
        <ButtonText>Large</ButtonText>
      </Button>
      <Button size="xl">
        <ButtonText>Extra Large</ButtonText>
      </Button>
    </div>
  ),
}

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="solid">
        <ButtonText>Solid</ButtonText>
      </Button>
      <Button variant="outline">
        <ButtonText>Outline</ButtonText>
      </Button>
      <Button variant="link">
        <ButtonText>Link</ButtonText>
      </Button>
    </div>
  ),
}
