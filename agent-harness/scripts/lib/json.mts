// Narrowing for parsed JSON and other untrusted input (a file, a hook payload, a child's output).

export type JsonObject = Readonly<Record<string, unknown>>;

export const isRecord = (value: unknown): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
