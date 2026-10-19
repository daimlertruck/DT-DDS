import { featuresOf } from './features.mts';
import { type Issue } from './issue.mts';
import { type LaneId } from '../stage-table.mts';

export const CRITERIA: Readonly<Record<LaneId, string>> = {
  0: 'Express: type bug, chore or docs; no needs:rfc; no public API, visual, a11y or token change; the Possible solution states the change (files, values; not options); every file named for change is a manifest, config or doc (a manifest change may name only its packages), in 1–3 packages or named by path; no Ask-first or off-limits path; not priority:p0 on a non-bug. Source fixes go to Lane 1 unless the human passes --lane 0',
  1: 'Standard: a non-breaking bug or enhancement in ≤ 2 component packages, no new public API',
  2: 'Full: an RFC-backed feature, a public API change, behaviour across several packages, a11y, token or visual work, design artifacts',
  escalate:
    'Escalate: a breaking change, a deprecation, an unclear feature-vs-enhancement call, a missing RFC, or not pipeline work; stop after intake, a maintainer decides',
};

export interface Verdict {
  readonly lane: LaneId;
  readonly confidence: number;
  readonly reasons: readonly string[];
}

// What Lane 0 may change: no review stage follows it.
const MANIFEST = /(?:^|\/)package\.json$/;
const CONFIG =
  /(?:^|\/)(?:tsconfig[\w.-]*\.json|turbo\.json|\.npmrc|\.nvmrc|\.editorconfig|\.prettierrc[\w.-]*|\.eslintrc[\w.-]*|(?:eslint|jest|tsup|vite)\.config\.[cm]?[jt]s)$/;
const DOC = /\.mdx?$/i;

const decide = (
  lane: LaneId,
  confidence: number,
  reasons: readonly string[]
): Verdict => ({ lane, confidence, reasons });

// The rules, in order; the first that holds decides. Every reason names the criterion it checked.
export const classify = (issue: Issue): Verdict => {
  const f = featuresOf(issue);
  const has = (name: string): boolean => f.signals.includes(name);
  const packages = `${f.packages.length} package(s) named${
    f.packages.length ? ` (${f.packages.join(', ')})` : ''
  }`;
  const notes = f.toolOwned.map(
    (file) =>
      `names ${file}: tool-owned, changed by its tool and never by hand; not counted`
  );

  if (f.bangTitle || has('breaking')) {
    return decide('escalate', 0.9, [
      'breaking change named (`!` or "breaking change")',
      ...notes,
    ]);
  }
  if (has('deprecation')) {
    return decide('escalate', 0.85, ['deprecation named', ...notes]);
  }
  if (f.needsRfc) {
    return decide('escalate', 0.9, [
      'needs:rfc: the RFC is missing or not approved',
      ...notes,
    ]);
  }
  if (f.type === 'question') {
    return decide('escalate', 0.9, [
      'type:question is not pipeline work',
      ...notes,
    ]);
  }
  if (f.priority === 'p0' && f.type !== 'bug') {
    return decide('escalate', 0.85, [
      `priority:p0 on type:${
        f.type ?? 'none'
      }: a critical or architecture change (ADR route)`,
      ...notes,
    ]);
  }
  if (f.type === 'feature') {
    return has('rfc')
      ? decide('2', 0.85, [
          'type:feature with an RFC named',
          packages,
          ...notes,
        ])
      : decide('escalate', 0.8, [
          'type:feature without an RFC named (missing RFC)',
          ...notes,
        ]);
  }
  if (f.type === 'enhancement' && has('api')) {
    return decide('escalate', 0.75, [
      'type:enhancement that names a new or changed public API: feature or enhancement is unclear',
      ...notes,
    ]);
  }

  const lane2 = ['api', 'visual', 'a11y'].filter(has);
  if (lane2.length) {
    return decide('2', f.type ? 0.8 : 0.5, [
      `${lane2.join(', ')} work named`,
      `type:${f.type ?? 'none'}`,
      packages,
      ...notes,
    ]);
  }
  if (!f.type) return decide('1', 0.4, ['no type:* label', packages, ...notes]);

  const blocked = [
    ...f.offLimits.map((path) => `off-limits path named: ${path}`),
    ...f.askFirst.map(
      (path) => `Ask-first path named: ${path} (consent at G1)`
    ),
  ];
  const expressType = ['bug', 'chore', 'docs'].includes(f.type);
  // A manifest change may name its packages instead of their package.json files.
  const implicitManifests =
    !f.changeFiles.length && f.manifestChange && f.packages.length > 0;
  const stated =
    f.solutionStated &&
    !f.solutionHedged &&
    (f.changeFiles.length > 0 || implicitManifests);
  const sourceFiles = f.changeFiles.filter(
    (path) => ![MANIFEST, CONFIG, DOC].some((pattern) => pattern.test(path))
  );
  const sized =
    f.packages.length <= 3 &&
    (f.packages.length > 0 || f.changeFiles.length > 0);
  if (
    expressType &&
    stated &&
    !blocked.length &&
    !sourceFiles.length &&
    sized
  ) {
    const kind =
      implicitManifests || f.changeFiles.every((path) => MANIFEST.test(path))
        ? 'manifest'
        : f.changeFiles.every((path) => DOC.test(path))
        ? 'docs'
        : 'manifest, config or docs';
    return decide('0', 0.9, [
      `type:${f.type}, no needs:rfc, no API, visual, a11y or token work named`,
      `the Possible solution states the change (${
        implicitManifests
          ? 'package.json of the named packages'
          : `files named for change: ${f.changeFiles.join(', ')}`
      }${f.solutionNamesValues ? '; values' : ''})`,
      packages,
      `${kind} change in ≤ 3 packages`,
      'no off-limits or Ask-first path named',
      ...notes,
    ]);
  }

  const why0 = [
    ...(expressType ? [] : [`type:${f.type} is not a Lane 0 type`]),
    ...(expressType && !stated
      ? [
          f.solutionHedged
            ? 'the solution offers options or a direction, not the change'
            : 'the issue does not state the change (no Possible solution naming the files, or a manifest change naming its packages)',
        ]
      : []),
    ...blocked,
    ...(expressType && stated && sourceFiles.length > 0
      ? [
          `source file named for change: ${sourceFiles.join(
            ', '
          )} (source fixes go to Lane 1; the human may pass --lane 0)`,
        ]
      : []),
    ...(expressType &&
    stated &&
    !blocked.length &&
    !sourceFiles.length &&
    !sized
      ? [`too large for Lane 0 (${packages})`]
      : []),
  ];
  // Many packages of docs or manifests is breadth, not cross-package behaviour.
  if (f.packages.length <= 2 || f.manifestChange || f.type === 'docs') {
    return decide('1', f.packages.length ? 0.8 : 0.6, [
      `type:${f.type}, no API, visual, a11y or token work named`,
      packages,
      ...why0,
      ...notes,
    ]);
  }
  return decide('2', 0.75, [
    `behaviour across ${f.packages.length} packages (${f.packages.join(', ')})`,
    ...why0,
    ...notes,
  ]);
};
