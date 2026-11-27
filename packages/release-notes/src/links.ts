import type { Section } from './conventional';

const DEFAULT_REPOSITORY = 'daimlertruck/DT-DDS';

export const repoSlug = (): string =>
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- read at run time by the CLI, never a build input
  process.env.GITHUB_REPOSITORY ?? DEFAULT_REPOSITORY;

const repoUrl = (): string => `https://github.com/${repoSlug()}`;

export const pullRequestUrl = (pullRequest: number): string =>
  `${repoUrl()}/pull/${pullRequest}`;

export const commitUrl = (sha: string): string => `${repoUrl()}/commit/${sha}`;

export const compareUrl = (from: string, to: string): string =>
  `${repoUrl()}/compare/${from}...${to}`;

const majorOf = (version: string): number =>
  Number.parseInt(version.split('.')[0], 10);

const isMajorRelease = (version: string): boolean =>
  /^\d+\.0\.0$/.test(version);

const migrationMajor = (version: string, section: Section): number => {
  const major = majorOf(version);
  if (section === 'Breaking changes' && isMajorRelease(version)) return major;
  return major + 1;
};

export const migrationGuideUrl = (
  version: string,
  section: Section
): string => {
  const major = migrationMajor(version, section);
  return `${repoUrl()}/blob/main/docs/upgrading/${major}.0.0.md`;
};
