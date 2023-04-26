module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json', useESM: true }],
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
};
