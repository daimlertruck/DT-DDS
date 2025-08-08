import { Theme as CustomTheme } from '@dt-dds/react-core';

export * from './src';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
