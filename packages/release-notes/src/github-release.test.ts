import { execFileSync } from 'child_process';

import { beforeEach, describe, expect, it } from '@jest/globals';

import {
  compareVersions,
  isLatest,
  isStable,
  publishGitHubRelease,
} from './github-release';

jest.mock('child_process');

const REPO = 'https://github.com/daimlertruck/DT-DDS';
const TAGGED_AT = '1795774000';
const FIX_SHA = 'f1f1f1f1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const CHORE_SHA = 'c0c0c0c0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

interface Repo {
  tags?: string[];
  tagsAfterFetch?: number;
  previous?: Record<string, string>;
  commits?: Array<[sha: string, subject: string]>;
  release?: 'missing' | 'exists' | 'error';
  failPulls?: boolean;
}

const notFound = () =>
  Object.assign(new Error('Command failed: gh release view'), {
    stderr: 'release not found\n',
  });

const arrangeRepo = ({
  tags = ['@dt-dds/react@1.0.0-beta.380', '@dt-dds/react@1.0.0'],
  tagsAfterFetch = 0,
  previous = {
    '@dt-dds/react@1.0.0^': '@dt-dds/react@1.0.0-beta.380',
    '@dt-dds/react@1.0.1^': '@dt-dds/react@1.0.0',
    '@dt-dds/react@1.4.1^': '@dt-dds/react@1.4.0',
    '@dt-dds/react@2.0.0^': '@dt-dds/react@1.4.0',
  },
  commits = [
    [FIX_SHA, 'fix(button): keep focus ring'],
    [CHORE_SHA, 'chore(release): version packages'],
  ],
  release = 'missing',
  failPulls = false,
}: Repo = {}) => {
  jest.resetAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  let fetches = 0;

  jest.mocked(execFileSync).mockImplementation((command, args = []) => {
    const [first, second] = args;
    if (command === 'gh' && first === 'release' && second === 'view') {
      if (release === 'exists') return '{"tagName":"x"}';
      if (release === 'error') throw new Error('HTTP 401: Bad credentials');
      throw notFound();
    }
    if (command === 'gh' && first === 'api') {
      if (failPulls) throw new Error('HTTP 429: rate limit exceeded');
      return JSON.stringify([{ number: 341, merged_at: '2026-11-20' }]);
    }
    if (command === 'gh') return '';
    if (first === 'rev-parse') {
      if (fetches >= tagsAfterFetch) return 'abc\n';
      throw new Error('Command failed: git rev-parse');
    }
    if (first === 'fetch') {
      fetches += 1;
      return '';
    }
    if (first === 'describe') {
      const target = args[args.length - 1];
      if (target in previous) return `${previous[target]}\n`;
      throw new Error('fatal: No names found');
    }
    if (first === 'tag') return tags.join('\n');
    if (first === 'log' && second === '-1') return `${TAGGED_AT}\n`;
    return commits.map(([sha, subject]) => `${sha}\x1f${subject}`).join('\n');
  });
};

const calls = () => jest.mocked(execFileSync).mock.calls;

const ghCalls = (subcommand: string) =>
  calls()
    .filter(([command]) => command === 'gh')
    .map(([, args = []]) => args)
    .filter((args) => args.slice(0, 2).join(' ') === subcommand);

const gitCalls = (subcommand: string) =>
  calls()
    .filter(
      ([command, args = []]) => command === 'git' && args[0] === subcommand
    )
    .map(([, args]) => args);

const noSleep = jest.fn(() => Promise.resolve());

const publish = (version: string, dryRun = false) =>
  publishGitHubRelease({ version, dryRun, sleep: noSleep });

describe('version helpers', () => {
  it.each([
    ['1.0.0', true],
    ['12.3.4', true],
    ['1.0.0-beta.380', false],
    ['1.0', false],
  ])('should tell whether %s is stable', (version, stable) => {
    expect(isStable(version)).toBe(stable);
  });

  it('should compare versions numerically', () => {
    expect(compareVersions('1.10.0', '1.9.0')).toBeGreaterThan(0);
    expect(compareVersions('1.4.1', '2.0.0')).toBeLessThan(0);
    expect(compareVersions('2.0.0', '2.0.0')).toBe(0);
  });

  it('should mark the highest stable version as latest', () => {
    const tags = ['@dt-dds/react@1.4.1', '@dt-dds/react@3.0.0-beta.1'];

    expect(isLatest('2.0.0', [...tags, '@dt-dds/react@2.0.0'])).toBe(true);
    expect(isLatest('1.4.1', [...tags, '@dt-dds/react@2.0.0'])).toBe(false);
  });
});

describe('publishGitHubRelease', () => {
  beforeEach(() => {
    arrangeRepo();
    noSleep.mockClear();
  });

  it('should create no Release and run no command for a beta', async () => {
    await publish('1.0.0-beta.380');

    expect(execFileSync).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      '@dt-dds/react@1.0.0-beta.380: prerelease, no GitHub Release'
    );
  });

  it('should create one Release on the tag of a stable version', async () => {
    await publish('1.0.0');

    const creates = ghCalls('release create');
    expect(creates).toHaveLength(1);
    const [args] = creates;
    expect(args.slice(0, 6)).toEqual([
      'release',
      'create',
      '@dt-dds/react@1.0.0',
      '--verify-tag',
      '--title',
      '@dt-dds/react@1.0.0',
    ]);
    expect(args[6]).toBe('--notes');
    expect(args[7]).toBe(
      [
        `Released on 2026-11-27. [Compare with @dt-dds/react@1.0.0-beta.380](${REPO}/compare/@dt-dds/react@1.0.0-beta.380...@dt-dds/react@1.0.0).`,
        '',
        '### Fixed',
        '',
        `- button: keep focus ring ([#341](${REPO}/pull/341))`,
      ].join('\n')
    );
    expect(args[8]).toBe('--latest');
  });

  it('should write the notes of the range since the previous umbrella tag', async () => {
    arrangeRepo({
      tags: ['@dt-dds/react@1.0.0', '@dt-dds/react@1.0.1'],
    });

    await publish('1.0.1');

    expect(gitCalls('describe')).toEqual([
      [
        'describe',
        '--tags',
        '--abbrev=0',
        '--match',
        '@dt-dds/react@*',
        '@dt-dds/react@1.0.1^',
      ],
    ]);
    expect(gitCalls('log')).toContainEqual([
      'log',
      '--format=%H%x1f%s',
      '@dt-dds/react@1.0.0..@dt-dds/react@1.0.1',
    ]);
    expect(ghCalls('release create')).toHaveLength(1);
  });

  it('should look up the PR of listed commits only', async () => {
    await publish('1.0.0');

    const lookups = calls().filter(
      ([command, args = []]) => command === 'gh' && args[0] === 'api'
    );
    expect(lookups.map(([, args = []]) => args[1])).toEqual([
      `repos/daimlertruck/DT-DDS/commits/${FIX_SHA}/pulls`,
    ]);
  });

  it('should link the commit and warn when the PR lookup fails', async () => {
    arrangeRepo({ failPulls: true });

    await publish('1.0.0');

    const [args] = ghCalls('release create');
    expect(args[7]).toContain(
      `- button: keep focus ring ([f1f1f1f](${REPO}/commit/${FIX_SHA}))`
    );
    expect(console.warn).toHaveBeenCalledWith(
      `PR lookup failed for ${FIX_SHA}: HTTP 429: rate limit exceeded`
    );
  });

  it('should list all history when there is no previous umbrella tag', async () => {
    arrangeRepo({ previous: {} });

    await publish('1.0.0');

    expect(gitCalls('log')).toContainEqual([
      'log',
      '--format=%H%x1f%s',
      '@dt-dds/react@1.0.0',
    ]);
    const [args] = ghCalls('release create');
    expect(args[7].split('\n')[0]).toBe('Released on 2026-11-27.');
  });

  it('should leave an existing Release untouched', async () => {
    arrangeRepo({ release: 'exists' });

    await publish('1.0.0');

    expect(ghCalls('release create')).toEqual([]);
    expect(ghCalls('release edit')).toEqual([]);
    expect(console.log).toHaveBeenCalledWith(
      '@dt-dds/react@1.0.0: GitHub Release exists, left unchanged'
    );
  });

  it('should fail when gh cannot tell whether the Release exists', async () => {
    arrangeRepo({ release: 'error' });

    await expect(publish('1.0.0')).rejects.toThrow('HTTP 401: Bad credentials');
    expect(ghCalls('release create')).toEqual([]);
  });

  it('should not mark a previous-major patch as latest', async () => {
    arrangeRepo({
      tags: [
        '@dt-dds/react@1.4.0',
        '@dt-dds/react@2.0.0',
        '@dt-dds/react@1.4.1',
      ],
    });

    await publish('1.4.1');

    const [args] = ghCalls('release create');
    expect(args[args.length - 1]).toBe('--latest=false');
  });

  it('should mark the newest major as latest', async () => {
    arrangeRepo({
      tags: ['@dt-dds/react@1.4.0', '@dt-dds/react@2.0.0'],
    });

    await publish('2.0.0');

    const [args] = ghCalls('release create');
    expect(args[args.length - 1]).toBe('--latest');
  });

  it('should fail when the tag is still missing after 6 attempts', async () => {
    arrangeRepo({ tagsAfterFetch: 99 });

    await expect(publish('1.0.0')).rejects.toThrow(
      'Tag @dt-dds/react@1.0.0 not found on origin'
    );
    expect(gitCalls('rev-parse')).toHaveLength(6);
    expect(gitCalls('fetch')).toEqual(
      Array(5).fill(['fetch', 'origin', '--tags'])
    );
    expect(noSleep).toHaveBeenCalledTimes(5);
    expect(noSleep).toHaveBeenCalledWith(10_000);
    expect(ghCalls('release create')).toEqual([]);
  });

  it('should go on when the tag appears on the second attempt', async () => {
    arrangeRepo({ tagsAfterFetch: 1 });

    await publish('1.0.0');

    expect(gitCalls('rev-parse')).toEqual([
      ['rev-parse', '--verify', '--quiet', 'refs/tags/@dt-dds/react@1.0.0'],
      ['rev-parse', '--verify', '--quiet', 'refs/tags/@dt-dds/react@1.0.0'],
    ]);
    expect(ghCalls('release create')).toHaveLength(1);
  });

  it('should print the decision, body and command in a dry run without gh', async () => {
    await publish('1.0.0', true);

    expect(calls().filter(([command]) => command === 'gh')).toEqual([]);
    const printed = jest
      .mocked(console.log)
      .mock.calls.map(([line]) => String(line))
      .join('\n');
    expect(printed).toContain('@dt-dds/react@1.0.0: GitHub Release, latest');
    expect(printed).toContain(
      `- button: keep focus ring ([f1f1f1f](${REPO}/commit/${FIX_SHA}))`
    );
    expect(printed).toContain(
      'gh release create @dt-dds/react@1.0.0 --verify-tag'
    );
  });

  it('should preview a beta body in a dry run without gh', async () => {
    arrangeRepo({
      previous: {
        '@dt-dds/react@1.0.0-beta.380^': '@dt-dds/react@1.0.0-beta.379',
      },
    });

    await publish('1.0.0-beta.380', true);

    expect(calls().filter(([command]) => command === 'gh')).toEqual([]);
    const printed = jest
      .mocked(console.log)
      .mock.calls.map(([line]) => String(line))
      .join('\n');
    expect(printed).toContain(
      '@dt-dds/react@1.0.0-beta.380: prerelease, no GitHub Release'
    );
    expect(printed).toContain('[Compare with @dt-dds/react@1.0.0-beta.379]');
  });
});
