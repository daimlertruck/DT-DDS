import { execSync } from 'child_process';
import fs from 'fs';

import { getPackagesSync } from '@manypkg/get-packages';

import {
  CHANGESET_PRERELEASE_FILE_LOCATION,
  CHANGESET_TAGS_FILE_LOCATION,
} from './utils/constants';

const removePrereleaseChangesets = () => {
  const preReleaseFile = fs.existsSync(CHANGESET_PRERELEASE_FILE_LOCATION)
    ? JSON.parse(fs.readFileSync(CHANGESET_PRERELEASE_FILE_LOCATION).toString())
    : null;

  if (!preReleaseFile) return;

  preReleaseFile.changesets = [];

  fs.writeFileSync(
    CHANGESET_PRERELEASE_FILE_LOCATION,
    JSON.stringify(preReleaseFile)
  );

  execSync('git clean -f -q -- .changeset/*.md');
};

export const addTag = () => {
  try {
    const tagPackagesNames: string[] = fs.existsSync(
      CHANGESET_TAGS_FILE_LOCATION
    )
      ? JSON.parse(fs.readFileSync(CHANGESET_TAGS_FILE_LOCATION).toString())
      : [];

    if (!tagPackagesNames.length) {
      console.log('\u001b[32m There is no affected packages. \x1b[0m');
      return;
    }

    removePrereleaseChangesets();
    execSync('git add -A && git commit -m "chore(release): version packages"');

    const tagPackages = getPackagesSync(process.cwd()).packages.filter((pkg) =>
      tagPackagesNames.includes(pkg.packageJson.name)
    );

    tagPackages.forEach((tagPackage) => {
      try {
        const tag = `${tagPackage.packageJson.name}@${tagPackage.packageJson.version}`;
        execSync(`git tag ${tag}`);

        console.log(`\u001b[32m New tag: ${tag} \x1b[0m`);
      } catch (error) {
        console.log(`\u001b[31m ${error} \x1b[0m`);
      }
    });
  } catch (error) {
    console.log(`\u001b[31m ${error} \x1b[0m`);
  }
};
