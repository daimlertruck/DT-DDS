import { readFileSync } from 'fs';
import path from 'path';

import { publishGitHubRelease } from './github-release';

const TAG_PREFIX = '@dt-dds/react@';

const UMBRELLA_PACKAGE_JSON = path.resolve(
  __dirname,
  '../../dt-dds-react/package.json'
);

const readUmbrellaVersion = (): string =>
  JSON.parse(readFileSync(UMBRELLA_PACKAGE_JSON, 'utf8')).version;

const versionFromTag = (tag: string): string => {
  if (!tag.startsWith(TAG_PREFIX)) {
    throw new Error(`--tag must look like ${TAG_PREFIX}<version>, got ${tag}`);
  }
  return tag.slice(TAG_PREFIX.length);
};

const optionValue = (argv: string[], name: string): string | undefined => {
  const index = argv.indexOf(name);
  return index === -1 ? undefined : argv[index + 1] ?? '';
};

export const main = async (argv: string[]): Promise<void> => {
  try {
    const tag = optionValue(argv, '--tag');
    const version =
      tag === undefined ? readUmbrellaVersion() : versionFromTag(tag);
    await publishGitHubRelease({ version, dryRun: argv.includes('--dry-run') });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
};

if (require.main === module) void main(process.argv.slice(2));
