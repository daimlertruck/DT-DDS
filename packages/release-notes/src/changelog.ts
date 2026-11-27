import { commitsSinceLastTag } from './git';
import { findPullRequest } from './github';
import { commitUrl, pullRequestUrl } from './links';

import type {
  ChangelogFunctions,
  NewChangesetWithCommit,
} from '@changesets/types';

const readCommitsBySubject = (): ReadonlyMap<string, string> => {
  try {
    const oldestFirst = [...commitsSinceLastTag()].reverse();
    return new Map(oldestFirst.map(({ sha, subject }) => [subject, sha]));
  } catch {
    return new Map();
  }
};

const memoise = <Key, Value>(
  compute: (key: Key) => Value
): ((key: Key) => Value) => {
  const cache = new Map<Key, Value>();
  return (key) => {
    if (!cache.has(key)) cache.set(key, compute(key));
    return cache.get(key) as Value;
  };
};

const referenceLink = (sha: string, pullRequest: number | null): string =>
  pullRequest === null
    ? `[${sha.slice(0, 7)}](${commitUrl(sha)})`
    : `[#${pullRequest}](${pullRequestUrl(pullRequest)})`;

export const createChangelog = (): ChangelogFunctions => {
  let commitsBySubject: ReadonlyMap<string, string> | null = null;
  const pullRequestOf = memoise(findPullRequest);

  const commitOf = (changeset: NewChangesetWithCommit, subject: string) => {
    if (changeset.commit) return changeset.commit;
    commitsBySubject ??= readCommitsBySubject();
    return commitsBySubject.get(subject) ?? null;
  };

  const linkOf = (changeset: NewChangesetWithCommit, subject: string) => {
    const sha = commitOf(changeset, subject);
    return sha === null ? null : referenceLink(sha, pullRequestOf(sha));
  };

  return {
    getReleaseLine: async (changeset) => {
      const [subject, ...details] = changeset.summary
        .split('\n')
        .map((line) => line.trimEnd());
      const link = linkOf(changeset, subject);
      const suffix = link === null ? '' : ` (${link})`;
      const indented = details.map((line) => `  ${line}`);
      return [`- ${subject}${suffix}`, ...indented].join('\n');
    },
    getDependencyReleaseLine: async () => '',
  };
};

const changelog = createChangelog();

export default changelog;
