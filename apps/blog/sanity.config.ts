import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { schemaTypes } from './apis/schemas'

export default defineConfig({
  name: 'default',
  title: 'twitter-2-yt-nextjs-clone',

  projectId: 'n322w4lp',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
