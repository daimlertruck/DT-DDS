import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.test.ts'],
  outDir: 'dist',
  platform: 'node',
  treeshake: true,
  splitting: false,
  sourcemap: 'inline',
  clean: true,
  bundle: false,
  target: 'node16',
  format: 'cjs',
  dts: true,
  tsconfig: 'tsconfig.json',
});
