import { TokenFile } from '../../../types';
import { formatObject } from '../formatter';
import { resolveTokenReference } from '../tokenUtils';

// All available component keys from the token file
const COMPONENT_KEYS = [
  'Accordion',
  'Avatar',
  'Backdrop',
  'Badge',
  'Button',
  'Breadcrumb',
  'Card',
  'Checkbox',
  'Container',
  'Datepicker',
  'Definition_list',
  'Drawer',
  'Empty_state',
  'Footer',
  'Header',
  'Icons',
  'Link',
  'Loading_spinner',
  'Messages',
  'Modal',
  'Navigation_menu',
  'Number_field',
  'Option',
  'Pagination',
  'Progress_bar',
  'Radio_button',
  'Search_Field',
  'Segmented_control',
  'Select_Field',
  'Slider',
  'Stepper',
  'Skeleton',
  'Tab',
  'Tag',
  'Table',
  'Text_Field',
  'Textarea',
  'Timepicker',
  'Toast_messages',
  'Toggle',
  'Tooltip',
] as const;

type ComponentKey = (typeof COMPONENT_KEYS)[number];

export function generateComponents(tokens: TokenFile): string {
  const components = processAllComponents(tokens);
  return generateComponentsCode(components);
}

function processAllComponents(tokens: TokenFile): Record<string, unknown> {
  return Object.entries(tokens)
    .filter(isComponentEntry)
    .map(([key, value]) => [toCamelCase(key), value] as const)
    .reduce<Record<string, unknown>>(
      (acc, [componentName, componentTokens]) => {
        acc[componentName] = processComponentTokens(componentTokens, tokens);
        return acc;
      },
      {}
    );
}

/**
 * Check if an entry is a component (not metadata)
 */
function isComponentEntry(
  entry: [string, unknown]
): entry is [ComponentKey, unknown] {
  const [key] = entry;
  return (
    key !== '$schema' &&
    key !== '$themes' &&
    COMPONENT_KEYS.includes(key as ComponentKey)
  );
}

function processComponentTokens(
  componentTokens: unknown,
  allTokens: TokenFile
): Record<string, unknown> {
  const processed: Record<string, unknown> = {};

  if (!componentTokens || typeof componentTokens !== 'object') {
    return processed;
  }

  for (const [tokenKey, tokenValue] of Object.entries(componentTokens)) {
    if (
      tokenValue &&
      typeof tokenValue === 'object' &&
      '$value' in tokenValue
    ) {
      // Handle direct token values
      const processedKey = toCamelCase(tokenKey);
      const tokenValueStr = String(tokenValue.$value);

      // Check if it's a direct value (hex, number, etc.) or a token reference
      let processedValue: string;
      if (isDirectValue(tokenValueStr)) {
        processedValue = tokenValueStr;
      } else {
        processedValue = resolveTokenReference(allTokens, tokenValueStr);
      }

      processed[processedKey] = processedValue;
    } else if (tokenValue && typeof tokenValue === 'object') {
      // Handle nested objects (like Avatar.Letter, Button.Primary, etc.)
      const nestedKey = toCamelCase(tokenKey);
      processed[nestedKey] = processComponentTokens(tokenValue, allTokens);
    }
  }

  return processed;
}

function generateComponentsCode(components: Record<string, unknown>): string {
  const componentsCode = Object.entries(components)
    .map(([name, tokens]) =>
      generateComponentCode(name, tokens as Record<string, unknown>)
    )
    .join(',\n');

  return `export const components = {\n${componentsCode}\n};`;
}

function generateComponentCode(
  name: string,
  tokens: Record<string, unknown>
): string {
  const tokensStr = formatObject(tokens, 2);
  return `  ${name}: ${tokensStr}`;
}

/**
 * Checks if a value is a direct primitive value (hex, number, etc.)
 */
function isDirectValue(value: string): boolean {
  return (
    value.startsWith('#') ||
    !isNaN(Number(value)) ||
    value.includes('px') ||
    value.includes('rem') ||
    /\bem\b/.test(value) ||
    value.includes('%') ||
    value === 'inherit' ||
    value === 'transparent' ||
    value === 'none'
  );
}

function toCamelCase(str: string): string {
  return str
    .replace(/[\[\]]/g, '')
    .replace(/[-_\s:]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^(.)/, (_, chr) => chr.toLowerCase());
}
