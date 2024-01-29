import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'twitter-2-yt-nextjs-clone',

  projectId: 'n322w4lp',
  dataset: 'production',

  plugins: [codeInput(), structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
