import { pathsToModuleNameMapper } from 'ts-jest';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@/*': ['./src/*'],
    },
    {
      prefix: '<rootDir>/',
    },
  ),
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json', // Or tsconfig.json if you didn't create a separate one
      },
    ],
  },
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '^(?!.*\\.e2e-spec\\.ts$).*\\.spec\\.ts$', // exclude end to end tests
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
};
