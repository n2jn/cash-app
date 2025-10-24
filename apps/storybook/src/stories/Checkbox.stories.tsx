import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'
import { Checkbox, CheckboxIndicator, CheckboxIcon } from '@cash-app/ui'

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the checkbox',
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

/**
 * Default unchecked checkbox
 */
export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox isChecked={checked} onChange={setChecked} value="default">
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
      </Checkbox>
    )
  },
}

/**
 * Checked checkbox
 */
export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true)
    return (
      <Checkbox isChecked={checked} onChange={setChecked} value="checked">
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
      </Checkbox>
    )
  },
}

/**
 * Disabled checkbox
 */
export const Disabled: Story = {
  render: () => (
    <Checkbox isDisabled isChecked={false} value="disabled">
      <CheckboxIndicator>
        <CheckboxIcon />
      </CheckboxIndicator>
    </Checkbox>
  ),
}

/**
 * Disabled checked checkbox
 */
export const DisabledChecked: Story = {
  render: () => (
    <Checkbox isDisabled isChecked={true} value="disabled-checked">
      <CheckboxIndicator>
        <CheckboxIcon />
      </CheckboxIndicator>
    </Checkbox>
  ),
}

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Checkbox size="sm" isChecked={true} value="small">
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
      </Checkbox>
      <Checkbox size="md" isChecked={true} value="medium">
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
      </Checkbox>
      <Checkbox size="lg" isChecked={true} value="large">
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
      </Checkbox>
    </div>
  ),
}
