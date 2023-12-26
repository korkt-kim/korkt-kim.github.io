import { Meta, StoryObj } from '@storybook/react'

import { Typo } from './index'

const meta: Meta<typeof Typo.Text> = {
  title: 'Typo',
  component: Typo.Text,
}

export default meta

export const Text: StoryObj<typeof Typo.Text> = {
  render: arg => <Typo.Text>Text</Typo.Text>,
}

export const Link: StoryObj<typeof Typo.Link> = {
  parameters: {
    component: Typo.Link,
  },
  args: { href: '/' },
  render: arg => <Typo.Link {...arg}>Link</Typo.Link>,
}

export const Title: StoryObj<typeof Typo.Title> = {
  parameters: {
    component: Typo.Title,
  },
  args: { level: 1 },
  render: arg => <Typo.Title {...arg}>Title</Typo.Title>,
}
