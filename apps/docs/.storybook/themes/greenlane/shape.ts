import { defaultTheme } from '@dt-dds/react';

const { shape: defaultShape, radius } = defaultTheme;

export const shape = {
  ...defaultShape,
  accordion: radius.radius_40,
  button: radius.radius_70,
  card: radius.radius_40,
  checkbox: radius.radius_10,
  dropdown: radius.radius_20,
  emptyState: radius.radius_40,
  message: radius.radius_40,
  modal: radius.radius_40,
  progressbar: radius.radius_30,
  toast: radius.radius_40,
  formField: radius.radius_30,
  tooltip: radius.radius_20,
  segmentedControl: radius.radius_70,
};
