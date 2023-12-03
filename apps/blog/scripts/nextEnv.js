#!/usr/bin/env node
/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const env = process.env.APP_ENV ?? 'development'

const CURRENT = process.cwd()
const { parsed } = dotenv.config({ path: path.join(CURRENT, `.env.${env}`) })

if (!parsed) {
  console.error(`Can't find environment for APP_ENV=${env}`)
  process.exit(1)
}

fs.writeFileSync(
  path.join(CURRENT, 'public/env.js'),
  `window.__ENV = ${JSON.stringify(parsed, undefined, 4)}`
)
