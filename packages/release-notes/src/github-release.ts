import { parseSubject, toSection } from './conventional';
import { commitsInRange, run } from './git';
import { findPullRequest } from './github';
import { renderReleaseBody } from './release-body';

import type { CommitSubject } from './git';
import type { ReleaseCommit } from './release-body';

const UMBRELLA_PACKAGE = '@dt-dds/react';
const UMBRELLA_TAG_PREFIX = `${UMBRELLA_PACKAGE}@`;
const UMBRELLA_TAG_PATTERN = `${UMBRELLA_TAG_PREFIX}*`;

type Sleep = (ms: number) => Promise<void>;

export interface WaitForTagOptions {
  attempts?: number;
  delayMs?: number;
  sleep?: Sleep;
}

export interface PublishOptions {
  version: string;
  dryRun?: boolean;
  sleep?: Sleep;
}

const defaultSleep: Sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const umbrellaTag = (version: string): string =>
  `${UMBRELLA_TAG_PREFIX}${version}`;

export const isStable = (version: string): boolean =>
  /^\d+\.\d+\.\d+$/.test(version);

const numericParts = (version: string): number[] =>
  version.split('.').map((part) => Number.parseInt(part, 10));

export const compareVersions = (a: string, b: string): number => {
  const [left, right] = [numericParts(a), numericParts(b)];
  const index = left.findIndex((part, i) => part !== right[i]);
  return index === -1 ? 0 : left[index] - right[index];
};

export const isLatest = (version: string, tags: string[]): boolean =>
  tags
    .map((tag) => tag.slice(UMBRELLA_TAG_PREFIX.length))
    .filter(isStable)
    .every((other) => compareVersions(other, version) <= 0);

const tagExists = (tag: string): boolean => {
  try {
    run('git', ['rev-parse', '--verify', '--quiet', `refs/tags/${tag}`]);
    return true;
  } catch {
    return false;
  }
};

export const waitForTag = async (
  tag: string,
  {
    attempts = 6,
    delayMs = 10_000,
    sleep = defaultSleep,
  }: WaitForTagOptions = {}
): Promise<void> => {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (attempt > 1) {
      await sleep(delayMs);
      run('git', ['fetch', 'origin', '--tags']);
    }
    if (tagExists(tag)) return;
  }
  throw new Error(`Tag ${tag} not found on origin`);
};

export const previousUmbrellaTag = (tag: string): string | null => {
  try {
    return run('git', [
      'describe',
      '--tags',
      '--abbrev=0',
      '--match',
      UMBRELLA_TAG_PATTERN,
      `${tag}^`,
    ]);
  } catch {
    return null;
  }
};

const errorText = (error: unknown): string => {
  const stderr = (error as { stderr?: unknown }).stderr;
  const message = error instanceof Error ? error.message : '';
  return `${String(stderr ?? '')}\n${message}`;
};

export const releaseExists = (tag: string): boolean => {
  try {
    run('gh', ['release', 'view', tag, '--json', 'tagName']);
    return true;
  } catch (error) {
    if (errorText(error).includes('release not found')) return false;
    throw error;
  }
};

export const tagDate = (tag: string): string => {
  const seconds = Number(run('git', ['log', '-1', '--format=%ct', tag]));
  return new Date(seconds * 1000).toISOString().slice(0, 10);
};

const isListed = ({ subject }: CommitSubject): boolean => {
  const parsed = parseSubject(subject);
  return parsed !== null && toSection(parsed) !== null;
};

const releaseCommits = (
  previousTag: string | null,
  tag: string,
  lookUpPullRequests: boolean
): ReleaseCommit[] =>
  commitsInRange(previousTag === null ? tag : `${previousTag}..${tag}`)
    .filter(isListed)
    .map((commit) => ({
      ...commit,
      pullRequest: lookUpPullRequests ? findPullRequest(commit.sha) : null,
    }));

const umbrellaTags = (): string[] =>
  run('git', ['tag', '--list', UMBRELLA_TAG_PATTERN])
    .split('\n')
    .filter(Boolean);

const quote = (arg: string): string =>
  /^[\w@./=-]+$/.test(arg) ? arg : `'${arg.replace(/'/g, "'\\''")}'`;

export const publishGitHubRelease = async ({
  version,
  dryRun = false,
  sleep = defaultSleep,
}: PublishOptions): Promise<void> => {
  const tag = umbrellaTag(version);
  const stable = isStable(version);

  if (!stable) {
    console.log(`${tag}: prerelease, no GitHub Release`);
    if (!dryRun) return;
  }
  if (!dryRun) {
    await waitForTag(tag, { sleep });
    if (releaseExists(tag)) {
      console.log(`${tag}: GitHub Release exists, left unchanged`);
      return;
    }
  }

  const previousTag = previousUmbrellaTag(tag);
  const body = renderReleaseBody({
    version,
    tag,
    previousTag,
    date: tagDate(tag),
    commits: releaseCommits(previousTag, tag, !dryRun),
  });
  const latest = isLatest(version, umbrellaTags());
  const args = [
    'release',
    'create',
    tag,
    '--verify-tag',
    '--title',
    tag,
    '--notes',
    body,
    latest ? '--latest' : '--latest=false',
  ];

  if (dryRun) {
    const mark = latest ? 'latest' : 'not latest';
    if (stable) console.log(`${tag}: GitHub Release, ${mark}`);
    console.log(body);
    console.log(['gh', ...args].map(quote).join(' '));
    return;
  }

  run('gh', args);
  console.log(`${tag}: GitHub Release created`);
};
