import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'twitter-2-yt-nextjs-clone',

  projectId: 'n322w4lp',
  dataset: 'production',

  plugins: [codeInput(), deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
