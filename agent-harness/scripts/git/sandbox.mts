// Throwaway clones ("sandboxes") for probes and agent-run checks: outside the repo, one
// manifest each, so they are listed and closed instead of deleted by hand (ds-verify-changes,
// ds-run-pipeline). Usage:
//   node agent-harness/scripts/git/sandbox.mts create <name> --issue <N | PR-n> --keep-until <gate>
//                                    [--stage <stage>] [--purpose <text>] [--logs <path,...>]
//   node agent-harness/scripts/git/sandbox.mts list
//   node agent-harness/scripts/git/sandbox.mts close <name> [--force]
//   all: [--root <repo>] [--sandboxes <dir>]  (default $DT_DDS_SANDBOXES, else $TMPDIR/dt-dds-sandboxes)
// create: clones the repo without hard links, disables pushing, fetches the repo's origin/* as
//   base/*, sets a clone-local identity with signing off, writes <sandboxes>/<name>.sandbox.json.
// close: copies the declared logs (paths inside the clone) to .local/agent-harness/work/<N>/logs/<name>/,
//   verifies their checksums, then deletes the clone and its manifest. --force closes although a
//   declared log is missing; a log that would overwrite different content is always refused.
// Exit 0 done · 1 refused · 2 usage. The real checkout only receives the copied logs.

import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { isRecord } from '../lib/json.mts';
import {
  ID_PATTERN,
  WORK_DIR,
  filesUnder,
  isDirectory,
  isFile,
  isInside,
  sha256,
} from '../records/run-records.mts';

export const NAME_PATTERN = /^[a-z0-9][a-z0-9-]{0,62}$/;
const USAGE = [
  'usage: node agent-harness/scripts/git/sandbox.mts create <name> --issue <N | PR-n> --keep-until <gate>',
  '         [--stage <stage>] [--purpose <text>] [--logs <path,...>]',
  '       node agent-harness/scripts/git/sandbox.mts list',
  '       node agent-harness/scripts/git/sandbox.mts close <name> [--force]',
  '       all: [--root <repo>] [--sandboxes <dir>]',
].join('\n');

export class Refusal extends Error {
  readonly exitCode: number;

  constructor(message: string, exitCode = 1) {
    super(message);
    this.exitCode = exitCode;
  }
}

// <sandboxes>/<name>.sandbox.json, as createSandbox writes it.
export interface SandboxManifest {
  readonly name: string;
  readonly path: string;
  readonly issue: string;
  readonly stage: string;
  readonly purpose: string;
  readonly keepUntil: string;
  readonly logs: readonly string[];
  readonly head: string;
  readonly created: string;
}

export interface CreateSandboxOptions {
  readonly root: string;
  readonly sandboxesRoot: string;
  readonly name: string;
  readonly issue: string;
  readonly keepUntil: string;
  readonly stage?: string;
  readonly purpose?: string;
  readonly logs?: readonly string[];
}

export interface CloseSandboxOptions {
  readonly root: string;
  readonly sandboxesRoot: string;
  readonly name: string;
  readonly force?: boolean;
}

export interface ClosedSandbox {
  readonly kept: number;
  readonly logsDir: string;
}

const MANIFEST_STRINGS = [
  'name',
  'path',
  'issue',
  'stage',
  'purpose',
  'keepUntil',
  'head',
  'created',
] as const satisfies readonly (keyof SandboxManifest)[];

export const isSandboxManifest = (value: unknown): value is SandboxManifest =>
  isRecord(value) &&
  MANIFEST_STRINGS.every((key) => typeof value[key] === 'string') &&
  Array.isArray(value.logs) &&
  value.logs.every((log: unknown) => typeof log === 'string');

const readManifest = (path: string): SandboxManifest | null => {
  try {
    const manifest: unknown = JSON.parse(readFileSync(path, 'utf8'));
    return isSandboxManifest(manifest) ? manifest : null;
  } catch {
    return null;
  }
};

const gitIn = (
  cwd: string,
  ...args: readonly string[]
): SpawnSyncReturns<string> =>
  spawnSync('git', args, { cwd, encoding: 'utf8' });
const mustGit = (cwd: string, ...args: readonly string[]): string => {
  const result = gitIn(cwd, ...args);
  if (result.status !== 0) {
    throw new Refusal(`git ${args[0]} failed: ${(result.stderr ?? '').trim()}`);
  }
  return result.stdout.trim();
};
const overlaps = (a: string, b: string): boolean =>
  isInside(a, b) || isInside(b, a);
const realOrSame = (path: string): string =>
  existsSync(path) ? realpathSync(path) : path;

export const sandboxesRootFor = (
  root: string,
  sandboxes?: string,
  env: Readonly<Record<string, string | undefined>> = process.env
): string => {
  const dir = resolve(
    root,
    sandboxes ?? env.DT_DDS_SANDBOXES ?? join(tmpdir(), 'dt-dds-sandboxes')
  );
  if (overlaps(realOrSame(dir), realOrSame(root)) || overlaps(dir, root)) {
    throw new Refusal(
      'the sandboxes dir must be outside the repo and must not contain it',
      2
    );
  }
  return dir;
};

// The clone-local identity, with signing off.
const CLONE_CONFIG = [
  ['user.name', 'sandbox'],
  ['user.email', 'sandbox@invalid'],
  ['commit.gpgsign', 'false'],
  ['tag.gpgsign', 'false'],
] as const;

const manifestPathOf = (sandboxesRoot: string, name: string): string =>
  join(sandboxesRoot, `${name}.sandbox.json`);

export const createSandbox = ({
  root,
  sandboxesRoot,
  name,
  issue,
  keepUntil,
  stage = '',
  purpose = '',
  logs = [],
}: CreateSandboxOptions): SandboxManifest => {
  const path = join(sandboxesRoot, name);
  const manifestPath = manifestPathOf(sandboxesRoot, name);
  if (existsSync(path) || existsSync(manifestPath)) {
    throw new Refusal(
      `sandbox ${name} already exists (${path}); close it first`
    );
  }
  mkdirSync(sandboxesRoot, { recursive: true });
  mustGit(root, 'clone', '--quiet', '--no-hardlinks', root, path);
  mustGit(
    path,
    'remote',
    'set-url',
    '--push',
    'origin',
    `DISABLED-sandbox-${name}`
  );
  gitIn(
    path,
    'fetch',
    '--quiet',
    'origin',
    '+refs/remotes/origin/*:refs/remotes/base/*'
  );
  CLONE_CONFIG.forEach(([key, value]) =>
    mustGit(path, 'config', '--local', key, value)
  );
  const manifest: SandboxManifest = {
    name,
    path,
    issue,
    stage,
    purpose,
    keepUntil,
    logs,
    head: mustGit(root, 'rev-parse', 'HEAD'),
    created: new Date().toISOString(),
  };
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
};

// The sandboxes' manifests by name. A file that is not a manifest (hand-edited, cut off) is left
// out; closing that sandbox refuses it.
export const listSandboxes = (sandboxesRoot: string): SandboxManifest[] =>
  isDirectory(sandboxesRoot)
    ? readdirSync(sandboxesRoot)
        .filter((entry) => entry.endsWith('.sandbox.json'))
        .sort()
        .flatMap((entry) => {
          const manifest = readManifest(join(sandboxesRoot, entry));
          return manifest ? [manifest] : [];
        })
    : [];

export const closeSandbox = ({
  root,
  sandboxesRoot,
  name,
  force = false,
}: CloseSandboxOptions): ClosedSandbox => {
  const manifestPath = manifestPathOf(sandboxesRoot, name);
  if (!isFile(manifestPath)) {
    throw new Refusal(`no sandbox ${name} in ${sandboxesRoot}`);
  }
  const manifest = readManifest(manifestPath);
  if (!manifest) {
    throw new Refusal(
      `${manifestPath} is not a sandbox manifest; nothing deleted`
    );
  }
  const path = join(sandboxesRoot, name);
  if (
    manifest.path !== path ||
    !isDirectory(path) ||
    overlaps(realpathSync(path), realpathSync(root))
  ) {
    throw new Refusal(
      `${manifest.path} is not the sandbox path ${path}; nothing deleted`
    );
  }
  if (!ID_PATTERN.test(manifest.issue)) {
    throw new Refusal(`manifest issue ${manifest.issue} is not a work dir id`);
  }
  const { logs } = manifest;
  if (logs.some((log) => !isInside(resolve(path, log), path))) {
    throw new Refusal('a declared log is outside the sandbox');
  }

  const logsDir = join(root, WORK_DIR, manifest.issue, 'logs', name);
  const missing = logs.filter((log) => !existsSync(join(path, log)));
  const files = logs
    .filter((log) => existsSync(join(path, log)))
    .flatMap((log) =>
      isDirectory(join(path, log))
        ? filesUnder(join(path, log)).map((entry) => join(log, entry))
        : [log]
    );
  const clashes = files.filter(
    (file) =>
      isFile(join(logsDir, file)) &&
      sha256(join(logsDir, file)) !== sha256(join(path, file))
  );
  const problems = [
    ...(force
      ? []
      : missing.map(
          (log) =>
            `declared log ${log} is missing (close with --force to delete it anyway)`
        )),
    ...clashes.map(
      (file) =>
        `${relative(root, join(logsDir, file))} exists with different content`
    ),
  ];
  if (problems.length) {
    throw new Refusal(`${problems.join('; ')}; sandbox ${name} kept`);
  }

  files.forEach((file) => {
    mkdirSync(dirname(join(logsDir, file)), { recursive: true });
    copyFileSync(join(path, file), join(logsDir, file));
  });
  const corrupted = files.filter(
    (file) => sha256(join(logsDir, file)) !== sha256(join(path, file))
  );
  if (corrupted.length) {
    throw new Refusal(
      `checksum mismatch after copying ${corrupted.join(
        ', '
      )}; sandbox ${name} kept`
    );
  }

  rmSync(path, { recursive: true, force: true });
  rmSync(manifestPath);
  return { kept: files.length, logsDir };
};

// A `list` line: name · issue · stage · purpose · keep-until gate · created · path.
export const listLineOf = (
  { name, issue, stage, purpose, keepUntil, created, path }: SandboxManifest,
  present: boolean
): string =>
  [
    name,
    /^\d+$/.test(issue) ? `#${issue}` : issue,
    stage,
    purpose,
    `keep until ${keepUntil}`,
    `created ${created}`,
    present ? path : `${path} (missing)`,
  ].join(' · ');

// The paths in `--logs a,b`.
export const logsOf = (value: string | undefined): string[] =>
  (value ?? '')
    .split(',')
    .map((log) => log.trim())
    .filter(Boolean);

const VALUE_FLAGS: readonly string[] = [
  '--root',
  '--sandboxes',
  '--issue',
  '--stage',
  '--purpose',
  '--keep-until',
  '--logs',
];

const main = (args: readonly string[], cwd: string): void => {
  const valueOf = (flag: string): string | undefined =>
    args.includes(flag) ? args[args.lastIndexOf(flag) + 1] : undefined;
  const positional = args.filter(
    (arg, index) =>
      !arg.startsWith('--') && !VALUE_FLAGS.includes(args[index - 1] ?? '')
  );
  const [command, name = ''] = positional;
  const usage = (): never => {
    throw new Refusal(USAGE, 2);
  };
  if (
    command === 'list'
      ? positional.length !== 1
      : positional.length !== 2 || !NAME_PATTERN.test(name)
  ) {
    usage();
  }

  const root = resolve(valueOf('--root') ?? cwd);
  const sandboxesRoot = sandboxesRootFor(root, valueOf('--sandboxes'));
  const say = (line: string): void => {
    process.stdout.write(`${line}\n`);
  };

  if (command === 'create') {
    const issue = valueOf('--issue') ?? '';
    const keepUntil = valueOf('--keep-until') ?? '';
    const logs = logsOf(valueOf('--logs'));
    if (!ID_PATTERN.test(issue) || !keepUntil) usage();
    if (logs.some((log) => !isInside(resolve('/sandbox', log), '/sandbox'))) {
      usage();
    }
    const manifest = createSandbox({
      root,
      sandboxesRoot,
      name,
      issue,
      keepUntil,
      stage: valueOf('--stage') ?? '',
      purpose: valueOf('--purpose') ?? '',
      logs,
    });
    say(
      `created ${manifest.path} (keep until ${keepUntil}; close with: node agent-harness/scripts/git/sandbox.mts close ${name})`
    );
    return;
  }
  if (command === 'list') {
    listSandboxes(sandboxesRoot).forEach((manifest) =>
      say(listLineOf(manifest, isDirectory(manifest.path)))
    );
    return;
  }
  if (command === 'close') {
    const { kept, logsDir } = closeSandbox({
      root,
      sandboxesRoot,
      name,
      force: args.includes('--force'),
    });
    say(
      `kept ${kept} log ${kept === 1 ? 'file' : 'files'} in ${relative(
        root,
        logsDir
      )}`
    );
    say(`deleted sandbox ${name}`);
    return;
  }
  usage();
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    main(process.argv.slice(2), process.cwd());
  } catch (error) {
    if (!(error instanceof Refusal)) throw error;
    process.stderr.write(`sandbox: ${error.message}\n`);
    process.exit(error.exitCode);
  }
}
