import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { after, before, beforeEach, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const runPath = fileURLToPath(new URL('./run.mts', import.meta.url));
const storybookIndex = fileURLToPath(
  new URL('../storybook-static/index.json', import.meta.url)
);

describe('vrt run.mts', () => {
  let dir = '';
  let argsFile = '';

  before(() => {
    dir = mkdtempSync(join(tmpdir(), 'vrt-run-'));
    argsFile = join(dir, 'docker-args.txt');
    const docker = join(dir, 'docker');
    writeFileSync(
      docker,
      '#!/bin/sh\nprintf \'%s\\n\' "$@" > "$DOCKER_ARGS_FILE"\n'
    );
    chmodSync(docker, 0o755);
  });

  after(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  beforeEach(() => {
    rmSync(argsFile, { force: true });
  });

  const run = (args: readonly string[]) =>
    spawnSync(process.execPath, [runPath, ...args], {
      encoding: 'utf8',
      env: {
        ...process.env,
        // eslint-disable-next-line turbo/no-undeclared-env-vars -- vrt is not a turbo task
        PATH: `${dir}${delimiter}${process.env.PATH ?? ''}`,
        DOCKER_ARGS_FILE: argsFile,
      },
    });

  it('should refuse --update-snapshots, --update-snapshots=all and -u without starting Docker', () => {
    for (const flag of ['--update-snapshots', '--update-snapshots=all', '-u']) {
      const result = run([flag]);
      assert.equal(result.status, 1, flag);
      assert.match(result.stderr, /vrt:update/, flag);
      assert.equal(existsSync(argsFile), false, flag);
    }
  });

  it('should refuse -u passed with --update', () => {
    const result = run(['--update', '-u']);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /refuses -u/);
    assert.match(result.stderr, /vrt:update/);
    assert.equal(existsSync(argsFile), false);
  });

  it('should refuse --update without a terminal', () => {
    const result = run(['--update']);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /human-only/);
    assert.equal(existsSync(argsFile), false);
  });

  it('should pass --grep <id> to Playwright', (t) => {
    if (!existsSync(storybookIndex)) {
      t.skip('needs a Storybook build');
      return;
    }
    const result = run(['--grep', 'data-display-accordion--controlled']);
    assert.equal(result.status, 0, result.stderr);
    const lines = readFileSync(argsFile, 'utf8').split('\n');
    for (const expected of [
      '-c',
      'vrt/playwright.config.ts',
      '--grep',
      'data-display-accordion--controlled',
    ]) {
      assert.ok(lines.includes(expected), expected);
    }
    assert.equal(
      lines.some((line) => line.startsWith('--update-snapshots')),
      false
    );
  });
});
