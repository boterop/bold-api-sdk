import globals from 'globals';
import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  {
    ignores: ['coverage/', 'node_modules/'],
  },
  {
    files: ['src/**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    plugins: {
      jest,
      sonarjs,
    },
    rules: {
      complexity: 'error',
      'no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-undef': 'off',
      'no-console': 'error',
      'jest/no-commented-out-tests': 'error',
      'jest/no-disabled-tests': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'error',
      'jest/valid-expect': 'error',
      'no-delete-var': 'error',
      'sonarjs/no-all-duplicated-branches': 'error',
      'sonarjs/no-duplicate-string': 'error',
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/no-identical-conditions': 'error',
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/no-identical-functions': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
    },
  },
];
