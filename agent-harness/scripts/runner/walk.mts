// Walks the lane's steps from the first one not approved: a session per step (or the gate an earlier
// session left pending), its gate, the human's decision, and what the decision does next.

import { applyDecision } from './decision.mts';
import { Interrupted, Stop } from './errors.mts';
import { decideAtGate } from './gate.mts';
import { messageOf, say } from './io.mts';
import { commitRunFile, runFileFor } from './run-record.mts';
import { runSession } from './session.mts';
import { stopForInterrupted, type RunSignals } from './signals.mts';

import type { RunContext, RunStore } from './context.mts';
import type { GateInput } from './gate-input.mts';

// The exit code of a run that stopped or exits at a gate, or null once every step is approved.
export const walkSteps = async (
  ctx: RunContext,
  store: RunStore,
  signals: RunSignals,
  ask: GateInput | null
): Promise<number | null> => {
  store.activate();
  let index = 0;
  let revise: string | null = null;
  let reply = ctx.options.decide;
  try {
    for (;;) {
      const { steps, state } = store.current();
      const step = steps[index];
      if (step === undefined) return null;
      if (state.approved.includes(step.id)) {
        say(`${step.id}: approved earlier, skipped`);
        index += 1;
        continue;
      }

      // A revise:/loop: instruction is kept in run-state.json until its step completes, so an interrupt
      // or a stop before the step (a failed health check) does not drop it from the re-run's brief.
      if (revise === null && state.revise?.step === step.id) {
        revise = state.revise.text;
        say(
          `${step.id} re-runs with its gate instruction (${state.revise.kind} from ${state.revise.gate})`
        );
      }
      const pending =
        !revise && state.pending?.step === step.id ? state.pending : null;
      const answering = pending !== null && reply !== null;
      if (pending && !answering) {
        say(
          `${step.id}: its ${step.gate} gate is pending from an earlier session; shown again (revise: re-runs the step)`
        );
      }
      const gate =
        pending ?? (await runSession(ctx, store, signals, step, revise));
      revise = null;

      const decided = await decideAtGate(ctx, store, signals, ask, {
        step,
        index,
        gate,
        pending,
        reply: answering ? reply : null,
      });
      if (decided.kind === 'exit') return decided.code;
      reply = null;
      const next = applyDecision(
        ctx,
        store,
        decided.decision,
        step,
        index,
        decided.askFirst
      );
      if (next.kind === 'exit') return next.code;
      index = next.index;
      revise = next.revise;
    }
  } catch (error) {
    if (error instanceof Interrupted) {
      throw stopForInterrupted(ctx, store, error);
    }
    store.finish(
      error instanceof Stop
        ? `stopped: ${error.message.split('\n')[0]}`
        : `error: ${messageOf(error)}`
    );
    store.deactivate();
    throw error;
  }
};

// G7 approved: the run is handed off, and its shared record committed where the repo keeps them.
export const handOff = ({ options }: RunContext, store: RunStore): number => {
  const { root, id } = options;
  store.updateState((state) => ({ ...state, outcome: 'handed off at G7' }));
  store.save();
  store.finish('handed off at G7');
  store.deactivate();
  const { state, record } = store.current();
  say(commitRunFile(root, id, runFileFor(root, id, state.runId, record)));
  say(
    `G7 approved. The human pushes and opens the PR with the commands in .local/agent-harness/work/${id}/pr-draft.md.`
  );
  return 0;
};
