import { labelName, type Issue } from './issue.mts';

// What the classifier looks at, kept in lane.json so lane calibration has the inputs.
export interface Features {
  readonly type: string | null;
  readonly priority: string | null;
  readonly needsRfc: boolean;
  readonly solutionStated: boolean;
  readonly solutionHedged: boolean;
  readonly solutionNamesValues: boolean;
  readonly manifestChange: boolean;
  readonly paths: readonly string[];
  readonly packages: readonly string[];
  readonly changeFiles: readonly string[];
  readonly offLimits: readonly string[];
  readonly askFirst: readonly string[];
  readonly toolOwned: readonly string[];
  readonly signals: readonly string[];
  readonly bangTitle: boolean;
}

// AGENTS.md → Off-limits paths. Tool-owned files change through their tool (yarn, changesets); naming
// one is not a hand edit, so it is noted, not counted.
const OFF_LIMITS: readonly RegExp[] = [
  /^\.changeset\//,
  /^packages\/themes\/src\/(?:themes|tokens)\//,
  /^packages\/icons\/src\/codes\.ts$/,
  /\/__snapshots__\//,
];
const ASK_FIRST: readonly RegExp[] = [
  /^\.github\//,
  /^\.husky\//,
  /^turbo\/generators\//,
  /^scripts\//,
  /^packages\/changeset-conventional-commits\//,
];
const TOOL_OWNED = /(?:^|[\s`'"(])(yarn\.lock|CHANGELOG\.md)\b/;
// Tool-owned files are off-limits for a hand edit.
const TOOL_OWNED_FILE = /(?:^|\/)(?:yarn\.lock|CHANGELOG\.md)$/;

// What the issue names. `breaking` is read in the title and body, the others in the body.
const SIGNALS: Readonly<Record<string, RegExp>> = {
  api: /\bnew (?:props?|exports?|components?|variants?|hooks?)\b|\bpublic api\b|\bapi change\b|\brenam(?:e|es|ed|ing) (?:the )?props?\b/i,
  visual:
    /figma\.com\/|\bvisual (?:change|regression|design)\b|\bdesign tokens?\b|\bnew tokens?\b/i,
  a11y: /\bwcag\b|\ba11y\b|\baccessib|\bscreen reader\b|\baria-[a-z]+/i,
  // Our API breaking, not a dependency's "breaking bump".
  breaking: /\bbreaking changes?\b/i,
  deprecation: /\bdeprecat/i,
  rfc: /docs\/rfcs\/|\bRFC[- ]?\d+\b/i,
};
// A manifest change, read in the Possible solution.
const MANIFEST_CHANGE =
  /\b(?:dependencies|devDependencies|peerDependencies|package\.json)\b/;

const EMPTY = /^(?:_no response_|n\/a|none|-)?$/i;
// A solution that offers options or a direction is not a stated change.
const HEDGED =
  /\b(?:could|might|maybe|perhaps|options?|alternatively|investigate|find a way|to choose|to decide|needs a decision)\b/i;
const PATH = /(?<![\w@/.:-])((?:[\w.-]+\/)+[\w.-]+\.[a-z]{1,5})(?::\d+)?/gi;

export const sectionsOf = (body = ''): Readonly<Record<string, string>> =>
  Object.fromEntries(
    body
      .split(/^###\s+/m)
      .slice(1)
      .map((chunk) => {
        const [heading = '', ...rest] = chunk.split('\n');
        return [heading.trim().toLowerCase(), rest.join('\n').trim()];
      })
  );

const unique = (values: readonly string[]): string[] => [...new Set(values)];
const normalize = (path: string): string => path.replace(/^\.?\//, '');
const pathsIn = (text: string): string[] =>
  unique(
    [...text.matchAll(PATH)]
      .flatMap((match) => (match[1] === undefined ? [] : [normalize(match[1])]))
      .filter((path) => !path.includes('://'))
  );

const packageOf = (path: string): string | null =>
  path.match(/^packages\/react-packages\/([\w-]+)\//)?.[1] ??
  path.match(/^packages\/([\w-]+)\//)?.[1] ??
  null;

export const featuresOf = (issue: Issue): Features => {
  const labels = (issue.labels ?? []).map(labelName);
  const body = issue.body ?? '';
  const text = `${issue.title ?? ''}\n${body}`;
  const sections = sectionsOf(body);
  // A template comment left in the field is no solution.
  const solution = (
    sections['possible solution'] ??
    sections['proposed solution'] ??
    ''
  )
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
  const paths = pathsIn(text);
  const packages = unique(
    paths.flatMap((path) => {
      const name = packageOf(path);
      return name ? [name] : [];
    })
  );
  // Files named for change: the paths the solution names, not the evidence in the description.
  const changeFiles = pathsIn(solution);
  return {
    type: labels.find((label) => label.startsWith('type:'))?.slice(5) ?? null,
    priority:
      labels.find((label) => label.startsWith('priority:'))?.slice(9) ?? null,
    needsRfc: labels.includes('needs:rfc'),
    solutionStated: !EMPTY.test(solution),
    solutionHedged: HEDGED.test(solution),
    solutionNamesValues: /`[^`]+`/.test(solution),
    manifestChange: MANIFEST_CHANGE.test(solution),
    paths,
    packages,
    changeFiles,
    // A tool-owned file named for change is a hand edit of it: off-limits.
    offLimits: unique([
      ...paths.filter((path) =>
        OFF_LIMITS.some((pattern) => pattern.test(path))
      ),
      ...changeFiles.filter((path) => TOOL_OWNED_FILE.test(path)),
    ]),
    askFirst: paths.filter((path) =>
      ASK_FIRST.some((pattern) => pattern.test(path))
    ),
    toolOwned: unique(
      [...text.matchAll(new RegExp(TOOL_OWNED, 'g'))].flatMap((match) =>
        match[1] === undefined ? [] : [match[1]]
      )
    ),
    signals: Object.entries(SIGNALS)
      .filter(([name, pattern]) =>
        pattern.test(name === 'breaking' ? text : body)
      )
      .map(([name]) => name),
    bangTitle: /^\w+(?:\([^)]*\))?!:/.test(issue.title ?? ''),
  };
};
