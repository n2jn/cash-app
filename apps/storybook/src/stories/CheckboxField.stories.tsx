import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'
import { CheckboxField } from '@cash-app/ui'

const meta: Meta<typeof CheckboxField> = {
  title: 'Molecules/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CheckboxField>

/**
 * Default unchecked
 */
export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <CheckboxField
        checked={checked}
        onChange={setChecked}
        label="Remember me"
      />
    )
  },
}

/**
 * Checked
 */
export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true)
    return (
      <CheckboxField
        checked={checked}
        onChange={setChecked}
        label="Remember me"
      />
    )
  },
}

/**
 * Disabled
 */
export const Disabled: Story = {
  render: () => (
    <CheckboxField
      checked={false}
      onChange={() => {}}
      label="Remember me"
      disabled={true}
    />
  ),
}

/**
 * Different labels
 */
export const DifferentLabels: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)
    const [checked3, setChecked3] = useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <CheckboxField
          checked={checked1}
          onChange={setChecked1}
          label="Remember me"
        />
        <CheckboxField
          checked={checked2}
          onChange={setChecked2}
          label="I agree to the terms and conditions"
        />
        <CheckboxField
          checked={checked3}
          onChange={setChecked3}
          label="Subscribe to newsletter"
        />
      </div>
    )
  },
}
