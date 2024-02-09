const config = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
  testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx)'],
}

export default config
