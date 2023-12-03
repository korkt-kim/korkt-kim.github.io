/* eslint-disable no-undef */
module.exports = {
  root: true,
  extends: ['custom/next'],
  overrides: [
    {
      files: ['sanity.config.ts', 'sanity.cli.ts'],
      rules: {
        'import/no-default-export': 0,
        'import/prefer-default-export': 2,
      },
    },
  ],
}
