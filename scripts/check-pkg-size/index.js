#!/usr/bin/env node
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import { promisify } from 'util';

import { getPackagesSync } from '@manypkg/get-packages';

import { compareToBaseline, formatReport } from './compare.js';
import { filterDtPackages, runWithErrorHandling, sh } from '../utils/index.js';

const gzip = promisify(zlib.gzip);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const baselinePath = path.join(scriptDir, 'baseline.json');
const reportsPath = path.join(scriptDir, 'results');

const getPackagePackStats = async (packageInfo) => {
  const { stdout } = await sh(
    `cd ${packageInfo.relativeDir} && npm pack --dry-run --json`
  );
  const [packageSizeInfo] = JSON.parse(stdout);
  return packageSizeInfo;
};

const getGzipSizeForPackage = async (packageInfo) => {
  const indexFile = `${packageInfo.relativeDir}/dist/index.mjs`;
  try {
    const fileBuffer = await fsPromises.readFile(indexFile);
    const result = await gzip(fileBuffer);
    return result.length;
  } catch {
    return 0;
  }
};

const getPackageSizeStats = async (packageInfo) => {
  const packagePackStats = await getPackagePackStats(packageInfo);
  const gzipSize = await getGzipSizeForPackage(packageInfo);

  return {
    name: packagePackStats.name,
    packedTarballSize: packagePackStats.size,
    unpackedSize: packagePackStats.unpackedSize,
    fileCount: packagePackStats.entryCount,
    gzipSize,
  };
};

const readBaseline = async () => {
  try {
    const json = await fsPromises.readFile(baselinePath, 'utf8');
    return JSON.parse(json);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {};
    }
    throw err;
  }
};

const updateBaseline = (packagesSizeStats) => {
  const packagesSizeStatsByName = {};
  packagesSizeStats.forEach((packageStats) => {
    packagesSizeStatsByName[packageStats.name] = packageStats;
  });
  const json = JSON.stringify(packagesSizeStatsByName, null, 2);
  fs.writeFileSync(baselinePath, `${json}\n`, 'utf8');
};

const saveReportFiles = (comparisons, formattedReport) => {
  const comparisonsJson = JSON.stringify(comparisons, null, 2);

  if (!fs.existsSync(reportsPath)) {
    fs.mkdirSync(reportsPath);
  }

  fs.writeFileSync(reportsPath + '/report.md', `${formattedReport}\n`, 'utf8');
  fs.writeFileSync(
    reportsPath + '/report.json',
    `${comparisonsJson}\n`,
    'utf8'
  );
};

async function main() {
  const root = process.cwd();
  const { packages } = getPackagesSync(root);
  const dtPackages = filterDtPackages(packages);
  const args = process.argv.slice(2);
  const update = args.includes('--update');

  // Get statistics about packages size (in parallel for better performance)
  const packagesSizeStats = await Promise.all(
    dtPackages.map(getPackageSizeStats)
  );

  if (update && !process.stdin.isTTY) {
    console.error(
      'check-pkg-size:update is human-only (ADR-0010): run it yourself in a terminal.'
    );
    process.exit(1);
  }

  if (update) {
    updateBaseline(packagesSizeStats);
    process.exit(0);
  }

  const baselineByName = await readBaseline();
  const comparisons = compareToBaseline(packagesSizeStats, baselineByName);
  const formattedReport = formatReport(comparisons);

  saveReportFiles(comparisons, formattedReport);
  console.log(formattedReport + '\n');

  if (comparisons.some((comparison) => comparison.failed)) {
    console.error(
      "Error: there's a regression on packages' size. Check table above for details."
    );
    process.exit(1);
  } else {
    console.log('No regression!');
  }
}

// Execute main function with error handling
await runWithErrorHandling(main);
