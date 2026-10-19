import customConfig from 'eslint-config-custom';

export default [
  ...customConfig,
  {
    // Harness scripts read their environment directly: they are not turbo tasks.
    rules: { 'turbo/no-undeclared-env-vars': 'off' },
  },
];
