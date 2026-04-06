import customConfig from 'eslint-config-custom';

export default [
  ...customConfig,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
];
