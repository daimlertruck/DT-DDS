// The outcome of one step's session, read from what run-stage.mts printed (its status and spend lines,
// the result and transcript it saved) and from the result file it names. The wording parsed here is
// run-stage.mts's summaryOf.

import { relative } from 'node:path';

import { isRecord, type JsonObject } from '../lib/json.mts';
import { isClaudeResult } from '../records/usage.mts';

// The exit code of a process stopped by an interrupt (SIGINT, as a shell reports it).
export const INTERRUPTED = 130;

export interface StepOutcome {
  readonly status: string;
  readonly predictedUsd: number | null;
  readonly reportedUsd: number | null;
  // The list-price prediction when every model is priced, else Claude Code's reported cost, else
  // unknown (null: no JSON result).
  readonly usd: number | null;
  readonly sessionId: string | null;
  readonly denials: readonly string[];
  readonly resultPath: string | null;
  readonly transcriptPath: string | null;
  // The signal that stopped the session, when one did.
  readonly interrupted: string | null;
}

// How run-stage.mts ended, and the result file it saved, parsed (undefined when unreadable).
export interface StageExit {
  readonly stageName: string;
  readonly out: string;
  readonly code: number | null;
  readonly signal: NodeJS.Signals | null;
  readonly saved: unknown;
}

// The result file run-stage.mts names on its `wrote … and <path>` line.
export const resultPathIn = (out: string): string | null =>
  out.match(/ and (\S+\.json)$/m)?.[1] ?? null;

// One permission denial as the gate lists it: the tool and its target, cut to 80 characters.
export const denialOf =
  (root: string) =>
  (denial: unknown): string => {
    const fields: JsonObject = isRecord(denial) ? denial : {};
    const input: JsonObject = isRecord(fields.tool_input)
      ? fields.tool_input
      : {};
    const filePath = typeof input.file_path === 'string' ? input.file_path : '';
    const target = filePath
      ? relative(root, filePath) || filePath
      : String(input.command ?? input.pattern ?? '').replace(/\s+/g, ' ');
    return `${String(fields.tool_name)} ${
      target.length > 80 ? `${target.slice(0, 79)}…` : target
    }`.trim();
  };

const numberOrNull = (text: string | undefined): number | null => {
  const value = Number(text ?? NaN);
  return Number.isFinite(value) ? value : null;
};

export const outcomeOf = (
  root: string,
  { stageName, out, code, signal, saved }: StageExit
): StepOutcome => {
  const status =
    out.match(new RegExp(`^${stageName}: (.*)$`, 'm'))?.[1] ??
    `FAIL — run-stage ${signal ? `killed by ${signal}` : `exit ${code}`}`;
  const session = isClaudeResult(saved) ? saved : null;
  const predictedUsd = numberOrNull(
    out.match(/\$(\d+\.\d+) at list price/)?.[1]
  );
  // Claude Code's figure for this invocation, as run-stage printed it: a resumed session's JSON reports
  // its whole session (usage.mts → ownOf).
  const reported = numberOrNull(
    out.match(/Claude Code reported \$(\d+(?:\.\d+)?(?:e-\d+)?)/)?.[1]
  );
  const reportedUsd = session ? reported : null;
  const denials =
    session && isRecord(saved) && Array.isArray(saved.permission_denials)
      ? saved.permission_denials.map(denialOf(root))
      : [];
  const interrupted =
    status.match(/^interrupted \((SIG[A-Z]+)\)/)?.[1] ??
    (signal === 'SIGINT' || signal === 'SIGTERM'
      ? signal
      : code === INTERRUPTED
      ? 'SIGINT'
      : null);
  return {
    status,
    predictedUsd,
    reportedUsd,
    usd: predictedUsd ?? reportedUsd,
    sessionId: session?.session_id ?? null,
    denials,
    resultPath: resultPathIn(out),
    transcriptPath: out.match(/^transcript kept: (\S+)$/m)?.[1] ?? null,
    interrupted,
  };
};
