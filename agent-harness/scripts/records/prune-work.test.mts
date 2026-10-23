import assert from 'node:assert/strict';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  createRepo,
  fakeGh,
  issueClosedBy,
  pullRequest,
  type FakeCommand,
} from '../lib/test-support.mts';

const script = fileURLToPath(new URL('./prune-work.mts', import.meta.url));
const recordScript = fileURLToPath(
  new URL('./record-run.mts', import.meta.url)
);

const PIPELINE_FILES = {
  'run-log.md': '# Run log — issue #154\n',
  'context-bundle.md': '# Context bundle\n',
  'assets/manifest.md': '# Assets\n',
};

const run = (
  root: string,
  gh: FakeCommand,
  ...args: readonly string[]
): SpawnSyncReturns<string> =>
  spawnSync('node', [script, ...args, '--root', root], {
    encoding: 'utf8',
    env: gh.env,
  });

const workDir = (root: string, id: string): string =>
  join(root, '.local/agent-harness/work', id);
const recordOf = (
  root: string,
  id: string,
  records = '.local/agent-harness/runs'
) => join(root, records, id);
const PIPELINE_BYTES = Object.values(PIPELINE_FILES).reduce(
  (total, content) => total + Buffer.byteLength(content),
  0
);

const record = (root: string, id: string, ...args: readonly string[]): void => {
  const gh = fakeGh({
    stdout: id.startsWith('PR-')
      ? JSON.stringify({
          data: {
            repository: {
              pullRequest: pullRequest(Number(id.slice(3)), 'MERGED'),
            },
          },
        })
      : issueClosedBy(pullRequest(244, 'MERGED')),
  });
  const result = spawnSync(
    'node',
    [recordScript, id, '--apply', ...args, '--root', root],
    { encoding: 'utf8', env: gh.env }
  );
  assert.equal(result.status, 0, result.stderr);
};

test('dry run verifies the record, reports the delete plan with its size and changes nothing', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  record(root, '154');
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'MERGED')) });

  const result = run(root, gh, '154');

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /#154: PR #244 merged 2026-09-30T10:00:00Z/);
  assert.match(
    result.stdout,
    /record .local\/agent-harness\/runs\/154 verified \(2 files\)/
  );
  assert.match(
    result.stdout,
    new RegExp(
      `delete .local/agent-harness/work/154 \\(3 files, ${PIPELINE_BYTES} bytes\\)`
    )
  );
  assert.match(result.stdout, /dry run: nothing changed; re-run with --apply/);
  assert.ok(existsSync(join(workDir(root, '154'), 'run-log.md')));
});

test('apply deletes the work dir once every linked PR is merged and the record is verified', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  record(root, '154');
  const gh = fakeGh({
    stdout: issueClosedBy(
      pullRequest(240, 'MERGED'),
      pullRequest(244, 'MERGED')
    ),
  });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(workDir(root, '154')), false);
  assert.match(
    result.stdout,
    new RegExp(
      `deleted .local/agent-harness/work/154 \\(3 files, ${PIPELINE_BYTES} bytes\\)`
    )
  );
  assert.equal(
    readFileSync(join(recordOf(root, '154'), 'artifacts/run-log.md'), 'utf8'),
    '# Run log — issue #154\n'
  );
  assert.equal(
    existsSync(join(root, '.local/agent-harness/work/_runs')),
    false
  );
});

test('refuses without a record and leaves the work dir intact', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'MERGED')) });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /no record for 154 in .local\/agent-harness\/runs; run record-run.mts 154 --apply first/
  );
  assert.ok(existsSync(join(workDir(root, '154'), 'run-log.md')));
});

test('refuses when a recorded file changed after recording', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  record(root, '154');
  writeFileSync(
    join(workDir(root, '154'), 'context-bundle.md'),
    '# Context bundle, edited\n'
  );
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'MERGED')) });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /artifacts\/context-bundle.md differs from its record copy/
  );
  assert.ok(existsSync(workDir(root, '154')));
});

test('refuses when a record copy was changed or removed after recording', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  record(root, '154');
  writeFileSync(
    join(recordOf(root, '154'), 'artifacts/run-log.md'),
    '# edited copy\n'
  );
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'MERGED')) });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /artifacts\/run-log.md differs from its record copy/
  );
  assert.ok(existsSync(workDir(root, '154')));
});

test('refuses when the work dir holds a file the record does not', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  record(root, '154');
  mkdirSync(join(workDir(root, '154'), 'snapshots'));
  writeFileSync(
    join(workDir(root, '154'), 'snapshots/09-G7-pr-draft.md'),
    '# Draft as presented\n'
  );
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'MERGED')) });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /snapshots\/09-G7-pr-draft.md is not in the record/
  );
  assert.ok(existsSync(workDir(root, '154')));
});

test('--records reads the record from another dir, never one under .local/agent-harness/work', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  record(root, '154', '--records', 'elsewhere/runs');
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'MERGED')) });

  const inside = run(
    root,
    gh,
    '154',
    '--apply',
    '--records',
    '.local/agent-harness/work/154/records'
  );
  const elsewhere = run(root, gh, '154', '--records', 'elsewhere/runs');

  assert.equal(inside.status, 2);
  assert.match(
    inside.stderr,
    /the records dir must be outside .local\/agent-harness\/work/
  );
  assert.equal(elsewhere.status, 0, elsewhere.stderr);
  assert.match(elsewhere.stdout, /record elsewhere\/runs\/154 verified/);
});

test('GitHub is only read: one GraphQL query for the issue, no mutation', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  record(root, '154');
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'MERGED')) });

  run(root, gh, '154', '--apply');

  const calls = gh.calls();
  assert.equal(calls.length, 1);
  const [call = ''] = calls;
  assert.match(call, /^api graphql /);
  assert.match(call, /closedByPullRequestsReferences/);
  assert.match(call, /number=154/);
  assert.doesNotMatch(call, /mutation/);
});

test('refuses while a linked PR is still open and leaves the work dir intact', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'OPEN')) });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(result.stderr, /PR #244 still open/);
  assert.ok(existsSync(join(workDir(root, '154'), 'run-log.md')));
});

test('refuses when one linked PR is merged but another is still open', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  const gh = fakeGh({
    stdout: issueClosedBy(pullRequest(240, 'MERGED'), pullRequest(244, 'OPEN')),
  });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(result.stderr, /PR #244 still open/);
  assert.ok(existsSync(workDir(root, '154')));
});

test('refuses when no pull request closes the issue', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  const gh = fakeGh({ stdout: issueClosedBy() });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(result.stderr, /no pull request closes #154/);
  assert.ok(existsSync(workDir(root, '154')));
});

test('refuses when the linked PRs were closed without merging', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'CLOSED')) });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(result.stderr, /no linked pull request was merged/);
  assert.ok(existsSync(workDir(root, '154')));
});

test('fails closed when GitHub cannot be read', () => {
  const root = createRepo({ 154: PIPELINE_FILES });
  const gh = fakeGh({ exitCode: 1 });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(result.stderr, /cannot read PR state from GitHub/);
  assert.match(result.stderr, /HTTP 502/);
  assert.ok(existsSync(workDir(root, '154')));
});

test('a PR work dir is checked against that PR and pruned once it is merged and recorded', () => {
  const root = createRepo({
    'PR-244': { 'comment-resolution-plan.md': '# Plan\n' },
  });
  record(root, 'PR-244');
  const gh = fakeGh({ stdout: JSON.stringify(pullRequest(244, 'MERGED')) });

  const result = run(root, gh, 'PR-244', '--apply');

  assert.equal(result.status, 0, result.stderr);
  assert.match(gh.calls()[0] ?? '', /^pr view 244 /);
  assert.match(
    result.stdout,
    /record .local\/agent-harness\/runs\/PR-244 verified \(1 file\)/
  );
  assert.equal(existsSync(workDir(root, 'PR-244')), false);
});

test('rejects anything that is not an issue or PR work dir id, without calling GitHub', () => {
  const root = createRepo({
    154: PIPELINE_FILES,
    acceptance: { 'spec-drawer.md': '# Spec\n' },
  });
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'MERGED')) });

  ['../154', '154/..', '_runs', 'acceptance', 'PR-', ''].forEach((id) => {
    const result = run(root, gh, id, '--apply');

    assert.equal(result.status, 2, `id ${JSON.stringify(id)}`);
    assert.match(result.stderr, /usage: /);
  });
  assert.deepEqual(gh.calls(), []);
  assert.ok(existsSync(workDir(root, '154')));
  assert.ok(existsSync(workDir(root, 'acceptance')));
});

test('refuses a work dir that does not exist, without calling GitHub', () => {
  const root = createRepo({});
  const gh = fakeGh({ stdout: issueClosedBy(pullRequest(244, 'MERGED')) });

  const result = run(root, gh, '154', '--apply');

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /.local\/agent-harness\/work\/154 is not a work directory/
  );
  assert.deepEqual(gh.calls(), []);
});
