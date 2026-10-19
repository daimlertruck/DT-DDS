// A gate: show the summary, take the human's decision (at a terminal prompt or with --decide) and record
// it in the run log. With --no-wait the gate stays pending for a later --decide.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { Stop } from './errors.mts';
import {
  END_OF_INPUT,
  decisionCellOf,
  isApprovable,
  keptWith,
  parseDecision,
  refusalOf,
  replyPromptOf,
  withKept,
  type Decision,
  type GateRules,
  type Reply,
} from './gate-replies.mts';
import { appendGateRow, now, say, untrackedOf } from './io.mts';
import { closeSandboxesKeptUntil } from './sandboxes.mts';
import { withoutPresented, type PendingGate } from './state.mts';
import { gateLines, gateNoteOf, replyNotesOf } from './texts.mts';

import type { RunContext, RunStore } from './context.mts';
import type { GateInput } from './gate-input.mts';
import type { RunSignals } from './signals.mts';
import type { Gate, Step } from './stage-table.mts';

// Where Ask-first consent is asked, at a lane's first step.
const FIRST_GATES: readonly Gate[] = ['G1', 'G3', 'G1+G3'];

// The human's reply at a terminal prompt. A reply that is not a decision is refused and kept; the input
// ending is a stop, never an approval.
const askReply = async (
  ask: GateInput | null,
  gate: Gate,
  rules: GateRules
): Promise<Reply> => {
  let kept: string | null = null;
  for (;;) {
    const typed = ask ? await ask(replyPromptOf(gate, rules.canLoop)) : null;
    const reply: Reply =
      typed === null
        ? { decision: END_OF_INPUT, kept }
        : withKept(parseDecision(typed), typed, kept);
    kept = reply.kept;
    const refusal = refusalOf(reply.decision, rules);
    if (!refusal) return reply;
    say(`   ${refusal}`);
    if (reply.decision.kind === 'unknown' && reply.decision.text) {
      kept = keptWith(kept, reply.decision.text);
      say(
        `   kept: ${JSON.stringify(
          kept
        )} — reply approve, revise, loop or stop alone to use it`
      );
    }
  }
};

// A --decide reply, verbatim. Refused (exit 2, nothing recorded, the gate stays pending) unless the
// gate accepts it.
const decidedReply = (reply: string, gate: Gate, rules: GateRules): Reply => {
  const decision = parseDecision(reply);
  const refusal = refusalOf(decision, rules);
  if (refusal) {
    throw new Stop(
      2,
      `reply refused at ${gate}: ${refusal}. Reply as received: ${JSON.stringify(
        reply
      )}. The gate stays pending.`
    );
  }
  return { decision, kept: null };
};

export interface GateTurn {
  readonly step: Step;
  readonly index: number;
  readonly gate: PendingGate;
  // The gate was left pending by an earlier session and is shown again.
  readonly pending: PendingGate | null;
  // A --decide reply that answers this gate.
  readonly reply: string | null;
}

export type GateResult =
  | {
      readonly kind: 'decided';
      readonly decision: Decision;
      readonly askFirst: readonly string[];
    }
  | { readonly kind: 'exit'; readonly code: number };

export const decideAtGate = async (
  { options, paths }: RunContext,
  store: RunStore,
  signals: RunSignals,
  ask: GateInput | null,
  { step, index, gate, pending, reply }: GateTurn
): Promise<GateResult> => {
  const { root, id } = options;
  const { workDir, runLogPath } = paths;
  const { state, record, steps } = store.current();
  const answering = reply !== null;
  const summaryPath = join(workDir, 'gate-summary.md');
  const summaryLines = existsSync(summaryPath)
    ? readFileSync(summaryPath, 'utf8').trim().split('\n')
    : [];
  const askFirst =
    FIRST_GATES.includes(step.gate) && index === 0
      ? record.features?.askFirst ?? []
      : [];
  // When the human first saw it: a gate left pending by --no-wait keeps that time until decided.
  const presented = gate.presented ?? now();
  gateLines({
    id,
    step,
    gate,
    record,
    answering,
    artifactExists: existsSync(join(workDir, step.artifact)),
    summary: summaryLines,
    created: answering
      ? []
      : untrackedOf(root).filter(
          (path) => !(state.untrackedAtStart ?? []).includes(path)
        ),
    askFirst,
    spentUsd: state.spentUsd,
    spendUnknown: state.spendUnknown,
  }).forEach((line) => say(line));

  // Unknown spend (no JSON result): the lane cap cannot be checked, so the run stops here. The gate
  // stays pending; a resume shows it again and revise: re-runs the step.
  if (pending === null && gate.usd === null) {
    appendGateRow(runLogPath, id, [
      step.gate,
      presented,
      now(),
      'stop (spend unknown)',
      gate.snapshotCell,
      gateNoteOf(gate),
    ]);
    throw new Stop(
      1,
      `spend of ${step.id} is unknown (${gate.status}): stopped at ${
        step.gate
      } without a decision. Check ${
        gate.result ?? 'the usage dir'
      }, then resume: the gate is shown again (revise: re-runs the step).`
    );
  }

  const rules: GateRules = {
    status: gate.status,
    blocked: !isApprovable(gate.status),
    askFirst,
    canLoop: steps
      .slice(0, index + 1)
      .some((earlier) => earlier.stage === 'implement'),
  };
  // --no-wait: the gate stays pending for the human's reply, which comes back with --decide.
  if (options.noWait && !answering) {
    store.updateState((current) => ({
      ...current,
      pending: { ...gate, presented },
    }));
    store.save();
    store.finish(`pending at ${step.gate}`);
    store.deactivate();
    say(
      `Pending at ${step.gate}. Answer with: node agent-harness/scripts/run.mts ${id} --decide "<reply>"`
    );
    return { kind: 'exit', code: 0 };
  }

  const typed = ask ? await ask.drain() : [];
  if (typed.length) {
    say(
      `   typed while the stage ran (recorded, not a decision): ${typed
        .map((line) => JSON.stringify(line))
        .join(' · ')}`
    );
  }

  signals.atGate({
    step: step.id,
    gate: step.gate,
    presented,
    snapshotCell: gate.snapshotCell,
  });
  const { decision, kept } =
    reply !== null
      ? decidedReply(reply, step.gate, rules)
      : await askReply(ask, step.gate, rules);
  signals.atGate(null);
  const decisionCell = decisionCellOf(decision);
  appendGateRow(runLogPath, id, [
    step.gate,
    presented,
    now(),
    decisionCell,
    gate.snapshotCell,
    gateNoteOf(gate, replyNotesOf(typed, presented, kept)),
  ]);
  say(`   recorded at ${step.gate}: ${decisionCell}`);
  // A stop leaves the gate pending (a resume presents it again), so its sandboxes stay.
  if (decision.kind !== 'stop') {
    closeSandboxesKeptUntil(root, id, step.gate);
    store.updateState((current) => ({ ...current, pending: null }));
  } else {
    store.updateState((current) => ({
      ...current,
      pending: withoutPresented(gate),
    }));
  }
  return { kind: 'decided', decision, askFirst };
};
