import { parseSubject, SECTION_ORDER, toSection } from './conventional';
import {
  commitUrl,
  compareUrl,
  migrationGuideUrl,
  pullRequestUrl,
} from './links';

import type { ParsedSubject, Section } from './conventional';

export interface ReleaseCommit {
  sha: string;
  subject: string;
  pullRequest: number | null;
}

export interface ReleaseBodyInput {
  version: string;
  tag: string;
  previousTag: string | null;
  date: string;
  commits: ReleaseCommit[];
}

interface Entry {
  section: Section;
  parsed: ParsedSubject;
  commit: ReleaseCommit;
}

const NO_CHANGES = 'No listed changes in this release.';

const SECTIONS_WITH_MIGRATION: readonly Section[] = [
  'Breaking changes',
  'Deprecated',
];

const toEntry = (commit: ReleaseCommit): Entry | null => {
  const parsed = parseSubject(commit.subject);
  const section = parsed === null ? null : toSection(parsed);
  return parsed === null || section === null
    ? null
    : { section, parsed, commit };
};

const referenceLink = ({ sha, pullRequest }: ReleaseCommit): string =>
  pullRequest === null
    ? `[${sha.slice(0, 7)}](${commitUrl(sha)})`
    : `[#${pullRequest}](${pullRequestUrl(pullRequest)})`;

const renderEntry = (version: string, entry: Entry): string => {
  const { scope, description } = entry.parsed;
  const prefix = scope ? `${scope}: ` : '';
  const migration = SECTIONS_WITH_MIGRATION.includes(entry.section)
    ? ` [Migration guide](${migrationGuideUrl(version, entry.section)})`
    : '';
  const reference = referenceLink(entry.commit);
  return `- ${prefix}${description} (${reference})${migration}`;
};

const dateLine = ({ date, previousTag, tag }: ReleaseBodyInput): string => {
  if (previousTag === null) return `Released on ${date}.`;
  const compare = compareUrl(previousTag, tag);
  return `Released on ${date}. [Compare with ${previousTag}](${compare}).`;
};

export const renderReleaseBody = (input: ReleaseBodyInput): string => {
  const entries = input.commits
    .map(toEntry)
    .filter((entry): entry is Entry => entry !== null);

  const sections = SECTION_ORDER.map((section) => ({
    section,
    lines: entries
      .filter((entry) => entry.section === section)
      .map((entry) => renderEntry(input.version, entry)),
  }))
    .filter(({ lines }) => lines.length > 0)
    .map(({ section, lines }) => [`### ${section}`, '', ...lines].join('\n'));

  const content = sections.length > 0 ? sections.join('\n\n') : NO_CHANGES;
  return `${dateLine(input)}\n\n${content}`;
};
