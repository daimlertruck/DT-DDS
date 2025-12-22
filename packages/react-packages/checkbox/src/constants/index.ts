import { CheckboxSize } from '../types';

export const SIZES = {
  small: 20,
  large: 24,
} as const;

export const LABEL_HEIGHT_BUFFER = 1;

export const LABEL_LINE_HEIGHT: Record<CheckboxSize, number> = {
  small: 16,
  large: 20,
};
