// What a recorded decision does next: the next step, this step again, implement again, the new lane's
// first step, or an exit (a stop, or a lane change to Escalate).

import { Stop } from './errors.mts';
import { appendDecision, say, writeJson } from './io.mts';
import { planOf } from './plan.mts';
import { laneOf, stepsOf, type Step } from './stage-table.mts';
import {
  loopBoundReached,
  loopedBack,
  withApproval,
  withLane,
  withLoopCounted,
  withRevise,
} from './state.mts';
import { approvalNoteOf } from './texts.mts';

import type { RunContext, RunStore } from './context.mts';
import type { Decision } from './gate-replies.mts';

// After a gate decision: run on from a step (with a gate instruction for it), or exit.
export type Next =
  | {
      readonly kind: 'step';
      readonly index: number;
      readonly revise: string | null;
    }
  | { readonly kind: 'exit'; readonly code: number };

const changeLane = (
  { options, adapter, table, paths }: RunContext,
  store: RunStore,
  step: Step,
  lane: Extract<Decision, { kind: 'lane' }>['lane']
): Next => {
  const { id } = options;
  appendDecision(
    paths.workDir,
    `${step.gate}: lane ${
      store.current().record.lane
    } → ${lane} (a scope decision)`
  );
  const { record, steps } = store.update((values) => {
    const changed = withLane(values.record, {
      lane,
      caps: laneOf(table, lane),
      decidedBy: `human at ${step.gate}`,
      reason: `human override at ${step.gate}: lane ${lane}`,
    });
    return {
      ...values,
      record: changed,
      steps: stepsOf(table, changed.lane),
      summary: { ...values.summary, lane: changed.lane },
      state: { ...values.state, revise: null },
    };
  });
  writeJson(paths.lanePath, record);
  if (!steps.length) {
    store.updateState((state) => ({ ...state, outcome: 'escalated' }));
    store.save();
    store.finish('escalated');
    store.deactivate();
    say('Escalate: stopped. Hand the issue and lane.json to a maintainer.');
    return { kind: 'exit', code: 0 };
  }
  store.save();
  store.activate();
  say(planOf(id, record, steps, adapter, table).join('\n'));
  return { kind: 'step', index: 0, revise: null };
};

export const applyDecision = (
  ctx: RunContext,
  store: RunStore,
  decision: Decision,
  step: Step,
  index: number,
  askFirst: readonly string[]
): Next => {
  const { options, paths } = ctx;
  if (decision.kind === 'approve') {
    const note = approvalNoteOf(step.gate, decision.text, askFirst);
    if (note) appendDecision(paths.workDir, note);
    store.updateState((state) => withApproval(state, step.id));
    store.save();
    return { kind: 'step', index: index + 1, revise: null };
  }
  if (decision.kind === 'revise') {
    store.updateState((state) => withRevise(state, step, decision.text));
    store.save();
    return { kind: 'step', index, revise: decision.text };
  }
  if (decision.kind === 'loop') {
    const counted = store.updateState((state) =>
      withLoopCounted(state, step.gate)
    );
    store.save();
    const count = counted.loops[step.gate] ?? 0;
    if (loopBoundReached(step.gate, count)) {
      throw new Stop(
        1,
        `${step.gate} looped back ${count} times: suspected unsound approach. Stopped.`
      );
    }
    appendDecision(
      paths.workDir,
      `${step.gate} code-or-scope revise (loop ${count}): ${decision.text}`
    );
    const { state, steps } = store.current();
    const back = loopedBack(state, steps, step.gate, decision.text);
    store.updateState(() => back.state);
    store.save();
    return { kind: 'step', index: back.target, revise: decision.text };
  }
  if (decision.kind === 'lane') {
    return changeLane(ctx, store, step, decision.lane);
  }
  store.save();
  store.finish(`stopped at ${step.gate}`);
  store.deactivate();
  say(
    `Stopped at ${step.gate}. Resume with: node agent-harness/scripts/run.mts ${
      options.id
    }${options.noWait ? ' --no-wait' : ''}`
  );
  return { kind: 'exit', code: 0 };
};
