// eslint-disable-next-line @typescript-eslint/no-require-imports
const { pathsToModuleNameMapper } = require('ts-jest');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { readFileSync } = require('node:fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { resolve } = require('path');

const tsconfigPath = resolve('./tsconfig.json');
const tsconfigContent = readFileSync(tsconfigPath, 'utf-8');
const { compilerOptions } = JSON.parse(tsconfigContent);

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
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
  testRegex: '.spec.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
};
