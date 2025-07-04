module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // For JS/JSX
    '^.+\\.(ts|tsx)$': 'ts-jest',   // For TS/TSX
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat these extensions as ESM
  transformIgnorePatterns: ['/node_modules/(?!.*(\\.mjs|\\.js)$)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  testMatch: ['<rootDir>/tests/**/*.(spec|test).{ts,tsx,js,jsx}'],
  testEnvironmentOptions: { url: 'http://localhost' },
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
