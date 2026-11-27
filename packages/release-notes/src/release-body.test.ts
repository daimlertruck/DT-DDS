/* eslint-disable turbo/no-undeclared-env-vars -- the tests set the CLI's run-time repository */
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';

import { renderReleaseBody } from './release-body';

import type { ReleaseCommit } from './release-body';

const REPO = 'https://github.com/daimlertruck/DT-DDS';

const commit = (
  subject: string,
  pullRequest: number | null = 1
): ReleaseCommit => ({
  sha: 'abcdef1234567890',
  subject,
  pullRequest,
});

const render = (version: string, commits: ReleaseCommit[]) =>
  renderReleaseBody({
    version,
    tag: `@dt-dds/react@${version}`,
    previousTag: '@dt-dds/react@0.9.0',
    date: '2026-11-27',
    commits,
  });

describe('renderReleaseBody', () => {
  const originalRepository = process.env.GITHUB_REPOSITORY;

  beforeEach(() => {
    delete process.env.GITHUB_REPOSITORY;
  });

  afterEach(() => {
    if (originalRepository === undefined) delete process.env.GITHUB_REPOSITORY;
    else process.env.GITHUB_REPOSITORY = originalRepository;
  });

  it('should start with the date and the compare link', () => {
    expect(render('1.1.0', []).split('\n')[0]).toBe(
      `Released on 2026-11-27. [Compare with @dt-dds/react@0.9.0](${REPO}/compare/@dt-dds/react@0.9.0...@dt-dds/react@1.1.0).`
    );
  });

  it('should write only the date when there is no previous tag', () => {
    const body = renderReleaseBody({
      version: '1.0.0',
      tag: '@dt-dds/react@1.0.0',
      previousTag: null,
      date: '2026-11-27',
      commits: [],
    });

    expect(body.split('\n')[0]).toBe('Released on 2026-11-27.');
  });

  it('should order sections by SECTION_ORDER whatever the commit order', () => {
    const body = render('2.0.0', [
      commit('fix: f'),
      commit('perf: p'),
      commit('feat: a'),
      commit('feat: deprecate d'),
      commit('feat!: b'),
    ]);

    const headings = body.split('\n').filter((line) => line.startsWith('### '));
    expect(headings).toEqual([
      '### Breaking changes',
      '### Deprecated',
      '### Added',
      '### Changed',
      '### Fixed',
    ]);
  });

  it('should omit empty sections and unlisted types', () => {
    const body = render('1.1.0', [commit('fix: f'), commit('chore: c')]);

    expect(body).toBe(
      [
        `Released on 2026-11-27. [Compare with @dt-dds/react@0.9.0](${REPO}/compare/@dt-dds/react@0.9.0...@dt-dds/react@1.1.0).`,
        '',
        '### Fixed',
        '',
        `- f ([#1](${REPO}/pull/1))`,
      ].join('\n')
    );
  });

  it('should link the entry to its PR and prefix the scope', () => {
    expect(render('1.1.0', [commit('fix(button): f', 341)])).toContain(
      `- button: f ([#341](${REPO}/pull/341))`
    );
  });

  it('should link the commit when there is no PR', () => {
    expect(render('1.1.0', [commit('fix: f', null)])).toContain(
      `- f ([abcdef1](${REPO}/commit/abcdef1234567890))`
    );
  });

  it('should use GITHUB_REPOSITORY for links', () => {
    process.env.GITHUB_REPOSITORY = 'someone/scratch';

    expect(render('1.1.0', [commit('fix: f', 2)])).toContain(
      '([#2](https://github.com/someone/scratch/pull/2))'
    );
  });

  it('should write no Changesets headings and no dependency lists', () => {
    const body = render('2.0.0', [
      commit('feat!: b'),
      commit('feat: a'),
      commit('fix: f'),
    ]);

    expect(body).not.toMatch(
      /Updated dependencies|Major Changes|Minor Changes|Patch Changes/
    );
  });

  it('should say there are no listed changes when no subject is listed', () => {
    expect(render('1.1.0', [commit('chore: c')])).toBe(
      [
        `Released on 2026-11-27. [Compare with @dt-dds/react@0.9.0](${REPO}/compare/@dt-dds/react@0.9.0...@dt-dds/react@1.1.0).`,
        '',
        'No listed changes in this release.',
      ].join('\n')
    );
  });

  it.each([
    ['2.0.0', 'feat!: b', '2.0.0'],
    ['1.4.1', 'fix!: b', '2.0.0'],
    ['1.3.0', 'feat: deprecate d', '2.0.0'],
    ['2.0.0', 'feat: deprecate d', '3.0.0'],
  ])(
    'should link %s %s to the %s migration guide',
    (version, subject, major) => {
      expect(render(version, [commit(subject)])).toContain(
        ` [Migration guide](${REPO}/blob/main/docs/upgrading/${major}.md)`
      );
    }
  );

  it.each(['feat: a', 'perf: p', 'fix: f'])(
    'should add no migration link to %s',
    (subject) => {
      expect(render('2.0.0', [commit(subject)])).not.toContain(
        'Migration guide'
      );
    }
  );
});
