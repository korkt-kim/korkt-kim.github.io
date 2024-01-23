/* eslint-disable @typescript-eslint/no-unused-vars */
import { execSync } from 'child_process'
import dayjs from 'dayjs'
import dotenv from 'dotenv'
import { existsSync, readFileSync } from 'fs'
import inquirer from 'inquirer'
import { compact, isEmpty, trim } from 'lodash-es'
import { join, relative } from 'path'
import type { Argv, BuilderCallback } from 'yargs'
import { chalk } from 'zx'

import { getPackages } from '../util'

interface DKProps {
  scope: string
  name?: string
  tag?: string
  buildEnv?: string[]
  file?: string
  cache?: boolean
  skip?: boolean
}

export const options: [
  command: string,
  description: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  builder: BuilderCallback<any, any>,
] = [
  'dk <scope>',
  '프로젝트 도커라이징',
  y => {
    y.positional('scope', {
      desc: '도커라이징 대상 패키지',
      type: 'string',
    }).options({
      name: {
        alias: 'n',
        desc: '이미지 이름 [기본값: <scope>]',
        type: 'string',
      },
      tag: {
        alias: 't',
        desc: '이미지 태그 [기본값: "yyMMdd_HHmmss"]',
        type: 'string',
      },
      buildEnv: {
        alias: 'e',
        desc: '빌드 환경변수 파일 경로 [기본값: <scope>의 .env]. 혹은 <varname>=<value>형태의 값',
        type: 'string',
        array: true,
      },
      file: {
        alias: 'f',
        desc: 'Dockerfile 위치 [기본값: <scope>의 Dockerfile]',
        type: 'string',
      },
      cache: {
        alias: 'c',
        desc: 'docker 캐시 사용 여부',
        type: 'boolean',
        default: false,
      },
      skip: {
        alias: 'y',
        desc: '모든 프롬프트에 yes로 응답. 바로 빌드를 실행함',
        type: 'boolean',
        default: false,
      },
    })
  },
]

export async function command(parsed: ReturnType<Argv<DKProps>['parseSync']>) {
  const { scope } = parsed

  const packages = getPackages()
  const path = packages.find(o => o.name === scope)?.location

  if (!path) {
    throw new Error(`${scope} 에 해당하는 패키지를 찾을 수 없습니다`)
  }

  const normalizedScopeName = trim(scope.replace(/[^a-zA-Z0-9-]/g, '/'), '/')
  const imageName = parsed.name ?? normalizedScopeName
  const tagName = parsed.tag ?? dayjs().format('YYMMDD_HHmmss')

  let name = `${imageName}:${tagName}`

  const envFilePaths: string[] = []
  const buildEnvParts: string[] = []

  for (const value of parsed.buildEnv ?? []) {
    if (existsSync(value)) {
      envFilePaths.push(value)
      buildEnvParts.push(readFileSync(value).toString('utf8'))

      continue
    }

    const [key, ...values] = value.split('=')
    const _value = values.join('=')

    if (_value.includes('=')) {
      continue
    }

    buildEnvParts.push(`${key}=${_value}`)
  }

  let buildEnv = buildEnvParts.join('\n')

  if (!parsed.skip) {
    const _name = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '이미지',
        default: `${imageName}:${tagName}`,
      },
    ])

    name = _name.name

    const res = await inquirer.prompt([
      {
        type: 'editor',
        name: 'buildEnv',
        message: '빌드 환경변수 확인',
        default: `# 파일 경로: ${envFilePaths.join(', ')}
${buildEnvParts.join('\n') ?? '환경변수 없음'}`,
        waitUserInput: true,
      },
    ])

    buildEnv = res.buildEnv
  }

  const dockerPath =
    parsed.file ?? relative(process.cwd(), join(path, 'Dockerfile'))

  if (!existsSync(dockerPath)) {
    throw new Error(`${scope} 에 해당하는 Dockerfile을 찾을 수 없습니다`)
  }

  let buildArgs: string[] = []

  if (!isEmpty(compact(buildEnvParts))) {
    const env = dotenv.parse(buildEnv)

    buildArgs = Object.entries(env).map(
      ([key, value]) => `--build-arg "${key}=${value}"`
    )
  }

  if (parsed.cache === false) {
    buildArgs.push('--no-cache')
  }

  const needDeleteArgKeys = new Set([
    'scope',
    'name',
    'n',
    'tag',
    't',
    'buildEnv',
    'build-env',
    'e',
    'file',
    'f',
    'cache',
    'c',
    'skip',
    'y',
    '_',
    '$0',
  ])

  for (const key in parsed) {
    if (needDeleteArgKeys.has(key)) {
      continue
    }

    buildArgs.push(`--${key}="${parsed[key]}"`)
  }

  const cmd = `docker build -f ${dockerPath} . -t ${name} ${buildArgs.join(
    ' '
  )} --platform linux/amd64`

  console.log(cmd)

  execSync(cmd, { stdio: 'inherit' })

  console.log(`⚡ "${chalk.yellow(name)}" ${chalk.bold.green('빌드 완료')}`)
}
