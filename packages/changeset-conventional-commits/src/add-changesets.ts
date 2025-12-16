import { execSync } from 'child_process';
import fs from 'fs';

import readChangeset from '@changesets/read';
import writeChangeset from '@changesets/write';
import { getPackagesSync } from '@manypkg/get-packages';

import {
  associateCommitsToConventionalCommitMessages,
  conventionalMessagesWithCommitsToChangesets,
  difference,
  getCommitsSinceRef,
  writePackageNamesToBeTagged,
} from './utils';
import { CHANGESET_CONFIG_FILE_LOCATION } from './utils/constants';

export const conventionalCommitChangeset = async (
  cwd: string = process.cwd(),
  options: { ignoredFiles: (string | RegExp)[] } = { ignoredFiles: [] }
) => {
  const changesetConfig = JSON.parse(
    fs.readFileSync(CHANGESET_CONFIG_FILE_LOCATION).toString()
  );

  const { baseBranch = 'main', ignore } = changesetConfig;

  const packages = getPackagesSync(cwd).packages.filter(
    (pkg) =>
      !pkg.packageJson.private &&
      Boolean(pkg.packageJson.version) &&
      !ignore.includes(pkg.packageJson.name)
  );

  const commitsSinceBase = getCommitsSinceRef(baseBranch);

  const commitsWithMessages = commitsSinceBase.map((commitHash) => ({
    commitHash,
    commitMessage: execSync(
      `git log -n 1 --pretty=format:%s ${commitHash}`
    ).toString(),
  }));

  const changelogMessagesWithAssociatedCommits =
    associateCommitsToConventionalCommitMessages(commitsWithMessages);

  const changesets = conventionalMessagesWithCommitsToChangesets(
    changelogMessagesWithAssociatedCommits,
    {
      ignoredFiles: options.ignoredFiles,
      packages,
    }
  );

  const currentChangesets = await readChangeset(cwd);

  const newChangesets =
    currentChangesets.length === 0
      ? changesets
      : difference(changesets, currentChangesets);

  // Include packages from BOTH auto-generated AND existing manual changesets
  const allAffectedPackages = [
    ...newChangesets
      .map(({ releases }) => releases.map(({ name }) => name))
      .flat(),
    ...currentChangesets
      .map(({ releases }) => releases.map(({ name }) => name))
      .flat(),
  ];

  writePackageNamesToBeTagged([...new Set(allAffectedPackages)]);

  newChangesets.forEach((changeset) => writeChangeset(changeset, cwd));
};
