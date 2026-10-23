// What a run record reads from GitHub's JSON: the pull request, from one read-only GraphQL query,
// and the issue's type label.

import { isRecord } from '../lib/json.mts';

const REPO_OWNER = 'daimlertruck';
const REPO_NAME = 'DT-DDS';

// On a timeline filtered by `itemTypes`, `totalCount` still counts every item; `filteredCount`
// counts the matching ones.
const PR_FIELDS = `number state url createdAt mergedAt headRefName headRefOid
  reviews(first: 100) { totalCount nodes { comments { totalCount } } }
  forcePushes: timelineItems(itemTypes: [HEAD_REF_FORCE_PUSHED_EVENT]) { filteredCount }
  commits(first: 100) { nodes { commit { oid committedDate statusCheckRollup { state } } } }`;

export const ISSUE_QUERY = `query($owner: String!, $name: String!, $number: Int!) {
  repository(owner: $owner, name: $name) {
    issue(number: $number) {
      closedByPullRequestsReferences(first: 20, includeClosedPrs: true) { nodes { ${PR_FIELDS} } }
    }
  }
}`;

export const PR_QUERY = `query($owner: String!, $name: String!, $number: Int!) {
  repository(owner: $owner, name: $name) { pullRequest(number: $number) { ${PR_FIELDS} } }
}`;

// The `gh` arguments that run `query` for issue or pull request `number`.
export const graphqlArgsOf = (
  query: string,
  number: string
): readonly string[] => [
  'api',
  'graphql',
  '-f',
  `query=${query}`,
  '-F',
  `owner=${REPO_OWNER}`,
  '-F',
  `name=${REPO_NAME}`,
  '-F',
  `number=${number}`,
];

export interface Commit {
  readonly committedDate: string | null;
  readonly ciState: string | null;
}

export interface Reviews {
  readonly totalCount: number | null;
  readonly comments: readonly number[];
}

// The pull request as the GraphQL query reads it; a field GitHub left out is null.
export interface PullRequest {
  readonly number: number;
  readonly state: string;
  readonly createdAt: string | null;
  readonly mergedAt: string | null;
  readonly headRefName: string | null;
  readonly headRefOid: string | null;
  readonly reviews: Reviews | null;
  readonly forcePushes: number | null;
  readonly commits: readonly Commit[];
}

const at = (value: unknown, ...keys: readonly string[]): unknown =>
  keys.reduce<unknown>(
    (node, key) => (isRecord(node) ? node[key] : undefined),
    value
  );
const listAt = (
  value: unknown,
  ...keys: readonly string[]
): readonly unknown[] => {
  const list = at(value, ...keys);
  return Array.isArray(list) ? list : [];
};
const stringOrNull = (value: unknown): string | null =>
  typeof value === 'string' ? value : null;
const numberOrNull = (value: unknown): number | null =>
  typeof value === 'number' ? value : null;

// ISSUE_QUERY's pull request nodes: those that close the issue.
export const closingNodesOf = (response: unknown): readonly unknown[] =>
  listAt(
    response,
    'data',
    'repository',
    'issue',
    'closedByPullRequestsReferences',
    'nodes'
  );

// PR_QUERY's pull request node; null or undefined when there is none.
export const pullRequestNodeOf = (response: unknown): unknown =>
  at(response, 'data', 'repository', 'pullRequest');

// A pull request node from gh's JSON; null when it is not one.
export const pullRequestOf = (value: unknown): PullRequest | null => {
  if (
    !isRecord(value) ||
    typeof value.number !== 'number' ||
    typeof value.state !== 'string'
  ) {
    return null;
  }
  return {
    number: value.number,
    state: value.state,
    createdAt: stringOrNull(value.createdAt),
    mergedAt: stringOrNull(value.mergedAt),
    headRefName: stringOrNull(value.headRefName),
    headRefOid: stringOrNull(value.headRefOid),
    reviews: isRecord(value.reviews)
      ? {
          totalCount: numberOrNull(value.reviews.totalCount),
          comments: listAt(value.reviews, 'nodes').flatMap((node) => {
            const count = at(node, 'comments', 'totalCount');
            return typeof count === 'number' ? [count] : [];
          }),
        }
      : null,
    forcePushes: numberOrNull(at(value, 'forcePushes', 'filteredCount')),
    commits: listAt(value, 'commits', 'nodes').map((node) => ({
      committedDate: stringOrNull(at(node, 'commit', 'committedDate')),
      ciState: stringOrNull(at(node, 'commit', 'statusCheckRollup', 'state')),
    })),
  };
};

export const pickPullRequest = (
  prs: readonly PullRequest[]
): PullRequest | null =>
  prs.find(({ state }) => state === 'MERGED') ??
  prs.find(({ state }) => state === 'OPEN') ??
  prs.at(-1) ??
  null;

// The issue's type:* label in its issue.json snapshot.
export const issueTypeOf = (issueJson: unknown): string | undefined =>
  listAt(issueJson, 'labels')
    .map((label) => stringOrNull(at(label, 'name'))?.match(/^type:(.+)$/)?.[1])
    .find(Boolean);
