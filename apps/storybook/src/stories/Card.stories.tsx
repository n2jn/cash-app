import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, Text, Heading, VStack, Box } from '@cash-app/ui'

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined'],
      description: 'The visual variant of the card (shadow or border)',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The padding size inside the card',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

/**
 * Default card with elevated variant (shadow)
 */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Heading size="md" className="mb-2">Card Title</Heading>
      <Text>This is a default card with elevated variant and medium padding.</Text>
    </Card>
  ),
  args: {
    variant: 'elevated',
    padding: 'md',
  },
}

/**
 * Elevated variant with shadow
 */
export const Elevated: Story = {
  render: (args) => (
    <Card {...args}>
      <Heading size="md" className="mb-2">Elevated Card</Heading>
      <Text>This card has a shadow to appear elevated above the background.</Text>
    </Card>
  ),
  args: {
    variant: 'elevated',
    padding: 'md',
  },
}

/**
 * Outlined variant with border
 */
export const Outlined: Story = {
  render: (args) => (
    <Card {...args}>
      <Heading size="md" className="mb-2">Outlined Card</Heading>
      <Text>This card has a border instead of a shadow.</Text>
    </Card>
  ),
  args: {
    variant: 'outlined',
    padding: 'md',
  },
}

/**
 * Small padding
 */
export const SmallPadding: Story = {
  render: (args) => (
    <Card {...args}>
      <Heading size="sm" className="mb-1">Small Padding</Heading>
      <Text size="sm">This card has small padding.</Text>
    </Card>
  ),
  args: {
    variant: 'elevated',
    padding: 'sm',
  },
}

/**
 * Medium padding (default)
 */
export const MediumPadding: Story = {
  render: (args) => (
    <Card {...args}>
      <Heading size="md" className="mb-2">Medium Padding</Heading>
      <Text>This card has medium padding (default).</Text>
    </Card>
  ),
  args: {
    variant: 'elevated',
    padding: 'md',
  },
}

/**
 * Large padding
 */
export const LargePadding: Story = {
  render: (args) => (
    <Card {...args}>
      <Heading size="lg" className="mb-3">Large Padding</Heading>
      <Text>This card has large padding for more spacious content.</Text>
    </Card>
  ),
  args: {
    variant: 'elevated',
    padding: 'lg',
  },
}

/**
 * No padding
 */
export const NoPadding: Story = {
  render: (args) => (
    <Card {...args}>
      <Box p="$4">
        <Heading size="md" mb="$2">No Padding</Heading>
        <Text>This card has no padding by default, but content has its own padding.</Text>
      </Box>
    </Card>
  ),
  args: {
    variant: 'elevated',
    padding: 'none',
  },
}

/**
 * Login form card example
 */
export const LoginFormCard: Story = {
  render: (args) => (
    <Card {...args} maxWidth="$96" mx="auto">
      <VStack space="md">
        <Heading size="xl">Sign In</Heading>
        <Text color="$textLight500">
          Enter your credentials to access your account
        </Text>
        <Box
          height={80}
          backgroundColor="#F8F8F8"
          borderRadius="$md"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="$textLight500">Form fields placeholder</Text>
        </Box>
      </VStack>
    </Card>
  ),
  args: {
    variant: 'elevated',
    padding: 'lg',
  },
}

/**
 * Content card with sections
 */
export const ContentCard: Story = {
  render: (args) => (
    <Card {...args}>
      <VStack space="md">
        <Box>
          <Heading size="lg" mb="$2">Transaction Details</Heading>
          <Text color="$textLight500">Payment to John Doe</Text>
        </Box>
        <Box borderTopWidth={1} borderColor="#E0E0E0" pt="$4">
          <Text fontWeight="$semibold" mb="$1">Amount</Text>
          <Text fontSize="$2xl" color="$primary500">$125.00</Text>
        </Box>
        <Box borderTopWidth={1} borderColor="#E0E0E0" pt="$4">
          <Text fontWeight="$semibold" mb="$1">Date</Text>
          <Text>October 19, 2025</Text>
        </Box>
      </VStack>
    </Card>
  ),
  args: {
    variant: 'elevated',
    padding: 'lg',
  },
}

/**
 * Outlined card for secondary content
 */
export const OutlinedSecondary: Story = {
  render: (args) => (
    <Card {...args}>
      <VStack space="sm">
        <Heading size="md">Information</Heading>
        <Text color="$textLight500">
          This is a secondary card using outlined variant for less visual prominence.
        </Text>
      </VStack>
    </Card>
  ),
  args: {
    variant: 'outlined',
    padding: 'md',
  },
}

/**
 * Card grid layout
 */
export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <Card variant="elevated" padding="md">
          <Heading size="md" mb="$2">Card 1</Heading>
          <Text>First card in grid</Text>
        </Card>
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <Card variant="elevated" padding="md">
          <Heading size="md" mb="$2">Card 2</Heading>
          <Text>Second card in grid</Text>
        </Card>
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <Card variant="outlined" padding="md">
          <Heading size="md" mb="$2">Card 3</Heading>
          <Text>Third card in grid</Text>
        </Card>
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <Card variant="outlined" padding="md">
          <Heading size="md" mb="$2">Card 4</Heading>
          <Text>Fourth card in grid</Text>
        </Card>
      </div>
    </div>
  ),
}

/**
 * Full width card
 */
export const FullWidth: Story = {
  render: (args) => (
    <Card {...args} width="$full">
      <Heading size="lg" mb="$2">Full Width Card</Heading>
      <Text>This card spans the full width of its container.</Text>
    </Card>
  ),
  args: {
    variant: 'elevated',
    padding: 'lg',
  },
}

/**
 * Comparison of variants
 */
export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card variant="elevated" padding="md">
        <Heading size="md" mb="$2">Elevated Variant</Heading>
        <Text>Uses shadow for depth</Text>
      </Card>
      <Card variant="outlined" padding="md">
        <Heading size="md" mb="$2">Outlined Variant</Heading>
        <Text>Uses border for separation</Text>
      </Card>
    </div>
  ),
}
