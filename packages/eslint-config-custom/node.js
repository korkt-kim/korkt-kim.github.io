module.exports = {
    env: {
      node: true,
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:import/recommended',
      'plugin:import/typescript',
      './baseRules.js',
    ],
    plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
    parser: '@typescript-eslint/parser',
  }
  