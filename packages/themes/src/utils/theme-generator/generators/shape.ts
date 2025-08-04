import { formatObject } from '../formatter';
import {
  getTokenValue,
  validateRequiredTokens,
  resolveTokenReference,
} from '../tokenUtils';

import { TokenFile, TokenCategory } from './../../../types';

/**
 * Generates shape.ts file content
 */
export function generateShape(tokens: TokenFile, themeName: string): string {
  const shapeTokens = tokens.Shape as TokenCategory;
  if (!shapeTokens) {
    throw new Error(`Missing Shape tokens for theme '${themeName}'`);
  }

  // Validate required shape tokens
  const requiredShapeTokens = [
    'shape-button',
    'shape-checkbox',
    'shape-modal',
    'shape-emptyState',
    'shape-inputFields',
    'shape-messages',
    'shape-toast',
    'shape-tooltip',
    'shape-progressBar',
    'shape-accordion',
    'shape-segmentedControl',
    // New shape tokens
    'shape-avatar',
    'shape-badge',
    'shape-card',
    'shape-container',
    'shape-datepicker',
    'shape-drawer',
    'shape-timepicker',
    'shape-pagination',
    'shape-radioButton',
    'shape-tab',
    'shape-toggle',
    'shape-tag-rounded',
    'shape-tag-squared',
    'shape-switch',
    'shape-definitionList',
    'shape-header',
    'shape-navigationMenu',
    'shape-option',
    'shape-KPIcard',
    'shape-footer',
    'shape-slider',
    'shape-skeleton',
  ];

  validateRequiredTokens(themeName, shapeTokens, requiredShapeTokens);

  const shape: any = {
    // Existing shapes
    button: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-button') || ''
    ),
    checkbox: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-checkbox') || ''
    ),
    modal: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-modal') || ''
    ),
    emptyState: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-emptyState') || ''
    ),
    dropdown: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-inputFields') || ''
    ),
    message: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-messages') || ''
    ),
    toast: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-toast') || ''
    ),
    tooltip: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-tooltip') || ''
    ),
    progressbar: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-progressBar') || ''
    ),
    accordion: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-accordion') || ''
    ),
    formField: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-inputFields') || ''
    ),
    segmentedControl: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-segmentedControl') || ''
    ),
    // New shapes
    avatar: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-avatar') || ''
    ),
    badge: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-badge') || ''
    ),
    card: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-card') || ''
    ),
    container: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-container') || ''
    ),
    datepicker: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-datepicker') || ''
    ),
    drawer: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-drawer') || ''
    ),
    timepicker: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-timepicker') || ''
    ),
    pagination: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-pagination') || ''
    ),
    radioButton: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-radioButton') || ''
    ),
    tab: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-tab') || ''
    ),
    toggle: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-toggle') || ''
    ),
    tagRounded: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-tag-rounded') || ''
    ),
    tagSquared: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-tag-squared') || ''
    ),
    switch: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-switch') || ''
    ),
    definitionList: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-definitionList') || ''
    ),
    header: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-header') || ''
    ),
    navigationMenu: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-navigationMenu') || ''
    ),
    option: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-option') || ''
    ),
    kpiCard: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-KPIcard') || ''
    ),
    footer: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-footer') || ''
    ),
    slider: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-slider') || ''
    ),
    skeleton: resolveTokenReference(
      tokens,
      getTokenValue(shapeTokens, 'shape-skeleton') || ''
    ),
  };

  return `import { CustomTheme as Theme } from '../../types';

export const shape: Theme['shape'] = ${formatObject(shape)} as const;
`;
}
