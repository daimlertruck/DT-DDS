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

export const comparePackageToBaseline = (packageStats, baselineEntry) => {
  if (!baselineEntry) {
    return {
      name: packageStats.name,
      status: ComparisonStatus.New,
      metrics: null,
      failed: false,
    };
  }

  const metrics = {};
  METRIC_KEYS.forEach((key) => {
    metrics[key] = compareMetric(packageStats[key], baselineEntry[key]);
  });

  const failed = FAILING_METRIC_KEYS.some((key) => isRegression(metrics[key]));
  const changed = METRIC_KEYS.some((key) => metrics[key].diff !== 0);
  const status = failed
    ? ComparisonStatus.Failed
    : changed
    ? ComparisonStatus.Changed
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

const formatMetricCell = (metric) =>
  metric.diff === 0
    ? '—'
    : `${metric.baseline} → ${metric.current} (${metric.diff >= 0 ? '+' : ''}${
        metric.diff
      }, ${formatPercent(metric.percent)})`;

const formatComparisonRow = (comparison) => {
  const metricCells = comparison.metrics
    ? METRIC_KEYS.map((key) => formatMetricCell(comparison.metrics[key]))
    : METRIC_KEYS.map(() => '—');

  return [comparison.name, comparison.status, ...metricCells];
};

const formatTableRow = (cells, columnWidths) =>
  `| ${cells
    .map((cell, index) => cell.padEnd(columnWidths[index]))
    .join(' | ')} |`;

export const formatReport = (comparisons) => {
  const headerCells = ['Package', 'Status', ...METRIC_KEYS];
  const dataRows = comparisons.map(formatComparisonRow);

  const columnWidths = headerCells.map((headerCell, index) =>
    Math.max(headerCell.length, ...dataRows.map((row) => row[index].length))
  );
  const separatorCells = columnWidths.map((width) => '-'.repeat(width));

  return [headerCells, separatorCells, ...dataRows]
    .map((cells) => formatTableRow(cells, columnWidths))
    .join('\n');
};
