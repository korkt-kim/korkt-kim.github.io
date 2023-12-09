/* eslint-disable import/no-default-export, import/no-named-as-default, import/no-named-as-default-member */
import glob from 'glob'
import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: glob.sync('{*/,}index.ts').reduce(
      (obj, path) => ({
        ...obj,
        [path.split('/')[0].replace(/\.ts$/, '')]: path,
      }),
      {}
    ),
    dts: true,
    clean: true,
    minify: false,
    format: ['esm', 'cjs'],
    metafile: true,
    sourcemap: true,
    splitting: true,
    outDir: './dist',
    external: ['react', 'react-dom'],
    platform: 'browser',
  },
])
