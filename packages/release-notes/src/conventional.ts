export interface ParsedSubject {
  type: string;
  scope: string | null;
  breaking: boolean;
  description: string;
}

export const SECTION_ORDER = [
  'Breaking changes',
  'Deprecated',
  'Added',
  'Changed',
  'Fixed',
] as const;

export type Section = (typeof SECTION_ORDER)[number];

const SUBJECT_PATTERN =
  /^(?<type>[a-z]+)(?:\((?<scope>[^)]*)\))?(?<bang>!)?: (?<description>.+)$/;

const SECTION_BY_TYPE: Readonly<Record<string, Section>> = {
  feat: 'Added',
  perf: 'Changed',
  fix: 'Fixed',
};

export const parseSubject = (subject: string): ParsedSubject | null => {
  const groups = SUBJECT_PATTERN.exec(subject)?.groups;
  if (!groups) return null;

  return {
    type: groups.type,
    scope: groups.scope ?? null,
    breaking: groups.bang !== undefined || subject.includes('BREAKING CHANGE:'),
    description: groups.description,
  };
};

export const toSection = (parsed: ParsedSubject): Section | null => {
  if (parsed.breaking) return 'Breaking changes';
  if (parsed.type === 'feat' && /^deprecate/i.test(parsed.description)) {
    return 'Deprecated';
  }
  return SECTION_BY_TYPE[parsed.type] ?? null;
};
