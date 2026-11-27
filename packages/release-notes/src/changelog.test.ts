import { execFileSync } from 'child_process';

import { beforeEach, describe, expect, it } from '@jest/globals';

import changelog, { createChangelog } from './changelog';

import type {
  ModCompWithPackage,
  NewChangesetWithCommit,
} from '@changesets/types';

jest.mock('child_process');

const REPO = 'https://github.com/daimlertruck/DT-DDS';
const SHA = '1111111aaaaaaabbbbbbbcccccccdddddddeeee';
const OLDER_SHA = '2222222aaaaaaabbbbbbbcccccccdddddddeeee';

interface History {
  commits?: Array<[sha: string, subject: string]>;
  pulls?: unknown;
  failGit?: boolean;
  failGh?: boolean;
}

const arrangeHistory = ({
  commits = [[SHA, 'fix(button): x']],
  pulls = [{ number: 341, merged_at: '2026-11-20T10:00:00Z' }],
  failGit = false,
  failGh = false,
}: History = {}) => {
  jest.resetAllMocks();
  jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  jest.mocked(execFileSync).mockImplementation((command, args = []) => {
    if (command === 'git') {
      if (failGit) throw new Error('fatal: No names found');
      if (args[0] === 'describe') return '@dt-dds/react@1.0.0\n';
      return commits.map(([sha, subject]) => `${sha}\x1f${subject}`).join('\n');
    }
    if (failGh) throw new Error('HTTP 403');
    return JSON.stringify(pulls);
  });
};

const changeset = (
  summary: string,
  commit?: string
): NewChangesetWithCommit => ({
  id: 'some-changeset',
  summary,
  releases: [{ name: '@dt-dds/react-button', type: 'patch' }],
  ...(commit === undefined ? {} : { commit }),
});

const calls = (command: string) =>
  jest.mocked(execFileSync).mock.calls.filter(([cmd]) => cmd === command);

const dependency = (name: string): ModCompWithPackage => ({
  name,
  type: 'patch',
  oldVersion: '1.0.0',
  newVersion: '1.0.1',
  changesets: [],
  packageJson: { name, version: '1.0.1' },
  dir: `/repo/packages/${name}`,
});

describe('changelog', () => {
  beforeEach(() => {
    arrangeHistory();
  });

  it('should resolve an empty line for updated dependencies', async () => {
    const line = await changelog.getDependencyReleaseLine(
      [changeset('fix(button): x')],
      [dependency('a'), dependency('b'), dependency('c')],
      null
    );

    expect(line).toBe('');
  });

  it('should write no Updated dependencies line for a release with a dependency bump', async () => {
    const { getReleaseLine, getDependencyReleaseLine } = createChangelog();
    const lines = [
      await getReleaseLine(changeset('fix(button): x'), 'patch', null),
      await getDependencyReleaseLine(
        [changeset('fix(button): x')],
        [dependency('@dt-dds/react-core')],
        null
      ),
    ].join('\n');

    expect(lines).not.toContain('Updated dependencies');
  });

  it('should link the PR of the commit with the same subject', async () => {
    const line = await createChangelog().getReleaseLine(
      changeset('fix(button): x'),
      'patch',
      null
    );

    expect(line).toBe(`- fix(button): x ([#341](${REPO}/pull/341))`);
    expect(calls('git')[1]).toEqual([
      'git',
      ['log', '--format=%H%x1f%s', '@dt-dds/react@1.0.0..HEAD'],
      { encoding: 'utf8' },
    ]);
    expect(calls('gh')[0][1]).toEqual([
      'api',
      `repos/daimlertruck/DT-DDS/commits/${SHA}/pulls`,
    ]);
  });

  it('should link the newest commit when subjects repeat', async () => {
    arrangeHistory({
      commits: [
        [SHA, 'fix: x'],
        [OLDER_SHA, 'fix: x'],
      ],
      pulls: [],
    });

    const line = await createChangelog().getReleaseLine(
      changeset('fix: x'),
      'patch',
      null
    );

    expect(line).toBe(`- fix: x ([1111111](${REPO}/commit/${SHA}))`);
  });

  it('should use the changeset commit when present', async () => {
    const line = await createChangelog().getReleaseLine(
      changeset('fix: y', OLDER_SHA),
      'patch',
      null
    );

    expect(line).toBe(`- fix: y ([#341](${REPO}/pull/341))`);
    expect(calls('git')).toEqual([]);
    expect(calls('gh')[0][1]).toEqual([
      'api',
      `repos/daimlertruck/DT-DDS/commits/${OLDER_SHA}/pulls`,
    ]);
  });

  it('should take the first merged PR', async () => {
    arrangeHistory({
      pulls: [
        { number: 400, merged_at: null },
        { number: 401, merged_at: '2026-11-20T10:00:00Z' },
      ],
    });

    const line = await createChangelog().getReleaseLine(
      changeset('fix(button): x'),
      'patch',
      null
    );

    expect(line).toBe(`- fix(button): x ([#401](${REPO}/pull/401))`);
  });

  it('should link the commit when no merged PR is found', async () => {
    arrangeHistory({ pulls: [{ number: 400, merged_at: null }] });

    const line = await createChangelog().getReleaseLine(
      changeset('fix(button): x'),
      'patch',
      null
    );

    expect(line).toBe(`- fix(button): x ([1111111](${REPO}/commit/${SHA}))`);
  });

  it('should link the commit when gh fails', async () => {
    arrangeHistory({ failGh: true });

    const line = await createChangelog().getReleaseLine(
      changeset('fix(button): x'),
      'patch',
      null
    );

    expect(line).toBe(`- fix(button): x ([1111111](${REPO}/commit/${SHA}))`);
  });

  it('should warn when the PR lookup fails', async () => {
    arrangeHistory({ failGh: true });

    await createChangelog().getReleaseLine(
      changeset('fix(button): x'),
      'patch',
      null
    );

    expect(console.warn).toHaveBeenCalledWith(
      `PR lookup failed for ${SHA}: HTTP 403`
    );
  });

  it('should write the plain line when git fails', async () => {
    arrangeHistory({ failGit: true });

    const line = await createChangelog().getReleaseLine(
      changeset('fix(button): x'),
      'patch',
      null
    );

    expect(line).toBe('- fix(button): x');
  });

  it('should write the plain line when no commit has the subject', async () => {
    const line = await createChangelog().getReleaseLine(
      changeset('fix: unknown'),
      'patch',
      null
    );

    expect(line).toBe('- fix: unknown');
    expect(calls('gh')).toEqual([]);
  });

  it('should indent the following lines of the summary', async () => {
    const line = await createChangelog().getReleaseLine(
      changeset('fix(button): x\nmore detail  \nlast'),
      'patch',
      null
    );

    expect(line).toBe(
      `- fix(button): x ([#341](${REPO}/pull/341))\n  more detail\n  last`
    );
  });

  it('should call git and gh once per subject across packages', async () => {
    const { getReleaseLine } = createChangelog();

    for (const name of ['a', 'b', 'c']) {
      await getReleaseLine(
        { ...changeset('fix(button): x'), id: name },
        'patch',
        null
      );
    }

    expect(calls('git')).toHaveLength(2);
    expect(calls('gh')).toHaveLength(1);
  });

  it('should run no git or gh call until a line is written', () => {
    createChangelog();

    expect(execFileSync).not.toHaveBeenCalled();
  });
});
