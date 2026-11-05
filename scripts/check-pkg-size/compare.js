const THRESHOLD_PERCENT = 0.05;
const THRESHOLD_BYTES = 1000;

// Reported for every package, but only these two decide pass/fail (issue #227 / ADR-0010):
// unpackedSize and fileCount are informational only and never fail the check.
const METRIC_KEYS = [
  'packedTarballSize',
  'unpackedSize',
  'fileCount',
  'gzipSize',
];
const FAILING_METRIC_KEYS = ['packedTarballSize', 'gzipSize'];

export const ComparisonStatus = {
  New: 'new',
  Unchanged: 'unchanged',
  Changed: 'changed',
  Smaller: 'smaller',
  Failed: 'failed',
};

// percent is Infinity only when baseline is 0 and current > 0
export const compareMetric = (current, baseline) => {
  const diff = current - baseline;
  const percent = baseline === 0 ? (diff > 0 ? Infinity : 0) : diff / baseline;
  return { baseline, current, diff, percent };
};

const isRegression = (metric) =>
  metric.diff > THRESHOLD_BYTES && metric.percent > THRESHOLD_PERCENT;

const mapMetrics = (toMetric) =>
  Object.fromEntries(METRIC_KEYS.map((key) => [key, toMetric(key)]));

export const comparePackageToBaseline = (packageStats, baselineEntry) => {
  if (!baselineEntry) {
    return {
      name: packageStats.name,
      status: ComparisonStatus.New,
      metrics: mapMetrics((key) => ({
        baseline: null,
        current: packageStats[key],
        diff: null,
        percent: null,
      })),
      failed: false,
    };
  }

  const metrics = mapMetrics((key) =>
    compareMetric(packageStats[key], baselineEntry[key])
  );

  const failed = FAILING_METRIC_KEYS.some((key) => isRegression(metrics[key]));
  const grew = METRIC_KEYS.some((key) => metrics[key].diff > 0);
  const shrank = METRIC_KEYS.some((key) => metrics[key].diff < 0);
  const status = failed
    ? ComparisonStatus.Failed
    : grew
    ? ComparisonStatus.Changed
    : shrank
    ? ComparisonStatus.Smaller
    : ComparisonStatus.Unchanged;

  return { name: packageStats.name, status, metrics, failed };
};

export const compareToBaseline = (packagesSizeStats, baselineByName) =>
  packagesSizeStats.map((packageStats) =>
    comparePackageToBaseline(packageStats, baselineByName[packageStats.name])
  );

const formatPercent = (percent) =>
  percent === Infinity
    ? '+∞%'
    : `${percent >= 0 ? '+' : ''}${(percent * 100).toFixed(1)}%`;

const formatMetricCell = (metric) => {
  if (metric.baseline === null) {
    return `${metric.current}`;
  }

  return metric.diff === 0
    ? '—'
    : `${metric.baseline} → ${metric.current} (${metric.diff >= 0 ? '+' : ''}${
        metric.diff
      }, ${formatPercent(metric.percent)})`;
};

const formatComparisonRow = (comparison) => [
  comparison.name,
  comparison.status,
  ...METRIC_KEYS.map((key) => formatMetricCell(comparison.metrics[key])),
];

const formatTableRow = (cells, columnWidths) =>
  `| ${cells
    .map((cell, index) => cell.padEnd(columnWidths[index]))
    .join(' | ')} |`;

export const formatReport = (comparisons) => {
  const headerCells = ['Package', 'Status', ...METRIC_KEYS];
  const dataRows = comparisons
    .filter((comparison) => comparison.status !== ComparisonStatus.Unchanged)
    .map(formatComparisonRow);

  if (dataRows.length === 0) {
    return 'No package size changes against the baseline.';
  }

  const columnWidths = headerCells.map((headerCell, index) =>
    Math.max(headerCell.length, ...dataRows.map((row) => row[index].length))
  );
  const separatorCells = columnWidths.map((width) => '-'.repeat(width));

  return [headerCells, separatorCells, ...dataRows]
    .map((cells) => formatTableRow(cells, columnWidths))
    .join('\n');
};
