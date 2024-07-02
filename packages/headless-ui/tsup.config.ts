/* eslint-disable import/no-default-export, import/no-named-as-default, import/no-named-as-default-member */
import react18Plugin from 'esbuild-plugin-react18'
import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      index: 'index.ts',
    },
    dts: true,
    clean: true,
    minify: false,
    format: ['esm', 'cjs'],
    metafile: true,
    sourcemap: true,
    splitting: false,
    outDir: './dist',
    external: ['react', 'react-dom'],
    esbuildPlugins: [
      react18Plugin(),
      {
        name: 'import-path',
        setup(build) {
          build.onResolve({ filter: /^\.\/components|hooks\/*/ }, args => {
            if (args.importer.endsWith('/packages/ui/index.ts')) {
              return {
                path:
                  args.path +
                  (build.initialOptions.format === 'esm'
                    ? '/index.mjs'
                    : '/index.js'),
                external: true,
              }
            }
            return {}
          })
        },
      },
    ],
  },
])
