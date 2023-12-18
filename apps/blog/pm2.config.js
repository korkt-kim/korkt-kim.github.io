/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      name: '@zakelstorm/blog',
      interpreter: 'none',
      script: 'start.js',
      instances: 1,
      exec_mode: 'cluster_mode',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      out_file: './logs/stdout',
      error_file: './logs/stderr',
      merge_logs: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
