module.exports = {
  // Test environment
  testEnvironment: 'jsdom',

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Module paths
  roots: ['<rootDir>/src'],

  // Transform files with babel-jest
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.(test|spec).(js|jsx)',
    '**/*.(test|spec).(js|jsx)',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.stories.{js,jsx}',
    '!src/index.js',
    '!**/node_modules/**',
  ],

  // Module file extensions
  moduleFileExtensions: ['js', 'jsx'],

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/es/', '/dist/'],
};
