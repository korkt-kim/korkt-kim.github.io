import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Checkbox } from './Checkbox'

const meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    name: { control: 'text' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Uncontrolled: Story = {
  render: args => (
    <Checkbox
      {...args}
      onChange={({ checked, indeterminate }) =>
        console.log('current state: ', checked, indeterminate)
      }>
      {args.children}
    </Checkbox>
  ),
  args: {
    children: 'Uncontrolled',
  },
}

export const Controlled: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(false)

    return (
      <Checkbox
        {...args}
        checked={args.checked ?? checked}
        onChange={({ checked, indeterminate }) => {
          console.log('current state: ', checked, indeterminate)
          setChecked(checked)
        }}>
        {args.children}
      </Checkbox>
    )
  },
  args: {
    children: 'Controlled',
  },
}

export const Indeterminate: Story = {
  args: { indeterminate: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const WithForm: Story = {
  render: args => (
    <form
      onSubmit={e => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const checkbox = form.elements.namedItem('checkbox') as HTMLInputElement
        const isChecked = checkbox.checked
        const isIndeterminate = checkbox.indeterminate

        console.log(
          'checked: ',
          isChecked,
          'indeterminate: ',
          isIndeterminate,
          '\n',
          e
        )
      }}>
      <fieldset disabled id='fieldset1'>
        <Checkbox {...args}>
          The checkbox is {args.checked ? 'checked' : 'unchecked'}
        </Checkbox>
      </fieldset>

      <button type='submit'>submit</button>
      <button
        onClick={() =>
          ((
            document.querySelector('#fieldset1') as HTMLFieldSetElement
          ).disabled = !(
            document.querySelector('#fieldset1') as HTMLFieldSetElement
          ).disabled)
        }>
        toggle fieldset
      </button>
    </form>
  ),
  args: { name: 'checkbox' },
}
