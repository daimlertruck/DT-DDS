import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const repoRoot = path.resolve(docsDir, '..', '..');
const args = process.argv.slice(2);
const update = args.includes('--update');
const rest = args.filter((arg) => arg !== '--update');

if (update && !process.stdin.isTTY) {
  console.error(
    'vrt:update is human-only (ADR-0009): run it yourself in a terminal.'
  );
  process.exit(1);
}

if (!existsSync(path.join(docsDir, 'storybook-static', 'index.json'))) {
  console.error(
    [
      'No Storybook build found. Build it first:',
      "  yarn turbo run build --filter='./packages/*'",
      '  yarn workspace @dt-dds/docs build',
    ].join('\n')
  );
  process.exit(1);
}

const { version } = createRequire(import.meta.url)(
  '@playwright/test/package.json'
) as { version: string };

const linuxUser =
  process.platform === 'linux' && process.getuid && process.getgid
    ? ['--user', `${process.getuid()}:${process.getgid()}`]
    : [];

const result = spawnSync(
  'docker',
  [
    'run',
    '--rm',
    '--init',
    '--ipc=host',
    '--network=none',
    ...linuxUser,
    '-e',
    'HOME=/tmp',
    '-e',
    'CI',
    '-e',
    'VRT_BRAND',
    '-v',
    `${repoRoot}:/work`,
    '-w',
    '/work/apps/docs',
    `mcr.microsoft.com/playwright:v${version}-noble`,
    'npx',
    '--no',
    'playwright',
    'test',
    '-c',
    'vrt/playwright.config.ts',
    ...(update ? ['--update-snapshots=changed'] : []),
    ...rest,
  ],
  { stdio: 'inherit' }
);

if (result.error) {
  console.error(`docker run failed: ${result.error.message}`);
}

process.exit(result.status ?? 1);
