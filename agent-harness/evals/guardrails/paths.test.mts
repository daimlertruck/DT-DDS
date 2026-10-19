import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { isInside, samePath } from './paths.mts';

interface Fixture {
  readonly root: string;
  readonly real: string;
  readonly link: string;
}

const fixture = (): Fixture => {
  const root = mkdtempSync(join(tmpdir(), 'guardrail-paths-'));
  const real = join(root, 'real');
  mkdirSync(join(real, 'clone'), { recursive: true });
  mkdirSync(join(root, 'other'));
  symlinkSync(real, join(root, 'link'));
  return { root, real, link: join(root, 'link') };
};

test('a path through a symlink is the same path as its target (macOS /var → /private/var)', () => {
  const { real, link } = fixture();
  assert.equal(samePath(join(link, 'clone'), join(real, 'clone')), true);
  assert.equal(samePath(join(real, 'clone'), join(link, 'clone')), true);
});

test('different directories, missing paths and non-paths are not the same path', () => {
  const { root, real } = fixture();
  assert.equal(samePath(join(real, 'clone'), join(root, 'other')), false);
  assert.equal(samePath(join(root, 'missing'), join(root, 'other')), false);
  assert.equal(
    samePath('https://github.com/daimlertruck/DT-DDS.git', join(real, 'clone')),
    false
  );
});

test('missing paths compare by their resolved form', () => {
  const { root } = fixture();
  assert.equal(
    samePath(join(root, 'missing', '..', 'missing'), join(root, 'missing')),
    true
  );
});

test('isInside sees through symlinks and is false for the path itself and for siblings', () => {
  const { root, real, link } = fixture();
  assert.equal(isInside(link, join(real, 'clone')), true);
  assert.equal(isInside(real, join(link, 'clone')), true);
  assert.equal(isInside(real, real), false);
  assert.equal(isInside(real, join(root, 'other')), false);
  assert.equal(isInside(join(real, 'clone'), real), false);
});
