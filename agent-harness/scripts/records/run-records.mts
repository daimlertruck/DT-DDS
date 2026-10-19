// What a run record keeps from a work dir (ds-run-pipeline → Retention). Shared by record-run.mts,
// which copies these files, and prune-work.mts, which deletes a work dir only once they are recorded.
// Also the run-log table contract (ds-run-pipeline → Run log): run-stage.mts and run.mts write the
// rows, record-run.mts and reconcile-usage.mts read them, all through the functions and types below.

import { createHash } from 'node:crypto';
import { lstatSync, readdirSync, readFileSync, type Stats } from 'node:fs';
import { join, sep } from 'node:path';

export const WORK_DIR = '.local/agent-harness/work';
export const DEFAULT_RECORDS_DIR = '.local/agent-harness/runs';
export const ID_PATTERN = /^(?:(\d+)|PR-(\d+))$/;

export const CORE_REPORTS: readonly string[] = [
  'run-log.md',
  'intake-decisions.md',
  'context-bundle.md',
  'architecture-notes.md',
  'implementation-plan.md',
  'express-plan.md',
  'validation-report.md',
  'code-review-report.md',
  'review-spec.md',
  'review-api.md',
  'review-a11y.md',
  'review-tokens.md',
  'pr-draft.md',
  'pr-body.md',
  'comment-resolution-plan.md',
  'replies.md',
  'cost-audit.md',
];

const FOLLOW_UP_DRAFT = /^issue-.+\.md$/;

// A file a record keeps: `source` in the work dir, `target` relative to the record dir.
export interface RecordableFile {
  readonly source: string;
  readonly target: string;
}

const lstatOrNull = (path: string): Stats | null => {
  try {
    return lstatSync(path);
  } catch {
    return null;
  }
};

export const isFile = (path: string): boolean =>
  Boolean(lstatOrNull(path)?.isFile());
export const isDirectory = (path: string): boolean =>
  Boolean(lstatOrNull(path)?.isDirectory());
export const isInside = (path: string, dir: string): boolean =>
  path === dir || path.startsWith(`${dir}${sep}`);

export const sha256 = (path: string): string =>
  createHash('sha256').update(readFileSync(path)).digest('hex');

export const filesUnder = (dir: string): string[] =>
  readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((entry) => isFile(join(dir, entry)))
    .sort();

export const recordableFiles = (workDir: string): RecordableFile[] => {
  const snapshots = join(workDir, 'snapshots');
  return [
    ...CORE_REPORTS.filter((name) => isFile(join(workDir, name))).map(
      (name) => ({
        source: join(workDir, name),
        target: `artifacts/${name}`,
      })
    ),
    // issue.json is the classifier's input and lane.json its verdict: together the lane calibration data.
    ...['issue.json', 'lane.json']
      .filter((name) => isFile(join(workDir, name)))
      .map((name) => ({ source: join(workDir, name), target: name })),
    ...(isDirectory(snapshots)
      ? filesUnder(snapshots).map((entry) => ({
          source: join(snapshots, entry),
          target: `snapshots/${entry}`,
        }))
      : []),
    ...readdirSync(workDir)
      .filter(
        (name) => FOLLOW_UP_DRAFT.test(name) && isFile(join(workDir, name))
      )
      .sort()
      .map((name) => ({
        source: join(workDir, name),
        target: `followups/${name}`,
      })),
  ];
};

// --- run log ---------------------------------------------------------------------------------

// A table row read back: each cell keyed by its column header in camelCase (`columnKey`).
export type TableRow = Readonly<Record<string, string>>;

// A row to append: its cells in the table's column order. A cell is written as `String(cell)`.
export type TableCells = readonly (string | number)[];

// One Dispatches row read back as numbers: what record-run.mts and reconcile-usage.mts compare.
// `null` is unknown (an em dash, a cumulative cell, a time that includes waiting for the human).
export interface Dispatch {
  readonly dispatch: number;
  readonly stage: string;
  readonly continuation: boolean;
  readonly started: string | null;
  readonly seconds: number | null;
  readonly model: string | null;
  readonly requests: number | null;
  readonly uncachedIn: number | null;
  readonly cacheWrite: number | null;
  readonly cacheRead: number | null;
  readonly output: number | null;
  readonly predictedUsd: number | null;
  readonly reportedUsd: number | null;
  readonly finalContext: number | null;
  readonly claudeCode: string | null;
  readonly status: string;
}

// One Dispatches row per model per dispatch. Rows of one dispatch share stage and started; the first
// is the main loop's model and alone carries wall time, final_context and the status line.
export const DISPATCH_COLUMNS: readonly string[] = [
  'stage',
  'started',
  'wall time (s)',
  'model',
  'requests',
  'uncached_in',
  'cache_write',
  'cache_read',
  'output',
  'predicted_usd',
  'reported_usd',
  'final_context',
  'claude_code',
  'status line',
];

export const cellsOf = (line: string): string[] =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/(?<!\\)\|$/, '')
    .split(/(?<!\\)\|/)
    .map((cell) => cell.replace(/\\([\\|])/g, '$1').trim());

export const columnKey = (header: string): string =>
  header
    .replace(/\(.*?\)/g, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map((word, index) =>
      index ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join('');

interface Section {
  readonly start: number;
  readonly end: number;
}

const sectionOf = (
  lines: readonly string[],
  heading: string
): Section | null => {
  const start = lines.findIndex((line) =>
    line.trim().toLowerCase().startsWith(`## ${heading}`)
  );
  if (start < 0) return null;
  const next = lines
    .slice(start + 1)
    .findIndex((line) => line.startsWith('## '));
  return { start, end: next < 0 ? lines.length : start + 1 + next };
};

export const tableUnder = (markdown: string, heading: string): TableRow[] => {
  const lines = markdown.split('\n');
  const section = sectionOf(lines, heading);
  if (!section) return [];
  const rows = lines
    .slice(section.start + 1, section.end)
    .filter((line) => line.trim().startsWith('|'));
  if (rows.length < 2) return [];
  const [header = [], , ...body] = rows.map(cellsOf);
  const keys = header.map(columnKey);
  return body.map((cells) =>
    Object.fromEntries(keys.map((key, index) => [key, cells[index] ?? '']))
  );
};

export const textOrNull = (cell: string | undefined): string | null =>
  !cell || cell === '—' || cell === '-' ? null : cell;
export const numberIn = (cell = ''): number | null => {
  const match = cell.replace(/(\d),(\d)/g, '$1$2').match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
};

// Each row holds its own increment. A cell marked "cumulative" (a hand-written running total) or a time
// that includes waiting for the human is not an increment: it is recorded as unknown, never
// subtracted. Older run logs name the final-context column `tokens`.
// `dispatch` numbers the dispatches: a row with the same stage and started as the row before it is
// another model in the same dispatch.
export const dispatchesOf = (rows: readonly TableRow[]): Dispatch[] =>
  rows.reduce<Dispatch[]>((dispatches, row) => {
    const amount = (cell: string | undefined): number | null =>
      /cumulative|\bwait/i.test(cell ?? '') ? null : numberIn(cell);
    const stage = ((row.stage ?? '').split(' (')[0] ?? '').trim();
    const started = textOrNull(row.started);
    const previous = dispatches.at(-1);
    const sameDispatch =
      started !== null &&
      previous !== undefined &&
      previous.stage === stage &&
      previous.started === started;
    return [
      ...dispatches,
      {
        dispatch: sameDispatch
          ? previous.dispatch
          : (previous?.dispatch ?? 0) + 1,
        stage,
        continuation: /\(contin/i.test(row.stage ?? ''),
        started,
        seconds: amount(row.wallTime),
        model: textOrNull(row.model),
        requests: amount(row.requests),
        uncachedIn: amount(row.uncachedIn),
        cacheWrite: amount(row.cacheWrite),
        cacheRead: amount(row.cacheRead),
        output: amount(row.output),
        predictedUsd: amount(row.predictedUsd),
        reportedUsd: amount(row.reportedUsd),
        finalContext: amount(row.finalContext ?? row.tokens),
        claudeCode: textOrNull(row.claudeCode),
        status: row.statusLine ?? '',
      },
    ];
  }, []);

// A cell is one line: `\` is escaped before `|`, as GFM reads them, and a line break (a multi-line
// gate reply) becomes `<br>`. A space before every delimiter keeps `cellsOf`'s split exact.
const rowLine = (cells: TableCells): string =>
  `| ${cells
    .map((cell) =>
      String(cell)
        .replace(/\\/g, '\\\\')
        .replace(/\|/g, '\\|')
        .replace(/\r?\n/g, '<br>')
    )
    .join(' | ')} |`;

export const GATE_COLUMNS: readonly string[] = [
  'gate',
  'presented',
  'decided',
  'decision',
  'snapshot',
  'note',
];

// Appends rows (cells in `columns` order) to the table under `## <heading>`, adding the section or
// the table when missing. Throws when the table has other columns: mixing two layouts in one table
// would make every row ambiguous.
export const withTableRows = (
  markdown: string,
  heading: string,
  columns: readonly string[],
  rows: readonly TableCells[]
): string => {
  const header = rowLine(columns);
  const separator = `|${columns.map(() => '---').join('|')}|`;
  const body = rows.map(rowLine);
  const lines = markdown.split('\n');
  const section = sectionOf(lines, heading.toLowerCase());
  if (!section) {
    return `${markdown.replace(/\n*$/, '')}\n\n## ${heading}\n\n${[
      header,
      separator,
      ...body,
    ].join('\n')}\n`;
  }
  const tableLines = lines
    .map((line, index) => ({ line, index }))
    .filter(
      ({ line, index }) =>
        index > section.start &&
        index < section.end &&
        line.trim().startsWith('|')
    );
  const first = tableLines[0];
  if (!first) {
    return [
      ...lines.slice(0, section.start + 1),
      '',
      header,
      separator,
      ...body,
      ...lines.slice(section.start + 1),
    ].join('\n');
  }
  const headers = cellsOf(first.line);
  if (headers.map(columnKey).join() !== columns.map(columnKey).join()) {
    const found = headers.join(' · ');
    throw new Error(`the ${heading} table has other columns (${found})`);
  }
  const after = (tableLines.at(-1) ?? first).index + 1;
  return [...lines.slice(0, after), ...body, ...lines.slice(after)].join('\n');
};

export const withDispatchRows = (
  markdown: string,
  rows: readonly TableCells[]
): string => withTableRows(markdown, 'Dispatches', DISPATCH_COLUMNS, rows);

// One row per gate presentation (ds-run-pipeline → Run log; record-run.mts reads it by name).
export const withGateRows = (
  markdown: string,
  rows: readonly TableCells[]
): string => withTableRows(markdown, 'Gate decisions', GATE_COLUMNS, rows);

// Changes to the branch or the environment made outside a stage's own commits (ds-run-pipeline → Human
// actions between gates); run.mts writes one for its autosquash.
export const HUMAN_ACTION_COLUMNS: readonly string[] = [
  'when (UTC start and end)',
  'kind',
  'action',
  'before → after (HEAD, tree)',
  'evidence',
  'evidence made stale',
];
export const withHumanActionRows = (
  markdown: string,
  rows: readonly TableCells[]
): string =>
  withTableRows(
    markdown,
    'Human actions between gates',
    HUMAN_ACTION_COLUMNS,
    rows
  );
