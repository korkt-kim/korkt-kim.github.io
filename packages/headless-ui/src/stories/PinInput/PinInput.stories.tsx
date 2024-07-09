import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { PinInput } from './PinInput'

const meta = {
  title: 'Example/PinInput',
  component: PinInput,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    name: { control: 'text' },
    disabled: { control: 'boolean' },
    length: { control: 'number' },
    children: { control: 'text' },
    password: { control: 'boolean' },
  },
} satisfies Meta<typeof PinInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    length: 4,
  },
}

export const Uncontrolled: Story = {
  render: args => (
    <PinInput
      {...args}
      onComplete={value => console.log('complete value: ', value)}
      onChange={value => console.log('current value: ', value)}>
      {args.children}
    </PinInput>
  ),
  args: {
    length: 4,
    children: 'Uncontrolled',
  },
}

// @TODO: 4번째 값 먼저 입력시 1번째에 입력안되도록 로직 재설계
export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')

    return (
      <PinInput
        {...args}
        value={args.value ?? value}
        onChange={value => {
          console.log('current state: ', value)
          setValue(value)
        }}
        onComplete={value => {
          console.log('complete value', value)
          // setValue(value)
        }}>
        {args.children}
      </PinInput>
    )
  },
  args: {
    length: 4,
    children: 'Controlled',
  },
}

export const Disabled: Story = {
  args: { length: 4, disabled: true },
}

export const WithForm: Story = {
  render: args => (
    <form
      onSubmit={e => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`)
        })
      }}>
      <fieldset disabled id='fieldset1'>
        <PinInput
          {...args}
          onChange={value => console.log('current: ', value)}
        />
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
  args: { length: 4, name: 'pininput' },
}
