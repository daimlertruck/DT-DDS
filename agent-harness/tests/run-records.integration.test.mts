import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import {
  setup,
  type FakeClaude,
  fakeClaude,
  run,
  work,
  stateOf,
  promptOf,
} from './run-support.mts';
import { commitFile, git } from '../scripts/lib/test-support.mts';
import { tableUnder } from '../scripts/records/run-records.mts';

// A Lane 1 run whose implement commits on a branch and whose verify adds a fixup; origin is a local
// bare repo and `gh pr list` answers `prs`.
const lane1WithFixup = ({ prs = '[]' }: { readonly prs?: string } = {}): {
  readonly root: string;
  readonly claude: FakeClaude;
} => {
  const root = setup();
  const bare = mkdtempSync(join(tmpdir(), 'origin-'));
  git(bare, 'init', '-q', '--bare');
  git(root, 'remote', 'add', 'origin', bare);
  const claude = fakeClaude(root, {
    script: [
      {},
      {},
      { branch: 'fix/257/y', file: ['a.txt', 'a1\n'], commit: 'fix(a): y' },
      { file: ['a.txt', 'a2\n'], commit: 'fixup! fix(a): y' },
      {},
      {},
    ],
  });
  writeFileSync(join(claude.bin, 'gh'), `#!/bin/sh\nprintf '%s' '${prs}'\n`, {
    mode: 0o755,
  });
  return { root, claude };
};

// The repo has adopted run records: its `origin/main` has docs/agent-harness/runs/.
const adoptRunRecords = (root: string): void => {
  commitFile(
    root,
    'docs/agent-harness/runs/README.md',
    '# Agentic run records\n',
    'docs: add the run records'
  );
  git(root, 'update-ref', 'refs/remotes/origin/main', 'HEAD');
};

test("this run's fixups are autosquashed before the PR draft when the checks allow; the run log records it", () => {
  const { root, claude } = lane1WithFixup();
  const before = git(root, 'rev-parse', 'HEAD');

  const result = run(
    root,
    claude,
    ['approve', 'approve', 'approve', 'approve', 'approve', 'stop'],
    ['--lane', '1']
  );

  assert.equal(result.status, 0, result.stderr);
  assert.equal(stateOf(root).branchStart, before);
  assert.deepEqual(
    git(root, 'log', '--format=%s', `${before}..HEAD`).split('\n'),
    ['fix(a): y']
  );
  assert.match(
    result.stdout,
    /^autosquash: done: 1 folded \(fixup! 1\); HEAD [0-9a-f]{12} → [0-9a-f]{12}; tree [0-9a-f]{12} unchanged$/m
  );
  const prDraft = claude.calls()[5];
  assert.match(promptOf(prDraft), /step pr-draft/);
  assert.match(
    promptOf(prDraft),
    /Autosquash \(run\.mts, before this step\): done: 1 folded/
  );
  const actions = tableUnder(
    readFileSync(work(root, 'run-log.md'), 'utf8'),
    'human actions between gates'
  );
  assert.equal(actions.length, 1);
  assert.match(
    Object.values(actions[0] ?? {}).join(' | '),
    /history \| run\.mts: autosquash, 1 folded/
  );
  assert.match(
    readFileSync(work(root, 'commits.txt'), 'utf8'),
    /^[0-9a-f]+ fix\(a\): y\ntree /
  );
});

test('a refused autosquash changes nothing; the PR draft is told why', () => {
  const { root, claude } = lane1WithFixup({ prs: '[{"number":12}]' });

  const result = run(
    root,
    claude,
    ['approve', 'approve', 'approve', 'approve', 'approve', 'stop'],
    ['--lane', '1']
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /^autosquash: refused: a pull request exists for fix\/257\/y \(#12\)$/m
  );
  assert.match(git(root, 'log', '-1', '--format=%s'), /^fixup! fix\(a\): y$/);
  assert.match(
    promptOf(claude.calls()[5]),
    /Autosquash \(run\.mts, before this step\): refused: a pull request exists/
  );
});

test('G7 approval commits the shared run record on the feature branch: numbers and decision kinds, no reply text', () => {
  const root = setup();
  adoptRunRecords(root);
  const claude = fakeClaude(root, {
    script: [{}, { branch: 'fix/257/declare-dependency' }],
  });

  const result = run(root, claude, ['approve; plan reads well', 'approve']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /^recorded the run in docs\/agent-harness\/runs\/257\.json \(commit [0-9a-f]{7,}\)$/m
  );
  assert.equal(
    git(root, 'log', '-1', '--format=%s'),
    'docs: record the agentic run for #257'
  );
  assert.equal(
    git(root, 'rev-parse', '--abbrev-ref', 'HEAD'),
    'fix/257/declare-dependency'
  );
  assert.equal(git(root, 'status', '--porcelain'), '');
  const text = readFileSync(
    join(root, 'docs/agent-harness/runs/257.json'),
    'utf8'
  );
  const shared = JSON.parse(text);
  assert.equal(shared.issue, 257);
  assert.equal(shared.lane.lane, '0');
  assert.deepEqual(
    shared.gates.map(
      ({ gate, decision }: { gate: string; decision: string }) => [
        gate,
        decision,
      ]
    ),
    [
      ['G1+G3', 'approve'],
      ['G7', 'approve'],
    ]
  );
  assert.match(shared.harness.commit ?? '', /^[0-9a-f]{40}$/);
  assert.doesNotMatch(text, /plan reads well/);
});

test('on a base without docs/agent-harness/runs/ the run record is saved to the work dir, not committed: the PR carries only its change', () => {
  const root = setup();
  const claude = fakeClaude(root, {
    script: [{}, { branch: 'fix/257/declare-dependency' }],
  });
  const before = git(root, 'rev-parse', 'HEAD');

  const result = run(root, claude, ['approve', 'approve']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /^run record not committed: the base has no docs\/agent-harness\/runs\/ \(run records not adopted yet\); saved to \.local\/agent-harness\/work\/257\/run-record\.json$/m
  );
  assert.equal(git(root, 'rev-parse', 'HEAD'), before);
  assert.equal(
    existsSync(join(root, 'docs/agent-harness/runs/257.json')),
    false
  );
  const saved = JSON.parse(
    readFileSync(
      join(root, '.local/agent-harness/work/257/run-record.json'),
      'utf8'
    )
  );
  assert.equal(saved.issue, 257);
});

test('without a feature branch the run record is not committed', () => {
  const root = setup();
  adoptRunRecords(root);
  const claude = fakeClaude(root);
  const before = git(root, 'rev-parse', 'HEAD');

  const result = run(root, claude, ['approve', 'approve']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /^run record not committed: HEAD is on main, not on a feature branch$/m
  );
  assert.equal(git(root, 'rev-parse', 'HEAD'), before);
  assert.equal(
    existsSync(join(root, 'docs/agent-harness/runs/257.json')),
    false
  );
});

test('--close after the merge records the run and prunes its work dir; before the hand-off or with the PR open it refuses', () => {
  const root = setup();
  const claude = fakeClaude(root);
  const ghSays = (state: string): void =>
    writeFileSync(
      join(claude.bin, 'gh'),
      `#!/bin/sh\nprintf '%s' '${JSON.stringify({
        data: {
          repository: {
            issue: {
              closedByPullRequestsReferences: {
                nodes: [
                  {
                    number: 300,
                    state,
                    mergedAt:
                      state === 'MERGED' ? '2026-10-20T10:00:00Z' : null,
                    url: 'u',
                  },
                ],
              },
            },
          },
        },
      })}'\n`,
      { mode: 0o755 }
    );
  run(root, claude, ['stop']);
  const early = run(root, claude, [], ['--close']);
  assert.equal(early.status, 1);
  assert.match(
    early.stderr,
    /--close: run .* has not been handed off \(pending at G1\+G3\)/
  );

  run(root, claude, ['approve', 'approve']);
  ghSays('OPEN');
  const open = run(root, claude, [], ['--close']);
  assert.equal(open.status, 1);
  assert.match(
    open.stdout + open.stderr,
    /PR #300 still open; prune after it merges/
  );
  assert.ok(existsSync(work(root)));

  ghSays('MERGED');
  const closed = run(root, claude, [], ['--close']);
  assert.equal(closed.status, 0, closed.stderr);
  assert.ok(
    existsSync(join(root, '.local/agent-harness/runs/257/record.json'))
  );
  assert.equal(existsSync(work(root)), false);
  assert.match(closed.stdout, /deleted \.local\/agent-harness\/work\/257/);
  const comment = readFileSync(
    join(root, '.local/agent-harness/runs/257/issue-comment.md'),
    'utf8'
  );
  assert.match(comment, /^#### Agentic run record: Lane 0 \(Express\)$/m);
  assert.match(
    closed.stdout,
    /gh issue comment 257 --repo daimlertruck\/DT-DDS --body-file \.local\/agent-harness\/runs\/257\/issue-comment\.md/
  );
  assert.equal(run(root, claude, [], ['--close', '--dry']).status, 2);
});

test('a Human actions table in another layout does not stop the run after a fold; the row is skipped with a warning', () => {
  const { root, claude } = lane1WithFixup();
  run(
    root,
    claude,
    ['approve', 'approve', 'approve', 'approve', 'stop'],
    ['--lane', '1']
  );
  writeFileSync(
    work(root, 'run-log.md'),
    `${readFileSync(
      work(root, 'run-log.md'),
      'utf8'
    )}\n## Human actions between gates\n\n| when | what |\n|---|---|\n| 2026-10-16 | a hand-written row |\n`
  );

  const result = run(root, claude, ['approve', 'stop'], ['--lane', '1']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /^autosquash: done: 1 folded/m);
  assert.match(
    result.stdout,
    /Human actions row not written \(the Human actions between gates table has other columns/
  );
  assert.match(promptOf(claude.calls().at(-1)), /step pr-draft/);
});
