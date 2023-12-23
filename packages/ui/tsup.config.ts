/* eslint-disable import/no-default-export, import/no-named-as-default, import/no-named-as-default-member */
import glob from 'glob'
import { defineConfig } from 'tsup'

import react18Plugin from 'esbuild-plugin-react18'

export default defineConfig([
  {
    entry: {
      ...glob.sync('components/**/*/index.tsx').reduce((obj, path) => {
        return {
          ...obj,
          [path.replace(/\.tsx$/, '')]: path,
        }
      }, {}),
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
          build.onResolve({ filter: /^\.\/components\/*/ }, args => {
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
