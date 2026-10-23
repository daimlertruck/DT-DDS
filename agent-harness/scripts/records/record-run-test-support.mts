// Shared fixtures for the record-run tests (not a test file).

import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { RunRecord } from './record-json.mts';
import type { FakeCommand } from '../lib/test-support.mts';

const script = fileURLToPath(new URL('./record-run.mts', import.meta.url));

const RUN_LOG = `# Run log — #42 Example change

Base: 0123456789abcdef0123456789abcdef01234567

## Gate decisions

| gate | presented | decided | decision | snapshot | note |
|---|---|---|---|---|---|
| G1 | 2026-01-05T09:00:00Z | 2026-01-05T09:30:00Z | approve | snapshots/01-G1-context-bundle.md · sha256:aaaaaaaaaaaaaaaa | consent recorded |
| G4 | 2026-01-05T11:00:00Z | 2026-01-05T11:05:00Z | approve | snapshots/02-G4-commits.txt · sha256:bbbbbbbbbbbbbbbb | clean: yes |
| G5 | 2026-01-05T12:00:00Z | 2026-01-05T13:00:00Z | revise: reword the summary \\| keep the checklist | — | clean: no (checklist pending) |
| G5 (loop 1) | 2026-01-05T13:10:00Z | 2026-01-05T13:20:00Z | approve | — | presented clean: no; after the check clean: yes |
| G5 (loop 2) | 2026-01-05T13:30:00Z | 2026-01-05T13:40:00Z | approve | — | clean: yes after the replay; presented clean: no (replay pending) |
| G7 | 2026-01-05T14:00:00Z | 2026-01-05T15:00:00Z | approve | — | handed off |

## Dispatches

| stage | started | wall time (s) | model | requests | uncached_in | cache_write | cache_read | output | predicted_usd | reported_usd | final_context | status line |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ds-gather-context | 2026-01-05T08:50:00Z | 600 | claude-sonnet-5-5 | 20 | 40 | 60000 | 1200000 | 9000 | 0.570080 | 0.570080 | 95000 | PASS |
| ds-gather-context | 2026-01-05T08:50:00Z | — | claude-haiku-4-5 | — | 1500 | 12000 | 40000 | 90 | 0.029950 | 0.029950 | — | — |
| ds-implement-plan | 2026-01-05T10:00:00Z | 3000 | claude-opus-5-5 | 60 | 120 | 200000 | 6000000 | 40000 | 3.600480 | 3.600480 | 180000 | PASS |
| ds-implement-plan (continuation) | 2026-01-05T11:10:00Z | 500 | claude-opus-5-5 | 10 | 20 | 30000 | 1500000 | 5000 | 0.640080 | 0.640080 | 190000 | PASS |
| ds-verify-changes | 2026-01-05T11:30:00Z | 900 | — | — | — | — | — | — | — | — | — | FAIL — no JSON result (claude exit 1) |
| ds-code-review | 2026-01-05T13:00:00Z | 400 | claude-sonnet-5-5 | 15 | 30 | 50000 | 700000 | 6000 | 0.400060 | 0.400060 | 80000 | PASS |
| ds-code-review (continuation) | 2026-01-05T14:10:00Z | 9000 (incl. wait for human) | claude-sonnet-5-5 | 5 | 10 | 10000 | 300000 | 2000 | 0.120020 | 0.120020 | 85000 | PASS |

## Human actions between gates

| when (UTC start and end) | kind | action | before → after (HEAD, tree) | evidence | evidence made stale |
|---|---|---|---|---|---|
| 2026-01-05T11:06:00Z – 2026-01-05T11:08:00Z | history | autosquash | 1111111 → 2222222 | reflog rebase (finish) | none |
| 2026-01-05T12:30:00Z – 2026-01-05T12:50:00Z | check | Storybook checklist, 4/4 items | — | per-item answers | — |
`;

export const WORK_FILES: Readonly<Record<string, string>> = {
  'run-log.md': RUN_LOG,
  'context-bundle.md': '# Context bundle\n',
  'implementation-plan.md': '# Plan\n',
  'pr-draft.md': '# PR draft\n',
  'issue-follow-up.md': '# Follow-up draft\n',
  'logs/step.log': 'step output\n',
  'probe.sh': '#!/bin/sh\n',
  'probe.log': 'probe output\n',
  'sandbox-clone/package.json': '{}\n',
};

type PullRequestState = 'OPEN' | 'MERGED';

export const prNode = (
  state: PullRequestState,
  extra: Readonly<Record<string, unknown>> = {}
): Readonly<Record<string, unknown>> => ({
  number: 77,
  state,
  url: 'https://github.com/daimlertruck/DT-DDS/pull/77',
  createdAt: '2026-01-06T10:00:00Z',
  mergedAt: state === 'MERGED' ? '2026-01-08T10:00:00Z' : null,
  headRefName: 'fix/42/example-change',
  headRefOid: '4444444444444444444444444444444444444444',
  reviews: {
    totalCount: 2,
    nodes: [{ comments: { totalCount: 3 } }, { comments: { totalCount: 0 } }],
  },
  forcePushes: { filteredCount: 0 },
  commits: {
    nodes: [
      {
        commit: {
          oid: '5555555',
          committedDate: '2026-01-06T09:00:00Z',
          statusCheckRollup: { state: 'FAILURE' },
        },
      },
      {
        commit: {
          oid: '6666666',
          committedDate: '2026-01-06T09:30:00Z',
          statusCheckRollup: { state: 'SUCCESS' },
        },
      },
      {
        commit: {
          oid: '7777777',
          committedDate: '2026-01-07T09:00:00Z',
          statusCheckRollup: { state: 'SUCCESS' },
        },
      },
    ],
  },
  ...extra,
});

export const issueWith = (...nodes: readonly unknown[]): string =>
  JSON.stringify({
    data: {
      repository: { issue: { closedByPullRequestsReferences: { nodes } } },
    },
  });

export const run = (
  root: string,
  gh: FakeCommand,
  ...args: readonly string[]
): SpawnSyncReturns<string> =>
  spawnSync('node', [script, ...args, '--root', root], {
    encoding: 'utf8',
    env: gh.env,
  });

export const recordDir = (
  root: string,
  id: string,
  records = '.local/agent-harness/runs'
) => join(root, records, id);
export const readRecord = (root: string, id: string): RunRecord =>
  JSON.parse(readFileSync(join(recordDir(root, id), 'record.json'), 'utf8'));
