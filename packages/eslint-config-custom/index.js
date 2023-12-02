module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    globals: {
      process: true,
    },
    extends: ['eslint:recommended', 'prettier', './baseRules.js'],
    plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
    parser: '@typescript-eslint/parser',
  }
  