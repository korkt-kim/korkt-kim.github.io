module.exports = {
  root: true,
  extends: ['custom/node'],
  globals: {
    NodeJS: true,
  },
  rules: {
    'no-useless-constructor': 0,
    'prefer-const': [1, { destructuring: 'all' }],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
}
