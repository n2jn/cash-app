import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { TextDivider } from '@cash-app/ui'

const meta: Meta<typeof TextDivider> = {
  title: 'Molecules/TextDivider',
  component: TextDivider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextDivider>

/**
 * Default - "OR CONTINUE WITH"
 */
export const Default: Story = {
  args: {
    text: 'OR CONTINUE WITH',
  },
}

/**
 * Simple "OR"
 */
export const SimpleOr: Story = {
  args: {
    text: 'OR',
  },
}

/**
 * Custom text
 */
export const CustomText: Story = {
  args: {
    text: 'MORE OPTIONS',
  },
}

/**
 * Different contexts
 */
export const DifferentContexts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <TextDivider text="OR CONTINUE WITH" />
      <TextDivider text="OR" />
      <TextDivider text="ALSO AVAILABLE" />
      <TextDivider text="MORE OPTIONS" />
    </div>
  ),
}
