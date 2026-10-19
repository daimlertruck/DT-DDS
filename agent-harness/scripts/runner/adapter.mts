// What the runner needs from a harness adapter (runner/adapters/<harness>.mts), and how it loads one.

import { Stop } from './errors.mts';

import type { SessionOptions } from './adapters/claude.mts';
import type { Step } from './stage-table.mts';

export interface HarnessAdapter {
  readonly HARNESS: string;
  readonly toolsOf: (step: Step) => readonly string[];
  readonly agentsFile: (steps: readonly Step[]) => unknown;
  readonly sessionArgs: (
    step: Step,
    options: SessionOptions
  ) => readonly string[];
}

const ADAPTERS: Readonly<Record<string, () => Promise<HarnessAdapter>>> = {
  claude: () => import('./adapters/claude.mts'),
};

export const adapterFor = async (harness: string): Promise<HarnessAdapter> => {
  const load = Object.hasOwn(ADAPTERS, harness) ? ADAPTERS[harness] : undefined;
  if (!load) {
    throw new Stop(
      2,
      `no adapter for harness "${harness}". Only claude is supported: another harness needs a maintainers' decision (ADR-0008 decision 6, docs/adrs/0008-agentic-development-workflow.md) and guards that pass the guardrail eval under it.`
    );
  }
  return load();
};
