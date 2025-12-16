#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

import { getPackagesSync } from '@manypkg/get-packages';

// Pure function to filter DT packages
const filterDtPackages = (packages) =>
  packages.filter(
    (pkg) =>
      pkg.packageJson.name.startsWith('@dt-dds/') &&
      pkg.dir.includes('/packages/')
  );

// Pure function to create package info object
const createPackageInfo = (pkg) => ({
  name: pkg.packageJson.name,
  version: 'N/A',
  path: pkg.dir.split('/packages/')[1],
});

// Pure function to fetch package version (returns a promise)
const fetchPackageVersion = async (name) => {
  try {
    const res = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(name)}/latest`
    );
    if (res.ok) {
      const data = await res.json();
      return data.version;
    }
    return 'N/A';
  } catch (e) {
    console.warn(`Failed to fetch version for ${name}:`, e.message);
    return 'N/A';
  }
};

// Pure function to update package info with version
const updatePackageWithVersion = async (packageInfo) => ({
  ...packageInfo,
  version: await fetchPackageVersion(packageInfo.name),
});

// Pure function to create table row
const createTableRow = ({ name, version, path }) =>
  `| [\`${name}\`](https://github.com/daimlertruck/DT-DDS/tree/main/packages/${path}) | ${version} |`;

// Pure function to build markdown table
const buildMarkdownTable = (packages) => {
  const header = '| Package | Version |';
  const divider = '|---------|---------|';
  const rows = packages.map(createTableRow);

  return [header, divider, ...rows].join('\n');
};

// Pure function to update README content
const updateReadmeContent = (readme, tableSection) => {
  const startTag = '<!-- PACKAGES_TABLE_START -->';
  const endTag = '<!-- PACKAGES_TABLE_END -->';
  const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'm');
  const replacement = `${startTag}\n${tableSection}\n${endTag}`;

  return readme.replace(regex, replacement);
};

// Pure function to read file content
const readFileContent = (filePath) => fs.readFileSync(filePath, 'utf8');

// Side effect function to write file content
const writeFileContent = (filePath, content) => {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('README.md updated with package table.');
};

// Main function - orchestrates the flow
async function main() {
  const root = process.cwd();
  const readmePath = path.join(root, 'README.md');

  // Read README content
  const readme = readFileContent(readmePath);

  // Discover and filter packages
  const { packages } = getPackagesSync(root);
  const dtPackages = filterDtPackages(packages);

  // Create package info objects
  const createInfo = createPackageInfo;
  const packageInfos = dtPackages.map(createInfo);

  // Fetch versions for all packages (in parallel for better performance)
  const packagesWithVersions = await Promise.all(
    packageInfos.map(updatePackageWithVersion)
  );

  // Build markdown table
  const tableSection = buildMarkdownTable(packagesWithVersions);

  // Update README content
  const newReadme = updateReadmeContent(readme, tableSection);

  // Write updated content
  writeFileContent(readmePath, newReadme);
}

// Error handling wrapper
const runWithErrorHandling = async (fn) => {
  try {
    await fn();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Execute main function with error handling
runWithErrorHandling(main);
