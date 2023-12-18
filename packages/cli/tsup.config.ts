import { copy } from 'esbuild-plugin-copy'
import handlebarsPlugin from 'esbuild-plugin-handlebars'
import { defineConfig } from 'tsup'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  format: 'esm',
  platform: 'node',
  outDir: './dist',
  noExternal: [/handlebars/],
  esbuildPlugins: [
    handlebarsPlugin(),
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./src/cmd/scaffold/templates/**/*'],
        to: ['./dist/scaffoldTemplates'],
      },
    }),
  ],
})
