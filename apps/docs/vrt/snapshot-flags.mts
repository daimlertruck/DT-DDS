const LONG_FLAG = '--update-snapshots';
// Playwright 1.64: -x is the only boolean short flag, so -xu reaches -u.
const SHORT_FLAG = /^-x*u/;

export const findSnapshotUpdateFlag = (
  args: readonly string[]
): string | undefined =>
  args.find(
    (arg) =>
      arg === LONG_FLAG ||
      arg.startsWith(`${LONG_FLAG}=`) ||
      SHORT_FLAG.test(arg)
  );
