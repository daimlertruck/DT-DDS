import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { featuresOf } from './features.mts';
import { type Issue } from './issue.mts';
import { classify } from './rules.mts';
import { issue, realRoot, table } from './test-support.mts';

const bug = (solution: string, extra = ''): string =>
  `### Description\n\nSomething breaks.\n${extra}\n\n### Possible solution\n\n${solution}\n`;

// An issue as `gh issue view` saves it (a manifest change in three packages), checked in so that no
// work dir is read.
const ISSUE_257: Issue = JSON.parse(
  readFileSync(
    join(realRoot, 'agent-harness/tests/fixtures/issue-257.json'),
    'utf8'
  )
);

test('a manifest change in three packages is Lane 0 with high confidence; the tool-owned yarn.lock is noted, not counted', () => {
  const verdict = classify(ISSUE_257);

  assert.equal(verdict.lane, '0');
  assert.ok(verdict.confidence >= table.lowConfidence);
  assert.deepEqual(featuresOf(ISSUE_257).packages, [
    'checkbox',
    'link',
    'pagination',
  ]);
  assert.ok(verdict.reasons.some((reason) => /manifest change/.test(reason)));
  assert.ok(
    verdict.reasons.some((reason) => /yarn\.lock: tool-owned/.test(reason))
  );
});

// Lane 0 has no review stage, so the rules propose it only for manifest, config or docs files.
test('a stated one-file source fix goes to Lane 1: source fixes reach Lane 0 only by --lane 0', () => {
  const verdict = classify(
    issue({
      body: bug(
        'Change `gap` to `0` in `packages/react-packages/link/src/Link.styled.ts`.'
      ),
    })
  );

  assert.equal(verdict.lane, '1');
  assert.ok(
    verdict.reasons.some((reason) =>
      /source file named for change: packages\/react-packages\/link\/src\/Link\.styled\.ts/.test(
        reason
      )
    )
  );
});

test('a stated docs or manifest fix that names its files is Lane 0', () => {
  const docs = classify(
    issue({
      labels: ['type:docs'],
      body: bug(
        'Fix the broken link in `packages/react-packages/link/README.md`: `#usage` → `#use`.'
      ),
    })
  );
  const manifest = classify(
    issue({
      labels: ['type:chore'],
      body: bug(
        'Add `"sideEffects": false` to `packages/react-packages/link/package.json`.'
      ),
    })
  );
  // A path-like value reads as a file named for change: the safe direction (Lane 1), kept on purpose.
  const pathValue = classify(
    issue({
      labels: ['type:chore'],
      body: bug(
        'Add `"types": "dist/index.d.ts"` to `packages/react-packages/link/package.json`.'
      ),
    })
  );

  assert.equal(docs.lane, '0');
  assert.equal(manifest.lane, '0');
  assert.equal(pathValue.lane, '1');
});

test('"states the change" reads the solution only: a path in the description and no fix is not Lane 0', () => {
  const crash = (labels: readonly string[], solution: string) =>
    classify(
      issue({
        labels,
        body: bug(
          solution,
          'Crash at `packages/react-packages/select/README.md:40`.'
        ),
      })
    );

  assert.notEqual(crash(['type:docs'], 'No idea, sorry.').lane, '0');
  assert.notEqual(
    crash(
      ['type:docs'],
      '<!-- Describe the fix, e.g. update the dependencies in package.json -->'
    ).lane,
    '0'
  );
});

test('a manifest word does not make source files a manifest change', () => {
  const verdict = classify(
    issue({
      labels: ['type:chore'],
      body: bug(
        'Move `useX` from `packages/react-packages/select/src/hooks/useX.ts` into `packages/react-packages/core/src/hooks/useX.ts` and update `packages/react-packages/select/src/Select.tsx`; removes the circular dependencies.'
      ),
    })
  );
  assert.equal(verdict.lane, '1');
});

test('a manifest change that names no package is not Lane 0', () => {
  const verdict = classify(
    issue({
      labels: ['type:chore'],
      body: bug(
        'Move `@emotion/react` from `dependencies` to `peerDependencies` in every component package.'
      ),
    })
  );
  assert.notEqual(verdict.lane, '0');
});

test('a hand edit of a tool-owned file (CHANGELOG.md) is never Lane 0', () => {
  const verdict = classify(
    issue({
      labels: ['type:docs'],
      body: bug(
        'Fix the 1.2.0 entry in `packages/react-packages/select/CHANGELOG.md`.'
      ),
    })
  );
  assert.notEqual(verdict.lane, '0');
  assert.ok(
    verdict.reasons.some((reason) =>
      /off-limits path named: packages\/react-packages\/select\/CHANGELOG\.md/.test(
        reason
      )
    )
  );
});

test('a ./ prefix does not hide an off-limits path', () => {
  const verdict = classify(
    issue({
      body: bug('Fix `primary` in `./packages/themes/src/tokens/core.json`.'),
    })
  );
  assert.ok(
    verdict.reasons.some((reason) =>
      /off-limits path named: packages\/themes\/src\/tokens\/core\.json/.test(
        reason
      )
    )
  );
});

test('a bug without a stated solution goes to Lane 1', () => {
  const verdict = classify(
    issue({
      body: bug(
        '_No response_',
        'See `packages/react-packages/select/src/Select.tsx:40`.'
      ),
    })
  );

  assert.equal(verdict.lane, '1');
  assert.ok(
    verdict.reasons.some((reason) => /does not state the change/.test(reason))
  );
});

test('an Ask-first path keeps a stated fix out of Lane 0', () => {
  const verdict = classify(
    issue({
      labels: ['type:chore'],
      body: bug('Edit `.github/workflows/ci.yml` to cache yarn.'),
    })
  );

  assert.notEqual(verdict.lane, '0');
  assert.ok(
    verdict.reasons.some((reason) =>
      /Ask-first path named: \.github\/workflows\/ci\.yml/.test(reason)
    )
  );
});

test('an off-limits path keeps a stated fix out of Lane 0', () => {
  const verdict = classify(
    issue({
      body: bug('Fix the value in `packages/themes/src/tokens/core.json`.'),
    })
  );

  assert.notEqual(verdict.lane, '0');
  assert.ok(
    verdict.reasons.some((reason) => /off-limits path named/.test(reason))
  );
});

test('a11y, visual or API work is Lane 2', () => {
  assert.equal(
    classify(
      issue({ body: bug('_No response_', 'The focus ring fails WCAG 2.4.7.') })
    ).lane,
    '2'
  );
  assert.equal(
    classify(
      issue({
        body: bug('_No response_', 'Design: https://www.figma.com/file/abc'),
      })
    ).lane,
    '2'
  );
});

test('source changes across more than two packages are Lane 2', () => {
  const paths = ['a', 'b', 'c']
    .map((pkg) => `packages/react-packages/${pkg}/src/X.tsx`)
    .join(', ');
  assert.equal(
    classify(issue({ body: bug('_No response_', `Broken in ${paths}.`) })).lane,
    '2'
  );
});

test('escalates breaking changes, deprecations, needs:rfc, features without an RFC and questions', () => {
  assert.equal(
    classify(issue({ title: 'feat!: drop size prop' })).lane,
    'escalate'
  );
  assert.equal(
    classify(issue({ body: 'Deprecate the old Select.' })).lane,
    'escalate'
  );
  assert.equal(
    classify(issue({ labels: ['type:bug', 'needs:rfc'] })).lane,
    'escalate'
  );
  assert.equal(classify(issue({ labels: ['type:feature'] })).lane, 'escalate');
  assert.equal(classify(issue({ labels: ['type:question'] })).lane, 'escalate');
  assert.equal(
    classify(
      issue({ labels: ['type:enhancement'], body: 'Add a new prop `dense`.' })
    ).lane,
    'escalate'
  );
});

test('a feature with an RFC named is Lane 2', () => {
  assert.equal(
    classify(
      issue({
        labels: ['type:feature'],
        body: 'Implements docs/rfcs/0012-select.md.',
      })
    ).lane,
    '2'
  );
});

test('a dependency\'s "breaking bump" is not a breaking change, and "find a way" is not a stated fix', () => {
  const verdict = classify(
    issue({
      labels: ['type:chore'],
      body: bug(
        'Find a way to run a pinned `@turbo/gen`. Options to look at: …',
        'It could ship a breaking bump in the PR that makes it.'
      ),
    })
  );
  assert.equal(verdict.lane, '1');
  assert.ok(
    verdict.reasons.some((reason) =>
      /offers options or a direction/.test(reason)
    )
  );
});

test('a solution that leaves the choice to a maintainer is not Lane 0', () => {
  const verdict = classify(
    issue({
      body: bug(
        'Two options, for a maintainer to choose: declare `@emotion/server` in core, or move the renderer.',
        'See `packages/react-packages/core/src/utils/renderer.ts`.'
      ),
    })
  );
  assert.equal(verdict.lane, '1');
});

test('a source change that names no file is not small', () => {
  const verdict = classify(
    issue({
      labels: ['type:chore'],
      body: bug('Adopt the harness: a root `AGENTS.md`, skills, hooks.'),
    })
  );
  assert.notEqual(verdict.lane, '0');
});

test('priority:p0 on a non-bug is an architecture change and escalates', () => {
  assert.equal(
    classify(issue({ labels: ['type:chore', 'priority:p0'] })).lane,
    'escalate'
  );
  assert.notEqual(
    classify(issue({ labels: ['type:bug', 'priority:p0'] })).lane,
    'escalate'
  );
});

test('docs edits across four packages are Lane 1, not cross-package behaviour', () => {
  const paths = ['themes', 'fonts', 'icons', 'dt-dds-react']
    .map((pkg) => `packages/${pkg}/README.md`)
    .join(', ');
  const verdict = classify(
    issue({
      labels: ['type:docs'],
      body: bug('Change `(LICENSE.md)` to `(LICENSE)`.', `In ${paths}.`),
    })
  );
  assert.equal(verdict.lane, '1');
});
