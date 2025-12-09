module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/env',
    [
      '@babel/react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: ['@emotion/babel-plugin'],
};
