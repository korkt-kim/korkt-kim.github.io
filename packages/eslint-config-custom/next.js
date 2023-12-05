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
    'plugin:@next/next/recommended',
    'plugin:react-hooks/recommended',
    './baseRules.js',
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@next/next/no-html-link-for-pages': 0,
    'no-use-before-define': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-key': 0,
  },
  overrides: [
    {
      files: ['app{/**,}/{page,layout,error,loading}.{ts,tsx}'],
      rules: {
        'import/no-default-export': 0,
        'import/prefer-default-export': 2,
      },
    },
  ],
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
