module.exports = {
  preset: '@shelf/jest-mongodb',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  watchPathIgnorePatterns: ['globalConfig']
}
