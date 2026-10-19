import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import {
  WORK_FILES,
  issueWith,
  prNode,
  readRecord,
  recordDir,
  run,
} from './record-run-test-support.mts';
import { createRepo, fakeGh } from '../lib/test-support.mts';

test('outcome fields come from GitHub, which is only read', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  run(root, gh, '42', '--apply');

  const record = readRecord(root, '42');
  assert.equal(record.pr, 77);
  assert.equal(record.branch, 'fix/42/example-change');
  assert.equal(record.head, '4444444444444444444444444444444444444444');
  const { asOf, ...outcome } = record.outcome;
  assert.match(asOf, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  assert.deepEqual(outcome, {
    mergedAt: '2026-01-08T10:00:00Z',
    firstCi: 'success',
    reviewRounds: 2,
    reviewComments: 3,
    commitsAfterPrOpen: 1,
    forcePushes: 0,
    reverts: [],
    laterDefects: [],
  });
  const calls = gh.calls();
  assert.equal(calls.length, 1);
  const [call = ''] = calls;
  assert.match(call, /^api graphql /);
  assert.match(call, /closedByPullRequestsReferences/);
  assert.match(call, /number=42/);
  assert.doesNotMatch(call, /mutation/);
});

test('after a force-push the first CI result and later commits are left for a human to fill', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({
    stdout: issueWith(prNode('MERGED', { forcePushes: { filteredCount: 1 } })),
  });

  run(root, gh, '42', '--apply');

  const { outcome } = readRecord(root, '42');
  assert.equal(outcome.forcePushes, 1);
  assert.equal(outcome.firstCi, null);
  assert.equal(outcome.commitsAfterPrOpen, null);
});

// GitHub's `totalCount` on a timeline filtered by `itemTypes` counts every timeline item (#268: 8
// items, no force push); `filteredCount` counts the force pushes.
test('force pushes come from the filtered count, not the whole timeline', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({
    stdout: issueWith(
      prNode('MERGED', { forcePushes: { totalCount: 8, filteredCount: 0 } })
    ),
  });

  run(root, gh, '42', '--apply');

  const { outcome } = readRecord(root, '42');
  assert.equal(outcome.forcePushes, 0);
  assert.equal(outcome.firstCi, 'success');
  assert.equal(outcome.commitsAfterPrOpen, 1);
  const [call = ''] = gh.calls();
  assert.match(call, /HEAD_REF_FORCE_PUSHED_EVENT\]\) \{ filteredCount \}/);
});

test('a PR work dir is recorded against that pull request', () => {
  const root = createRepo({
    'PR-77': {
      'comment-resolution-plan.md': '# Plan\n',
      'replies.md': '# Replies\n',
    },
  });
  const gh = fakeGh({
    stdout: JSON.stringify({
      data: { repository: { pullRequest: prNode('MERGED') } },
    }),
  });

  const result = run(root, gh, 'PR-77', '--apply');

  assert.equal(result.status, 0, result.stderr);
  const record = readRecord(root, 'PR-77');
  assert.equal(record.issue, null);
  assert.equal(record.pr, 77);
  assert.equal(record.outcome.reviewRounds, 2);
  assert.ok(
    existsSync(
      join(recordDir(root, 'PR-77'), 'artifacts/comment-resolution-plan.md')
    )
  );
  assert.match(gh.calls()[0] ?? '', /pullRequest\(number: \$number\)/);
});

test('fails closed when GitHub cannot be read, writing nothing', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ exitCode: 1 });

  const result = run(root, gh, '42', '--apply');

  assert.equal(result.status, 1);
  assert.match(result.stderr, /cannot read GitHub/);
  assert.equal(existsSync(join(root, '.local/agent-harness/runs')), false);
});

test('a pull request without review or commit data leaves those outcome fields null', () => {
  const root = createRepo({ 42: WORK_FILES });
  const bare = {
    number: 77,
    state: 'MERGED',
    mergedAt: '2026-01-08T10:00:00Z',
    url: 'https://example.invalid/77',
  };
  const gh = fakeGh({ stdout: issueWith(bare) });

  const result = run(root, gh, '42', '--apply');

  assert.equal(result.status, 0, result.stderr);
  const { outcome } = readRecord(root, '42');
  assert.equal(outcome.mergedAt, '2026-01-08T10:00:00Z');
  assert.equal(outcome.reviewRounds, null);
  assert.equal(outcome.reviewComments, null);
  assert.equal(outcome.forcePushes, null);
  assert.equal(outcome.firstCi, null);
});
