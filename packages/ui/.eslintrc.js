/* eslint-disable no-undef */
module.exports = {
  root: true,
  env: { jest: true },
  extends: ['custom/react', 'plugin:storybook/recommended'],
  overrides: {
    files: ['*.stories.tsx', 'tsup.config.ts', 'interop.ts'],
    rules: {
      'import/no-default-export': 0,
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
    },
  },
}
