module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    process: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    './baseRules.js',
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-use-before-define': 0,
    'no-use-before-define': 0,
    'react/no-unknown-property': [2, { ignore: ['jsx', 'global', 'css'] }],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-key': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
}
