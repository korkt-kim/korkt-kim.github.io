// This configuration only applies to the package manager root.
// eslint-disable-next-line no-undef
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  }
};
