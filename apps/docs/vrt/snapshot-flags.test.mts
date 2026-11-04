import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { findSnapshotUpdateFlag } from './snapshot-flags.mts';

describe('findSnapshotUpdateFlag', () => {
  it('should return the flag for --update-snapshots', () => {
    assert.equal(
      findSnapshotUpdateFlag(['--update-snapshots']),
      '--update-snapshots'
    );
  });

  it('should return the flag for --update-snapshots=all', () => {
    assert.equal(
      findSnapshotUpdateFlag(['--grep', 'x', '--update-snapshots=all']),
      '--update-snapshots=all'
    );
  });

  it('should return the flag for -u', () => {
    assert.equal(findSnapshotUpdateFlag(['-u']), '-u');
  });

  it('should return the flag for --update-snapshots followed by a separate all argument', () => {
    assert.equal(
      findSnapshotUpdateFlag(['--update-snapshots', 'all']),
      '--update-snapshots'
    );
  });

  it('should return the flag for the short forms -uall, -u=all, -xu, -xuall', () => {
    for (const flag of ['-uall', '-u=all', '-xu', '-xuall']) {
      assert.equal(findSnapshotUpdateFlag([flag]), flag);
    }
  });

  it('should return undefined for --grep data-display-accordion--controlled', () => {
    assert.equal(
      findSnapshotUpdateFlag(['--grep', 'data-display-accordion--controlled']),
      undefined
    );
  });

  it('should return undefined for -g, -x, --update-source-method=patch, --ui', () => {
    assert.equal(
      findSnapshotUpdateFlag([
        '-g',
        'x',
        '-x',
        '--update-source-method=patch',
        '--ui',
      ]),
      undefined
    );
  });

  it('should return undefined for an empty argument list', () => {
    assert.equal(findSnapshotUpdateFlag([]), undefined);
  });

  it('should return undefined for --update', () => {
    assert.equal(findSnapshotUpdateFlag(['--update']), undefined);
  });
});
