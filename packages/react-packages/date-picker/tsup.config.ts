import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm', 'cjs'],
  external: [/@emotion.*/, 'react'],
  noExternal: [/react-day-picker.*\.css$/],
  dts: true,
  injectStyle: true,
});
