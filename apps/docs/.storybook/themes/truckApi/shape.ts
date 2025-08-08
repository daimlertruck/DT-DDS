import { CustomTheme, defaultTheme } from '@dt-dds/themes';

const { shape: defaultShape, radius } = defaultTheme;

export const shape: CustomTheme['shape'] = {
  ...defaultShape,
  button: radius['none'],
  checkbox: radius['6xs'],
  modal: radius['5xs'],
  emptyState: radius['4xs'],
  dropdown: radius['5xs'],
  message: radius['5xs'],
  progressbar: radius['none'],
  accordion: radius['5xs'],
  formField: radius['5xs'],
  tooltip: radius['5xs'],
};
