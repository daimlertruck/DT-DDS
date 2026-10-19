import type { StepOutcome } from './stage-outcome.mts';

// A run stops with this exit code and message.
export class Stop extends Error {
  readonly exitCode: number;

  constructor(exitCode: number, message: string) {
    super(message);
    this.exitCode = exitCode;
  }
}

// A signal stopped the step's session (Ctrl-C reaches the whole foreground job); `outcome` is what
// run-stage recorded for it.
export class Interrupted extends Error {
  readonly signal: string;
  readonly stepId: string;
  readonly outcome: StepOutcome;

  constructor(signal: string, stepId: string, outcome: StepOutcome) {
    super(`interrupted (${signal})`);
    this.signal = signal;
    this.stepId = stepId;
    this.outcome = outcome;
  }
}
