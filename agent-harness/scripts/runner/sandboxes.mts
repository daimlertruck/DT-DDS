// The run's throwaway clones (git/sandbox.mts): where they live, and closing them after a gate.

import { messageOf, say } from './io.mts';
import {
  closeSandbox,
  listSandboxes,
  sandboxesRootFor,
} from '../git/sandbox.mts';

import type { Gate } from './stage-table.mts';

export const sandboxesDirOf = (root: string): string | null => {
  try {
    return sandboxesRootFor(root);
  } catch {
    return null;
  }
};

// After each gate decision, close the sandboxes kept until this gate (their logs are copied into the
// work dir first). A refusal is reported, never fatal: the human can close it with sandbox.mts.
export const closeSandboxesKeptUntil = (
  root: string,
  id: string,
  gate: Gate
): void => {
  const sandboxesRoot = (() => {
    try {
      return sandboxesRootFor(root);
    } catch (error) {
      say(`   sandboxes: ${messageOf(error)}`);
      return null;
    }
  })();
  if (sandboxesRoot === null) return;
  listSandboxes(sandboxesRoot)
    .filter(
      (sandbox) => String(sandbox.issue) === id && sandbox.keepUntil === gate
    )
    .forEach(({ name }) => {
      try {
        closeSandbox({ root, sandboxesRoot, name });
        say(`   sandbox ${name} closed (kept until ${gate})`);
      } catch (error) {
        say(
          `   sandbox ${name} not closed: ${messageOf(
            error
          )}; close it with node agent-harness/scripts/git/sandbox.mts close ${name}`
        );
      }
    });
};
