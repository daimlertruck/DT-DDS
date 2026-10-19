// Keeps agent tool skill dirs as per-skill links into the canonical `.agents/skills/`.
// Usage: node agent-harness/scripts/sync-skills.mts [--fix] [--json] [--root <repo>]
//   default: check only (exit 1 when anything needs attention)
//   --fix:   link missing skills, adopt skills other agents created, drop broken links
//   --json:  print {"systemMessage": ...} when something was reported; always exit 0 (SessionStart hook)

import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readlinkSync,
  realpathSync,
  renameSync,
  symlinkSync,
  unlinkSync,
  type Stats,
} from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const CANONICAL_DIR = '.agents/skills';

interface ToolDir {
  readonly dir: string;
  readonly createIfMissing: boolean;
}

const TOOL_DIRS: readonly ToolDir[] = [
  { dir: '.claude/skills', createIfMissing: true },
  { dir: '.codex/skills', createIfMissing: false },
  { dir: '.cursor/skills', createIfMissing: false },
  { dir: '.gemini/skills', createIfMissing: false },
  { dir: '.opencode/skills', createIfMissing: false },
  { dir: '.pi/skills', createIfMissing: false },
];

export type FindingType =
  | 'conflict'
  | 'missing-link'
  | 'adopt'
  | 'broken-link'
  | 'replace-dir-link'
  | 'missing-dir'
  | 'foreign-link'
  | 'linked';

const BLOCKING: ReadonlySet<FindingType> = new Set<FindingType>([
  'conflict',
  'missing-link',
  'adopt',
  'broken-link',
  'replace-dir-link',
  'missing-dir',
]);

// One thing found, `path` relative to the repo; `fixed` when --fix resolved it.
export interface Finding {
  readonly type: FindingType;
  readonly path: string;
  readonly fixed: boolean;
}

export interface SyncOptions {
  readonly root: string;
  readonly fix: boolean;
}

interface Sync extends SyncOptions {
  readonly canonical: string;
}

export interface SyncOutput {
  readonly stdout: string;
  readonly exitCode: 0 | 1;
}

const lstatOrNull = (path: string): Stats | null => {
  try {
    return lstatSync(path);
  } catch {
    return null;
  }
};

const isSkillDir = (path: string): boolean =>
  lstatOrNull(path)?.isDirectory() === true &&
  existsSync(join(path, 'SKILL.md'));

const listSkills = (dir: string): string[] =>
  existsSync(dir)
    ? readdirSync(dir).filter(
        (name) => !name.startsWith('.') && isSkillDir(join(dir, name))
      )
    : [];

const isInside = (child: string, parent: string): boolean =>
  child === parent || child.startsWith(parent + sep);

const findingOf = (
  { root }: Sync,
  type: FindingType,
  path: string,
  fixed: boolean
): Finding => ({ type, path: relative(root, path), fixed });

// The tool dir to sync (null when there is none to sync) and what was found on the way.
const ensureToolDir = (
  sync: Sync,
  { dir, createIfMissing }: ToolDir
): { readonly toolDir: string | null; readonly findings: Finding[] } => {
  const { root, fix } = sync;
  const toolDir = join(root, dir);
  const stat = lstatOrNull(toolDir);
  if (stat?.isSymbolicLink()) {
    if (fix) {
      unlinkSync(toolDir);
      mkdirSync(toolDir, { recursive: true });
    }
    return {
      toolDir: fix ? toolDir : null,
      findings: [findingOf(sync, 'replace-dir-link', toolDir, fix)],
    };
  }
  if (stat) return { toolDir, findings: [] };
  if (!createIfMissing) return { toolDir: null, findings: [] };
  if (fix) mkdirSync(toolDir, { recursive: true });
  return {
    toolDir: fix ? toolDir : null,
    findings: [findingOf(sync, 'missing-dir', toolDir, fix)],
  };
};

const reconcileEntry = (
  sync: Sync,
  toolDir: string,
  name: string
): Finding[] => {
  const { canonical, fix } = sync;
  const entry = join(toolDir, name);
  if (lstatSync(entry).isSymbolicLink()) {
    const target = resolve(dirname(entry), readlinkSync(entry));
    if (!existsSync(target)) {
      if (fix) unlinkSync(entry);
      return [findingOf(sync, 'broken-link', entry, fix)];
    }
    return isInside(target, canonical)
      ? []
      : [findingOf(sync, 'foreign-link', entry, false)];
  }
  if (!isSkillDir(entry)) return [];
  if (existsSync(join(canonical, name))) {
    return [findingOf(sync, 'conflict', entry, false)];
  }
  if (fix) {
    mkdirSync(canonical, { recursive: true });
    renameSync(entry, join(canonical, name));
    symlinkSync(relative(toolDir, join(canonical, name)), entry);
  }
  return [findingOf(sync, 'adopt', entry, fix)];
};

const reconcileEntries = (sync: Sync, toolDir: string): Finding[] =>
  readdirSync(toolDir)
    .filter((name) => !name.startsWith('.'))
    .flatMap((name) => reconcileEntry(sync, toolDir, name));

const linkMissingSkills = (sync: Sync, toolDir: string): Finding[] => {
  const { canonical, fix } = sync;
  return listSkills(canonical)
    .filter((name) => !lstatOrNull(join(toolDir, name)))
    .map((name) => {
      const link = join(toolDir, name);
      if (fix) symlinkSync(relative(toolDir, join(canonical, name)), link);
      return findingOf(sync, fix ? 'linked' : 'missing-link', link, fix);
    });
};

// Checks (and with `fix`, repairs) every tool dir: first each dir itself, then the entries in it,
// then the canonical skills it lacks.
export const syncSkills = ({ root, fix }: SyncOptions): Finding[] => {
  const sync: Sync = { root, fix, canonical: join(root, CANONICAL_DIR) };
  const ensured = TOOL_DIRS.map((toolDir) => ensureToolDir(sync, toolDir));
  const toolDirs = ensured.flatMap(({ toolDir }) => (toolDir ? [toolDir] : []));
  const dirFindings = ensured.flatMap(({ findings }) => findings);
  const entryFindings = toolDirs.flatMap((dir) => reconcileEntries(sync, dir));
  const linkFindings = toolDirs.flatMap((dir) => linkMissingSkills(sync, dir));
  return [...dirFindings, ...entryFindings, ...linkFindings];
};

export const outputOf = (
  findings: readonly Finding[],
  json: boolean
): SyncOutput => {
  const unresolved = findings.filter(
    ({ type, fixed }) => BLOCKING.has(type) && !fixed
  );
  const lines = findings.map(
    ({ type, path, fixed }) => `${type} ${path}${fixed ? ' (fixed)' : ''}`
  );
  const report = json
    ? JSON.stringify({
        systemMessage: `DT-DDS skills sync: ${lines.join('; ')}`,
      })
    : `${lines.join('\n')}\n`;
  return {
    stdout: lines.length ? report : '',
    exitCode: !json && unresolved.length ? 1 : 0,
  };
};

const main = (args: readonly string[], cwd: string): void => {
  const rootArgIndex = args.indexOf('--root');
  const rootArg = rootArgIndex >= 0 ? args[rootArgIndex + 1] : cwd;
  if (rootArg === undefined) {
    throw new Error('sync-skills: --root needs a value');
  }
  const json = args.includes('--json');
  const findings = syncSkills({
    root: resolve(rootArg),
    fix: args.includes('--fix'),
  });
  const { stdout, exitCode } = outputOf(findings, json);
  if (stdout) process.stdout.write(stdout);
  process.exit(exitCode);
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main(process.argv.slice(2), process.cwd());
}
