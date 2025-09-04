const { resolve } = require('node:path');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'turbo',
    'prettier',
    ...['@vercel/style-guide/eslint/react'].map(require.resolve),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  ignorePatterns: [
    'dist/**',
    'node_modules/**',
    'jest-coverage/**',
    'coverage/**',
    '*.config.js',
    '*.config.ts',
    'build/**',
    '.next/**',
    '.turbo/**',
  ],
  rules: {
    'eol-last': [2, 'always'],
    semi: [2, 'always'],
    quotes: [2, 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-single'],
    'no-html-link-for-pages': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/no-anonymous-default-export': 'off',
    'prettier/prettier': 'error',
    'no-multiple-empty-lines': ['error'],
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react/no-unescaped-entities': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: false,
      },
    ],
  },
};
