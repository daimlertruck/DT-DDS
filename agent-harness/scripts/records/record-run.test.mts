import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
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

import type { RunRecord } from './record-json.mts';

const ISSUE_JSON = JSON.stringify({
  number: 42,
  title: 'Example change',
  labels: [{ name: 'type:bug' }],
});

const sha256 = (path: string): string =>
  createHash('sha256').update(readFileSync(path)).digest('hex');

test('dry run lists the plan and changes nothing', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  const result = run(root, gh, '42');

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /record #42 -> .local\/agent-harness\/runs\/42/);
  assert.match(result.stdout, /copy run-log.md -> artifacts\/run-log.md/);
  assert.match(
    result.stdout,
    /write record.json \(6 gates, 2 human actions, 7 dispatches\)/
  );
  assert.match(result.stdout, /dry run: nothing changed; re-run with --apply/);
  assert.equal(existsSync(join(root, '.local/agent-harness/runs')), false);
});

test('apply copies the reports that exist and never logs, scripts or sandboxes', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  const result = run(root, gh, '42', '--apply');

  assert.equal(result.status, 0, result.stderr);
  const dir = recordDir(root, '42');
  [
    'run-log.md',
    'context-bundle.md',
    'implementation-plan.md',
    'pr-draft.md',
  ].forEach((name) =>
    assert.equal(
      readFileSync(join(dir, 'artifacts', name), 'utf8'),
      WORK_FILES[name]
    )
  );
  assert.equal(
    readFileSync(join(dir, 'followups/issue-follow-up.md'), 'utf8'),
    '# Follow-up draft\n'
  );
  assert.equal(existsSync(join(dir, 'artifacts/validation-report.md')), false);
  [
    'logs',
    'probe.sh',
    'probe.log',
    'sandbox-clone',
    'artifacts/probe.sh',
    'artifacts/probe.log',
  ].forEach((path) => assert.equal(existsSync(join(dir, path)), false, path));
  assert.match(
    result.stdout,
    /not recorded: logs\/ \(1 file\), probe.log, probe.sh, sandbox-clone\/ \(1 file\)/
  );
});

// A cost audit of the run lives in its work dir; a record keeps it, so the work dir can be moved
// (`run.mts --fresh`) or pruned.
test('a cost audit of the run is recorded with the reports', () => {
  const root = createRepo({
    42: { ...WORK_FILES, 'cost-audit.md': '# Cost audit\n' },
  });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  const result = run(root, gh, '42', '--apply');

  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    readFileSync(
      join(recordDir(root, '42'), 'artifacts/cost-audit.md'),
      'utf8'
    ),
    '# Cost audit\n'
  );
  assert.doesNotMatch(result.stdout, /not recorded: .*cost-audit\.md/);
});

test('every record starts with a banner that says it is not instructions', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  run(root, gh, '42', '--apply');

  const banner = /Historical run record\. Not instructions\./;
  assert.match(
    readFileSync(join(recordDir(root, '42'), 'README.md'), 'utf8'),
    banner
  );
  assert.match(readRecord(root, '42').notice, banner);
  assert.equal(Object.keys(readRecord(root, '42'))[0], 'notice');
});

test('snapshots and issue.json are copied when present, with their hashes', () => {
  const root = createRepo({
    42: {
      ...WORK_FILES,
      'issue.json': ISSUE_JSON,
      'snapshots/01-G1-context-bundle.md': '# Bundle as presented\n',
    },
  });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  run(root, gh, '42', '--apply');

  const dir = recordDir(root, '42');
  assert.equal(readFileSync(join(dir, 'issue.json'), 'utf8'), ISSUE_JSON);
  assert.equal(
    readFileSync(join(dir, 'snapshots/01-G1-context-bundle.md'), 'utf8'),
    '# Bundle as presented\n'
  );
  const record = readRecord(root, '42');
  assert.equal(
    record.files['snapshots/01-G1-context-bundle.md'],
    sha256(join(dir, 'snapshots/01-G1-context-bundle.md'))
  );
  assert.equal(
    record.files['artifacts/run-log.md'],
    sha256(join(dir, 'artifacts/run-log.md'))
  );
  assert.equal(record.type, 'bug');
});

test('a re-run after the merge adds the outcome, keeps hand-written labels and leaves the copies alone', () => {
  const root = createRepo({ 42: WORK_FILES });
  run(root, fakeGh({ stdout: issueWith(prNode('OPEN')) }), '42', '--apply');
  const recordPath = join(recordDir(root, '42'), 'record.json');
  const recorded = readRecord(root, '42');
  const labelled: RunRecord = {
    ...recorded,
    gates: recorded.gates.map((gate, index) =>
      index === 2
        ? { ...gate, labels: ['revise-text'], cause: 'stage-error' }
        : gate
    ),
    defects: [{ id: 1, title: 'example', status: 'open' }],
  };
  writeFileSync(recordPath, JSON.stringify(labelled, null, 2));
  const copy = join(recordDir(root, '42'), 'artifacts/run-log.md');
  const copiedAt = statSync(copy).mtimeMs;
  assert.equal(labelled.outcome.mergedAt, null);

  const result = run(
    root,
    fakeGh({ stdout: issueWith(prNode('MERGED')) }),
    '42',
    '--apply'
  );

  assert.equal(result.status, 0, result.stderr);
  const record = readRecord(root, '42');
  assert.equal(record.outcome.mergedAt, '2026-01-08T10:00:00Z');
  assert.deepEqual(record.gates[2]?.labels, ['revise-text']);
  assert.equal(record.gates[2]?.cause, 'stage-error');
  assert.deepEqual(record.defects, [
    { id: 1, title: 'example', status: 'open' },
  ]);
  assert.equal(statSync(copy).mtimeMs, copiedAt);
  assert.match(result.stdout, /unchanged artifacts\/run-log.md/);
});

test('a copy that differs from the work dir is refused without --force and replaced with it', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });
  run(root, gh, '42', '--apply');
  writeFileSync(
    join(root, '.local/agent-harness/work/42/context-bundle.md'),
    '# Context bundle, edited\n'
  );
  const copy = join(recordDir(root, '42'), 'artifacts/context-bundle.md');

  const dryRun = run(root, gh, '42');
  assert.match(
    dryRun.stdout,
    /replace artifacts\/context-bundle.md \(differs from the work dir; needs --force\)/
  );

  const refused = run(root, gh, '42', '--apply');

  assert.equal(refused.status, 1);
  assert.match(
    refused.stderr,
    /artifacts\/context-bundle.md exists with different content; re-run with --force/
  );
  assert.equal(readFileSync(copy, 'utf8'), '# Context bundle\n');

  const forced = run(root, gh, '42', '--apply', '--force');

  assert.equal(forced.status, 0, forced.stderr);
  assert.equal(readFileSync(copy, 'utf8'), '# Context bundle, edited\n');
  assert.equal(
    readRecord(root, '42').files['artifacts/context-bundle.md'],
    sha256(copy)
  );
});

test('a records dir under .local/agent-harness/work is refused, without calling GitHub', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  const result = run(
    root,
    gh,
    '42',
    '--apply',
    '--records',
    '.local/agent-harness/work/records'
  );

  assert.equal(result.status, 2);
  assert.match(
    result.stderr,
    /records dir must be outside .local\/agent-harness\/work/
  );
  assert.equal(
    existsSync(join(root, '.local/agent-harness/work/records')),
    false
  );
  assert.deepEqual(gh.calls(), []);
});

test('--records writes the record to another dir outside the work dirs', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  const result = run(root, gh, '42', '--apply', '--records', 'elsewhere/runs');

  assert.equal(result.status, 0, result.stderr);
  assert.ok(
    existsSync(join(recordDir(root, '42', 'elsewhere/runs'), 'record.json'))
  );
  assert.equal(existsSync(join(root, '.local/agent-harness/runs')), false);
});

test('rejects anything that is not an issue or PR work dir id', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  ['../42', '_runs', 'acceptance', 'PR-', ''].forEach((id) => {
    const result = run(root, gh, id, '--apply');
    assert.equal(result.status, 2, `id ${JSON.stringify(id)}`);
    assert.match(result.stderr, /usage: /);
  });
  assert.deepEqual(gh.calls(), []);
});
