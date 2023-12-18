/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { spawn } = require('child_process')

const args = ['--filter', '@zakelstorm/blog', 'start', '--port', '80']
const options = {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env },
}

const child = spawn('pnpm', args, options)

child.on('exit', code => {
  process.exit(code)
})
