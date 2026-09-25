import { execSync } from 'child_process';
import fs from 'fs';

import { describe, expect, it } from '@jest/globals';
import { getPackagesSync } from '@manypkg/get-packages';

import { addTag } from './add-tag';
import {
  CHANGESET_PRERELEASE_FILE_LOCATION,
  CHANGESET_TAGS_FILE_LOCATION,
} from './utils/constants';

import type { Package, Packages } from '@manypkg/get-packages';

jest.mock('child_process');
jest.mock('fs');
jest.mock('@manypkg/get-packages');

const RELEASE_COMMIT =
  'git add -A && git commit -m "chore(release): version packages"';
const PRERELEASE_CLEANUP = 'git clean -f -q -- .changeset/*.md';

interface WorkspacePackage {
  name: string;
  version: string;
}

interface ReleaseRun {
  tagPackagesFile?: string | null;
  failingCommand?: string;
  failingWorkspaceRead?: boolean;
}

const toPackage = ({ name, version }: WorkspacePackage): Package => ({
  dir: `/repo/packages/${name}`,
  relativeDir: `packages/${name}`,
  packageJson: { name, version },
});

const toWorkspace = (packages: WorkspacePackage[]): Packages => ({
  rootDir: '/repo',
  packages: packages.map(toPackage),
  tool: {
    type: 'yarn',
    isMonorepoRoot: async () => true,
    isMonorepoRootSync: () => true,
    getPackages: async () => toWorkspace(packages),
    getPackagesSync: () => toWorkspace(packages),
  },
});

const WORKSPACE_PACKAGES: WorkspacePackage[] = [
  { name: '@dt-dds/react-a', version: '1.0.0-beta.2' },
  { name: '@dt-dds/react-b', version: '1.0.0-beta.7' },
  { name: '@dt-dds/react-c', version: '1.0.0-beta.4' },
];

const commandFailure = (command: string) =>
  new Error(`Command failed: ${command}`);

const arrangeReleaseRun = ({
  tagPackagesFile = JSON.stringify(['@dt-dds/react-a', '@dt-dds/react-b']),
  failingCommand,
  failingWorkspaceRead = false,
}: ReleaseRun = {}) => {
  jest.resetAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => undefined);

  const files: Readonly<Record<string, string>> = {
    ...(tagPackagesFile === null
      ? {}
      : { [CHANGESET_TAGS_FILE_LOCATION]: tagPackagesFile }),
    [CHANGESET_PRERELEASE_FILE_LOCATION]: JSON.stringify({
      mode: 'pre',
      tag: 'beta',
      changesets: ['spotty-times-nail'],
    }),
  };

  jest
    .mocked(fs.existsSync)
    .mockImplementation((path) => String(path) in files);
  jest
    .mocked(fs.readFileSync)
    .mockImplementation((path) => Buffer.from(files[String(path)]));
  jest.mocked(execSync).mockImplementation((command) => {
    if (command === failingCommand) throw commandFailure(command);
    return Buffer.from('');
  });
  jest.mocked(getPackagesSync).mockImplementation(() => {
    if (failingWorkspaceRead) throw new Error('No monorepo root found');
    return toWorkspace(WORKSPACE_PACKAGES);
  });
};

const executedCommands = () =>
  jest.mocked(execSync).mock.calls.map(([command]) => command);

const tagCommands = () =>
  executedCommands().filter((command) => command.startsWith('git tag'));

describe('addTag', () => {
  it('AC1: fails the run when the release commit fails', () => {
    arrangeReleaseRun({ failingCommand: RELEASE_COMMIT });

    expect(() => addTag()).toThrow(commandFailure(RELEASE_COMMIT));
  });

  it('creates no tag when the release commit fails', () => {
    arrangeReleaseRun({ failingCommand: RELEASE_COMMIT });

    expect(() => addTag()).toThrow();
    expect(tagCommands()).toEqual([]);
  });

  it('fails the run when a git tag fails', () => {
    const failingTag = 'git tag @dt-dds/react-a@1.0.0-beta.2';
    arrangeReleaseRun({ failingCommand: failingTag });

    expect(() => addTag()).toThrow(commandFailure(failingTag));
  });

  it('stops tagging at the first failing git tag', () => {
    arrangeReleaseRun({
      failingCommand: 'git tag @dt-dds/react-a@1.0.0-beta.2',
    });

    expect(() => addTag()).toThrow();
    expect(tagCommands()).toEqual(['git tag @dt-dds/react-a@1.0.0-beta.2']);
  });

  it('commits once and tags every affected package', () => {
    arrangeReleaseRun();

    expect(() => addTag()).not.toThrow();
    expect(executedCommands()).toEqual([
      PRERELEASE_CLEANUP,
      RELEASE_COMMIT,
      'git tag @dt-dds/react-a@1.0.0-beta.2',
      'git tag @dt-dds/react-b@1.0.0-beta.7',
    ]);
    expect(console.log).toHaveBeenCalledWith(
      '\u001b[32m New tag: @dt-dds/react-a@1.0.0-beta.2 \x1b[0m'
    );
    expect(console.log).toHaveBeenCalledWith(
      '\u001b[32m New tag: @dt-dds/react-b@1.0.0-beta.7 \x1b[0m'
    );
  });

  it('resets the prerelease changesets in pre.json', () => {
    arrangeReleaseRun();

    addTag();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      CHANGESET_PRERELEASE_FILE_LOCATION,
      JSON.stringify({ mode: 'pre', tag: 'beta', changesets: [] })
    );
  });

  it('returns without committing when tag-packages.json is empty', () => {
    arrangeReleaseRun({ tagPackagesFile: JSON.stringify([]) });

    expect(() => addTag()).not.toThrow();
    expect(execSync).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      '\u001b[32m There is no affected packages. \x1b[0m'
    );
  });

  it('returns without committing when tag-packages.json is missing', () => {
    arrangeReleaseRun({ tagPackagesFile: null });

    expect(() => addTag()).not.toThrow();
    expect(execSync).not.toHaveBeenCalled();
  });

  it('fails the run and skips the commit when the prerelease cleanup fails', () => {
    arrangeReleaseRun({ failingCommand: PRERELEASE_CLEANUP });

    expect(() => addTag()).toThrow(commandFailure(PRERELEASE_CLEANUP));
    expect(executedCommands()).not.toContain(RELEASE_COMMIT);
  });

  it('fails the run when tag-packages.json is not valid JSON', () => {
    arrangeReleaseRun({ tagPackagesFile: '["@dt-dds/react-a"' });

    expect(() => addTag()).toThrow(SyntaxError);
    expect(execSync).not.toHaveBeenCalled();
  });

  it('fails the run and creates no tag when the workspace cannot be read', () => {
    arrangeReleaseRun({ failingWorkspaceRead: true });

    expect(() => addTag()).toThrow('No monorepo root found');
    expect(tagCommands()).toEqual([]);
  });
});
