module.exports = {
    preset: 'ts-jest/presets/default-esm',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)?$': 'babel-jest'
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    testMatch: [
        '<rootDir>/**/*.spec.(js|jsx|ts|tsx)', '<rootDir>/(test/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
    ],
    globals: {
        'ts-jest': {
            useESM: true
        }
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};