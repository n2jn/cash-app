import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, InputField, InputSlot, InputIcon } from '@cash-app/ui'
import { useState } from 'react'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'rounded', 'underlined'],
      description: 'The visual style variant of the input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the input',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the input is in an invalid/error state',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

/**
 * Default input with outline variant
 */
export const Default: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField placeholder="Enter text..." />
    </Input>
  ),
  args: {
    variant: 'outline',
    size: 'md',
  },
}

/**
 * Email input for login forms
 */
export const Email: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField type="email" placeholder="email@example.com" />
    </Input>
  ),
  args: {
    variant: 'outline',
    size: 'md',
  },
}

/**
 * Password input with hidden text
 */
export const Password: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField type="password" placeholder="Enter password" />
    </Input>
  ),
  args: {
    variant: 'outline',
    size: 'md',
  },
}

/**
 * Small size variant
 */
export const Small: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField placeholder="Small input" />
    </Input>
  ),
  args: {
    size: 'sm',
    variant: 'outline',
  },
}

/**
 * Medium size variant (default)
 */
export const Medium: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField placeholder="Medium input" />
    </Input>
  ),
  args: {
    size: 'md',
    variant: 'outline',
  },
}

/**
 * Large size variant
 */
export const Large: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField placeholder="Large input" />
    </Input>
  ),
  args: {
    size: 'lg',
    variant: 'outline',
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField placeholder="Disabled input" />
    </Input>
  ),
  args: {
    isDisabled: true,
    variant: 'outline',
    size: 'md',
  },
}

/**
 * Invalid/Error state
 */
export const Invalid: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField placeholder="Invalid input" />
    </Input>
  ),
  args: {
    isInvalid: true,
    variant: 'outline',
    size: 'md',
  },
}

/**
 * Read-only state
 */
export const ReadOnly: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField value="Read-only value" />
    </Input>
  ),
  args: {
    isReadOnly: true,
    variant: 'outline',
    size: 'md',
  },
}

/**
 * Controlled input with state
 */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <div>
        <Input {...args}>
          <InputField
            value={value}
            onChangeText={setValue}
            placeholder="Type something..."
          />
        </Input>
        <p style={{ marginTop: 8, fontSize: 14, color: '#666' }}>
          Value: {value}
        </p>
      </div>
    )
  },
  args: {
    variant: 'outline',
    size: 'md',
  },
}

/**
 * Rounded variant
 */
export const Rounded: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField placeholder="Rounded input" />
    </Input>
  ),
  args: {
    variant: 'rounded',
    size: 'md',
  },
}

/**
 * Underlined variant
 */
export const Underlined: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField placeholder="Underlined input" />
    </Input>
  ),
  args: {
    variant: 'underlined',
    size: 'md',
  },
}

/**
 * With focus and custom styling
 */
export const WithFocus: Story = {
  render: (args) => (
    <Input {...args}>
      <InputField placeholder="Focus this input" />
    </Input>
  ),
  args: {
    variant: 'outline',
    size: 'md',
  },
}

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input size="sm">
        <InputField placeholder="Small" />
      </Input>
      <Input size="md">
        <InputField placeholder="Medium" />
      </Input>
      <Input size="lg">
        <InputField placeholder="Large" />
      </Input>
      <Input size="xl">
        <InputField placeholder="Extra Large" />
      </Input>
    </div>
  ),
}

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input variant="outline">
        <InputField placeholder="Outline variant" />
      </Input>
      <Input variant="rounded">
        <InputField placeholder="Rounded variant" />
      </Input>
      <Input variant="underlined">
        <InputField placeholder="Underlined variant" />
      </Input>
    </div>
  ),
}
