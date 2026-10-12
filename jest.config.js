const nextJest = require('next/jest')

const createJestConfig = nextJest({ __dirname })

const customJestConfig = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**',
    '!**/*.d.ts',
    '!src/sw.ts', // Runs in a service worker, outside Jest's DOM environment.
    '!**/node_modules/**',
    '!.next/**',
    '!**/*.js.snap',
    '!**/*.tsx.snap',
    '!**/*_app.js',
    '!**/*_document.js',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleDirectories: ['src', 'node_modules'],
  setupFiles: [
    '<rootDir>/setupTests.ts',
  ],
}

module.exports = createJestConfig(customJestConfig)
