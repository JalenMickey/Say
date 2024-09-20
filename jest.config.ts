import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Transforms TypeScript files using Babel
    '^.+\\.(js|jsx)$': 'babel-jest', // For JavaScript
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|firebase|@firebase))',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Add TypeScript extensions
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};

export default config;
