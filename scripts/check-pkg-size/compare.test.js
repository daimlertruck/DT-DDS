import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  ComparisonStatus,
  compareToBaseline,
  formatReport,
} from './compare.js';

const baselineStats = {
  name: '@dt-dds/react-button',
  packedTarballSize: 10000,
  unpackedSize: 40000,
  fileCount: 7,
  gzipSize: 2000,
};

const baselineByName = { [baselineStats.name]: baselineStats };

const compareOne = (currentStats, baseline = baselineByName) =>
  compareToBaseline([currentStats], baseline)[0];

test('reports an unchanged package as unchanged and not failed', () => {
  const comparison = compareOne({ ...baselineStats });

  assert.equal(comparison.status, ComparisonStatus.Unchanged);
  assert.equal(comparison.failed, false);
});

test('fails when packedTarballSize grows past both the percent and byte threshold', () => {
  const comparison = compareOne({ ...baselineStats, packedTarballSize: 11600 });

  assert.equal(comparison.status, ComparisonStatus.Failed);
  assert.equal(comparison.failed, true);
});

test('fails when gzipSize grows past both the percent and byte threshold', () => {
  const comparison = compareOne({ ...baselineStats, gzipSize: 3200 });

  assert.equal(comparison.status, ComparisonStatus.Failed);
  assert.equal(comparison.failed, true);
});

test('does not fail when only unpackedSize or fileCount grow past both thresholds', () => {
  const comparison = compareOne({
    ...baselineStats,
    unpackedSize: 46000,
    fileCount: 20,
  });

  assert.equal(comparison.status, ComparisonStatus.Changed);
  assert.equal(comparison.failed, false);
});

test('does not fail when a failing metric crosses only the byte threshold, not the percent one', () => {
  // baseline large enough that 5% (5000 B) is bigger than the 1000 B floor
  const largeBaseline = { ...baselineStats, packedTarballSize: 100000 };
  const comparison = compareOne(
    { ...largeBaseline, packedTarballSize: 101500 }, // +1500 B (>1000), +1.5% (<=5%)
    { [largeBaseline.name]: largeBaseline }
  );

  assert.equal(comparison.failed, false);
});

test('does not fail when a failing metric crosses only the percent threshold, not the byte one', () => {
  const comparison = compareOne({ ...baselineStats, packedTarballSize: 10600 }); // +600 B (<=1000), +6% (>5%)

  assert.equal(comparison.failed, false);
});

test('reports a package missing from the baseline as new, never failed', () => {
  const comparison = compareOne(
    { ...baselineStats, packedTarballSize: 1000000 },
    {}
  );

  assert.equal(comparison.status, ComparisonStatus.New);
  assert.equal(comparison.failed, false);
  assert.equal(comparison.metrics, null);
});

test('reports a smaller package as changed, never failed', () => {
  const comparison = compareOne({ ...baselineStats, packedTarballSize: 5000 });

  assert.equal(comparison.status, ComparisonStatus.Changed);
  assert.equal(comparison.failed, false);
});

test('does not fail a package with no ESM build when gzipSize stays zero (e.g. @dt-dds/icons)', () => {
  const noEsmBaseline = {
    name: '@dt-dds/icons',
    packedTarballSize: 14165273,
    unpackedSize: 23206105,
    fileCount: 9,
    gzipSize: 0,
  };

  const comparison = compareToBaseline([{ ...noEsmBaseline }], {
    [noEsmBaseline.name]: noEsmBaseline,
  })[0];

  assert.equal(comparison.status, ComparisonStatus.Unchanged);
  assert.equal(comparison.failed, false);
});

const parseTableRow = (line) =>
  line
    .slice(1, -1)
    .split('|')
    .map((cell) => cell.trim());

test('formats the report as a column-aligned markdown table with a row per package', () => {
  const comparisons = compareToBaseline(
    [
      { ...baselineStats },
      { ...baselineStats, name: '@dt-dds/icons', packedTarballSize: 11600 },
    ],
    {
      ...baselineByName,
      '@dt-dds/icons': { ...baselineStats, name: '@dt-dds/icons' },
    }
  );

  const report = formatReport(comparisons);
  const lines = report.split('\n');

  assert.deepEqual(parseTableRow(lines[0]), [
    'Package',
    'Status',
    'packedTarballSize',
    'unpackedSize',
    'fileCount',
    'gzipSize',
  ]);
  assert.deepEqual(parseTableRow(lines[2]), [
    '@dt-dds/react-button',
    'unchanged',
    '—',
    '—',
    '—',
    '—',
  ]);
  assert.deepEqual(parseTableRow(lines[3]), [
    '@dt-dds/icons',
    'failed',
    '10000 → 11600 (+1600, +16.0%)',
    '—',
    '—',
    '—',
  ]);

  // every row is padded to the same width, so columns line up in a terminal
  const lineLengths = new Set(lines.map((line) => line.length));
  assert.equal(lineLengths.size, 1);

  // the separator row's dashes span the widest cell in each column
  const rows = lines.slice(2).map(parseTableRow);
  const columnWidths = parseTableRow(lines[0]).map((headerCell, index) =>
    Math.max(headerCell.length, ...rows.map((row) => row[index].length))
  );
  const separatorCells = parseTableRow(lines[1]);
  separatorCells.forEach((separatorCell, index) => {
    assert.equal(/^-+$/.test(separatorCell), true);
    assert.equal(separatorCell.length, columnWidths[index]);
  });
});

test('formats a new package as a row of dashes', () => {
  const comparisons = compareToBaseline([{ ...baselineStats }], {});

  const report = formatReport(comparisons);
  const lines = report.split('\n');

  assert.deepEqual(parseTableRow(lines[2]), [
    '@dt-dds/react-button',
    'new',
    '—',
    '—',
    '—',
    '—',
  ]);
});

test('ignores baseline entries with no matching current package, and returns every current package', () => {
  const comparisons = compareToBaseline([{ ...baselineStats }], {
    ...baselineByName,
    '@dt-dds/removed-package': {
      ...baselineStats,
      name: '@dt-dds/removed-package',
    },
  });

  assert.equal(comparisons.length, 1);
  assert.equal(comparisons[0].name, baselineStats.name);
});
