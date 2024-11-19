// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './', // The root of your Next.js project
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jsdom', // Since we're testing React components, use jsdom
  moduleNameMapper: {
    // ...
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
