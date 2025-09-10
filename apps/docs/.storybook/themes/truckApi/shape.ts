import { CustomTheme, defaultTheme } from '@dt-dds/react';

const { shape: defaultShape, radius } = defaultTheme;

export const shape: CustomTheme['shape'] = {
  ...defaultShape,
  button: radius.radius_0,
  checkbox: radius.radius_10,
  modal: radius.radius_20,
  emptyState: radius.radius_30,
  dropdown: radius.radius_20,
  message: radius.radius_20,
  progressbar: radius.radius_0,
  accordion: radius.radius_20,
  formField: radius.radius_20,
  tooltip: radius.radius_20,
};
