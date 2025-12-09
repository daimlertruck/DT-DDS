import { Theme as CustomTheme } from '@dt-dds/themes';

export * from './src';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
