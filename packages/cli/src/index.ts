#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

import dotenv from 'dotenv'
import { resolve } from 'path'
import yargs from 'yargs'

import * as dk from './cmd/dk'

dotenv.config({ path: resolve(process.cwd(), '.env') })

const args = yargs(process.argv.slice(2))
  .locale('en')
  .usage('zakelstorm <command>')
  .command(...dk.options)
  .demandCommand(1)
  .version(require('../package.json').version)
  .showHelpOnFail(true)

const parsed = await args.argv

try {
  switch (parsed._[0]) {
    case 'dk':
      dk.command(parsed as any)
      break
    default:
      args.showHelp()
  }
} catch (err) {
  console.error(err)
  process.exit(1)
}
