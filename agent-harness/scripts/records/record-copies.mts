// The copies a record keeps of a work dir's files: each file's state and the lines printed for it.

import { relative } from 'node:path';

import type { RecordableFile } from './run-records.mts';

export type CopyState = 'copy' | 'unchanged' | 'differs';

export interface PlannedFile extends RecordableFile {
  readonly copy: string;
  readonly hash: string;
  readonly state: CopyState;
}

// `copyHash` is the hash of the copy in the record dir; null when there is none yet.
export const copyStateOf = (hash: string, copyHash: string | null): CopyState =>
  copyHash === null ? 'copy' : copyHash === hash ? 'unchanged' : 'differs';

export const planLineOf = (
  { source, target, state }: PlannedFile,
  workDir: string,
  force: boolean
): string =>
  ({
    copy: `copy ${relative(workDir, source)} -> ${target}`,
    unchanged: `unchanged ${target}`,
    differs: `replace ${target} (differs from the work dir${
      force ? '' : '; needs --force'
    })`,
  }[state]);

const DONE: Readonly<Record<CopyState, string>> = {
  copy: 'copied',
  unchanged: 'unchanged',
  differs: 'replaced',
};

export const doneLineOf = ({ target, state }: PlannedFile): string =>
  `${DONE[state]} ${target}`;
