import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

interface Package {
  location: string
  name: string
  version: string
}

export function getPackages(): Package[] {
  const cwd = process.cwd()

  if (existsSync(resolve(cwd, 'yarn.lock'))) {
    return (
      execSync('yarn workspaces list --json')
        .toString('utf8')
        .trim()
        .split('\n')
        // the first line is the workspace root
        .slice(1)
        .map(json => {
          try {
            const obj = JSON.parse(json)
            const location = resolve(cwd, obj.location)
            const version = JSON.parse(
              readFileSync(resolve(location, 'package.json')).toString('utf8')
            ).version

            return {
              location,
              version,
              name: obj.name,
            }
          } catch {
            return null
          }
        })
        .filter(notEmpty)
    )
  }

  return (
    execSync('pnpm ls -r --depth -1 --long --parseable')
      .toString('utf8')
      .trim()
      .split('\n')
      // the first line is the workspace root
      .slice(1)
      .map(entry => {
        const [location, nameWithVersion] = entry.split(':')
        const index = nameWithVersion.lastIndexOf('@')

        return {
          location,
          version: nameWithVersion.slice(index + 1),
          name: nameWithVersion.slice(0, index),
        }
      })
  )
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function listenTerminating(
  fn: (signal: number) => any,
  events: NodeJS.Signals[] = ['SIGINT', 'SIGBREAK']
): () => void {
  events.forEach(name => process.on(name, fn))
  process.on('exit', fn)

  return () => {
    events.forEach(name => process.off(name, fn))
    process.off('exit', fn)
  }
}
