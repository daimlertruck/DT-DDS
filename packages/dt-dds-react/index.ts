import '@emotion/react';
import { CustomTheme } from '@dt-dds/themes';
// Core styles
export * from './core';

//independent component packages
export * from '@dt-dds/react-accordion';
export * from '@dt-dds/react-avatar';
export * from '@dt-dds/react-backdrop';
export * from '@dt-dds/react-box';
export * from '@dt-dds/react-breadcrumb';
export * from '@dt-dds/react-core';
export * from '@dt-dds/react-divider';
export * from '@dt-dds/react-drawer';
export * from '@dt-dds/react-empty-state';
export * from '@dt-dds/react-icon';
export * from '@dt-dds/react-label-field';
export * from '@dt-dds/react-message';
export * from '@dt-dds/react-spinner';
export * from '@dt-dds/react-tabs';
export * from '@dt-dds/react-tag';
export * from '@dt-dds/react-toast';
export * from '@dt-dds/react-tooltip';
export * from '@dt-dds/react-message';
export * from '@dt-dds/react-breadcrumb';
export * from '@dt-dds/react-tag';
export * from '@dt-dds/react-tabs';
export * from '@dt-dds/react-spinner';
export * from '@dt-dds/react-accordion';
export * from '@dt-dds/react-checkbox';
export * from '@dt-dds/react-text-field';
export * from '@dt-dds/react-label-field';
export * from '@dt-dds/react-table';
export * from '@dt-dds/react-typography';
export * from '@dt-dds/react-button';
export * from '@dt-dds/react-progress-bar';
export * from '@dt-dds/react-select';
export * from '@dt-dds/react-stepper';
export * from '@dt-dds/react-radio';
export * from '@dt-dds/react-modal';
export * from '@dt-dds/react-card';
export * from '@dt-dds/react-segmented-control';
export * from '@dt-dds/react-dropdown';
export * from '@dt-dds/react-toggle';
export * from '@dt-dds/react-date-picker';
export * from '@dt-dds/react-text-area';
export * from '@dt-dds/react-form';
export * from '@dt-dds/react-pagination';
export * from '@dt-dds/react-icon-button';
export * from '@dt-dds/react-link';
export * from '@dt-dds/themes';
export { defaultTheme as theme } from '@dt-dds/themes';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
