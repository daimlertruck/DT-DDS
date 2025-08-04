/**
 * Formats an object to a string representation
 * without unnecessary quotes
 */
export function formatObject(obj: any, indent = 2): string {
  const spaces = ' '.repeat(indent);
  const lines: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      // Don't quote valid identifiers
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? key
        : `'${key}'`;
      lines.push(`${spaces}${formattedKey}: '${value}',`);
    } else if (typeof value === 'number') {
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? key
        : `'${key}'`;
      lines.push(`${spaces}${formattedKey}: ${value},`);
    } else if (typeof value === 'object' && value !== null) {
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? key
        : `'${key}'`;
      const formattedValue = formatObject(value, indent + 2);
      lines.push(`${spaces}${formattedKey}: ${formattedValue},`);
    } else {
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? key
        : `'${key}'`;
      lines.push(`${spaces}${formattedKey}: ${value},`);
    }
  }

  if (lines.length === 0) {
    return '{}';
  }

  return `{\n${lines.join('\n')}\n${' '.repeat(indent - 2)}}`;
}

/**
 * Formats typography styles for CSS generation
 */
export function formatTypographyStyle(
  fontFamily: string,
  fontSize: string,
  fontWeight: string,
  letterSpacing: string,
  lineHeight: string,
  textDecoration?: string
): string {
  const weight = fontWeight === 'Bold' ? '700' : '400';
  const decoration = textDecoration
    ? `; text-decoration: ${textDecoration}`
    : '';

  return `font-family: ${fontFamily}; font-size: ${fontSize}; font-weight: ${weight}; letter-spacing: ${letterSpacing}; line-height: ${lineHeight}${decoration}`;
}

/**
 * Converts font weight string to number
 */
export function fontWeightToNumber(weight: string): number {
  switch (weight.toLowerCase()) {
    case 'bold':
    case '700':
      return 700;
    case 'semibold':
    case '600':
      return 600;
    case 'medium':
    case '500':
      return 500;
    case 'regular':
    case 'normal':
    case '400':
    default:
      return 400;
  }
}
