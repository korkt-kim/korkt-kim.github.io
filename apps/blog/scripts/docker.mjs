#!/usr/bin/env node
/* eslint-disable no-undef */

import 'zx/globals'

import dayjs from 'dayjs'
import yargs from 'yargs'

const NAME = 'zakelstorm/blog'
const PATH = 'apps/blog'
const REPOSITORY = 'public.ecr.aws/u5t1f8c6'

const args = yargs(process.argv.slice(2))
  .locale('en')
  .usage('docker.mjs <command>')
  .options({
    t: {
      alias: 'tag',
      type: 'string',
      default: dayjs().format('YYMMDD_HHmmss'),
    },
    p: {
      alias: 'phase',
      demandOption: true,
      type: 'string',
      choices: ['development', 'stage', 'production'],
    },
    e: { alias: 'env', type: 'array' },
    c: { alias: 'cache', type: 'boolean', default: false },
    f: { alias: 'file', type: 'string' },
  })

const { t, p, e, c, f } = args.argv
const source = `${NAME}:${t}`
const target = `${REPOSITORY}/${NAME}:${t}`

process.env.FORCE_COLOR = '1'

$`cd ../../
pnpm zakelstorm dk @${NAME} -t ${t} -e ${PATH}/.env.${p} -f apps/blog/${f ? f : 'Dockerfile'} ${
  c ? '' : '--no-cache'
} -y ${(e ?? []).map(v => `-e="${v}"`)}

docker tag ${source} ${target}
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${REPOSITORY}
docker push ${target}`
