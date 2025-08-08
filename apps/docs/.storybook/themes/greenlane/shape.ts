import { defaultTheme } from '@dt-dds/themes';

const { shape: defaultShape, radius } = defaultTheme;

export const shape = {
  ...defaultShape,
  accordion: radius['3xs'],
  button: radius.s,
  card: radius['3xs'],
  checkbox: radius['6xs'],
  dropdown: radius['5xs'],
  emptyState: radius['3xs'],
  message: radius['3xs'],
  modal: radius['3xs'],
  progressbar: radius['4xs'],
  toast: radius['3xs'],
  formField: radius['4xs'],
  tooltip: radius['5xs'],
  segmentedControl: radius.s,
};
