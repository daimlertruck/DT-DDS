// Gate replies: what a human's reply at a gate decides, and whether the gate accepts it. One set of
// rules for a reply typed at the prompt and one passed with `run.mts --decide`.
// Replies: approve · revise: <instruction> (re-run this step) · loop: <instruction> (back to
// implement) · lane:<0|1|2|escalate> · stop. Silence, a question or anything else is not a decision.

import { LANES, type Gate, type LaneId } from './stage-table.mts';

export interface TextDecision {
  readonly kind: 'approve' | 'revise' | 'loop' | 'stop' | 'unknown';
  readonly text: string;
}

export interface LaneDecision {
  readonly kind: 'lane';
  readonly lane: LaneId;
}

export type Decision = TextDecision | LaneDecision;

// A reply with the text kept from earlier replies that were not decisions.
export interface Reply {
  readonly decision: Decision;
  readonly kept: string | null;
}

// What a gate needs to judge a reply.
export interface GateRules {
  readonly status: string;
  readonly blocked: boolean;
  readonly askFirst: readonly string[];
  readonly canLoop: boolean;
}

// The input ended without a reply: never an approval.
export const END_OF_INPUT: Decision = {
  kind: 'stop',
  text: 'end of input (no decision)',
};

export const parseDecision = (text: string | null | undefined): Decision => {
  const line = String(text ?? '').trim();
  if (/^approve\b/i.test(line)) return { kind: 'approve', text: line };
  const revise = line.match(/^(?:revise|reject)\s*:\s*(.+)$/is)?.[1];
  if (revise !== undefined) return { kind: 'revise', text: revise.trim() };
  const loop = line.match(/^loop\s*:\s*(.+)$/is)?.[1];
  if (loop !== undefined) return { kind: 'loop', text: loop.trim() };
  const named = line
    .match(/^lane\s*:?\s*(0|1|2|escalate)\s*$/i)?.[1]
    ?.toLowerCase();
  const lane = LANES.find((known) => known === named);
  if (lane !== undefined) return { kind: 'lane', lane };
  if (/^stop\b/i.test(line)) return { kind: 'stop', text: line };
  return { kind: 'unknown', text: line };
};

// After a reply that was not a decision, a bare decision word uses the kept text: `approve` approves
// with it, `revise`/`reject` and `loop` take it as their instruction, and it is no longer kept. A
// whole decision leaves it kept (the gate note records it).
export const withKept = (
  decision: Decision,
  typed: string,
  kept: string | null
): Reply => {
  if (kept === null) return { decision, kept };
  const word = typed.trim().toLowerCase();
  if (word === 'approve') {
    return {
      decision: { kind: 'approve', text: `approve; ${kept}` },
      kept: null,
    };
  }
  if (word === 'revise' || word === 'reject') {
    return { decision: { kind: 'revise', text: kept }, kept: null };
  }
  if (word === 'loop')
    return { decision: { kind: 'loop', text: kept }, kept: null };
  return { decision, kept };
};

// A reply that is not a decision is kept, never dropped: it joins the text kept before it.
export const keptWith = (kept: string | null, text: string): string =>
  kept ? `${kept}\n${text}` : text;

// Each Ask-first path needs its own consent, with who gave it (AGENTS.md → Trial mode).
export const missingConsent = (
  decisionText: string,
  askFirst: readonly string[]
): string[] =>
  askFirst.filter(
    (path) =>
      !new RegExp(
        `consent:[^;]*${path.replace(
          /[.*+?^${}()|[\]\\]/g,
          '\\$&'
        )}[^;]*\\([^)]+\\)`,
        'i'
      ).test(decisionText)
  );

// Only a plain PASS is approvable: `PARTIAL: …`, `PASS (partial)`, `BLOCKER: …`, `FAIL — …` and a
// question are not. Leading markdown (`**PASS**`) is ignored.
export const isApprovable = (status: string | null | undefined): boolean => {
  const text = String(status ?? '').replace(/^[\s*_`>#-]+/, '');
  return /^PASS\b/.test(text) && !/^PASS\s*\(partial/i.test(text);
};

// Why a gate does not accept a decision, or null when it does.
export const refusalOf = (
  decision: Decision,
  { status, blocked, askFirst, canLoop }: GateRules
): string | null => {
  const loopWord = canLoop ? 'loop: <instruction>, ' : '';
  if (decision.kind === 'unknown') {
    return `not a decision (reply approve, revise: <instruction>, ${loopWord}lane:N or stop)`;
  }
  if (decision.kind === 'approve' && blocked) {
    return `the step did not pass (${status}); reply revise:, ${
      canLoop ? 'loop:, ' : ''
    }lane:N or stop`;
  }
  const missing =
    decision.kind === 'approve' ? missingConsent(decision.text, askFirst) : [];
  if (missing.length) return `consent missing for: ${missing.join(', ')}`;
  if (decision.kind === 'loop' && !canLoop) {
    return 'loop: goes back to implement, which has not run; use revise:';
  }
  return null;
};

// The prompt at a gate: the replies it accepts.
export const replyPromptOf = (gate: Gate, canLoop: boolean): string =>
  `${gate}> approve | revise: <text> | ${
    canLoop ? 'loop: <text> | ' : ''
  }lane:N | stop: `;

// The decision cell of a gate row: the reply as decided, with an approval's text in brackets.
export const decisionCellOf = (decision: Decision): string => {
  if (decision.kind === 'lane') return `lane:${decision.lane}`;
  if (decision.kind === 'stop') return 'stop';
  if (decision.kind === 'approve') {
    return decision.text === 'approve'
      ? 'approve'
      : `approve (${decision.text})`;
  }
  return decision.text ? `${decision.kind}: ${decision.text}` : decision.kind;
};
