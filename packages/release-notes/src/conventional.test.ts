import { describe, expect, it } from '@jest/globals';

import { parseSubject, SECTION_ORDER, toSection } from './conventional';

const sectionOf = (subject: string) => {
  const parsed = parseSubject(subject);
  return parsed === null ? null : toSection(parsed);
};

describe('parseSubject', () => {
  it('should parse the type, scope, bang and description', () => {
    expect(parseSubject('fix(button)!: drop x')).toEqual({
      type: 'fix',
      scope: 'button',
      breaking: true,
      description: 'drop x',
    });
  });

  it('should parse a subject without a scope', () => {
    expect(parseSubject('feat: add x')).toEqual({
      type: 'feat',
      scope: null,
      breaking: false,
      description: 'add x',
    });
  });

  it('should mark a subject with BREAKING CHANGE: as breaking', () => {
    expect(parseSubject('feat: BREAKING CHANGE: drop x')?.breaking).toBe(true);
  });

  it('should return null for a non-conventional subject', () => {
    expect(parseSubject('update stuff')).toBeNull();
  });
});

describe('toSection', () => {
  it('should list the sections in the release notes order', () => {
    expect(SECTION_ORDER).toEqual([
      'Breaking changes',
      'Deprecated',
      'Added',
      'Changed',
      'Fixed',
    ]);
  });

  it.each([
    ['feat!: drop x', 'Breaking changes'],
    ['fix(button)!: drop x', 'Breaking changes'],
    ['feat: BREAKING CHANGE: drop x', 'Breaking changes'],
    ['feat: deprecate size prop', 'Deprecated'],
    ['feat(tabs): Deprecate x', 'Deprecated'],
    ['feat: add x', 'Added'],
    ['perf: speed x', 'Changed'],
    ['fix: x', 'Fixed'],
  ])('should map %s to %s', (subject, section) => {
    expect(sectionOf(subject)).toBe(section);
  });

  it.each([
    'docs: x',
    'chore: x',
    'ci: x',
    'test: x',
    'refactor: x',
    'chore(release): version packages',
    'feature: x',
    'revert: x',
    'fixup! fix: x',
    'update stuff',
  ])('should leave %s out of the notes', (subject) => {
    expect(sectionOf(subject)).toBeNull();
  });
});
