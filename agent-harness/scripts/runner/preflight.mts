// What must hold before a run starts or a step's session runs: one run per checkout, the readiness
// checks, and the stage table's health checks.

import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

import { readinessOf } from './checks.mts';
import { ACTIVE_RUN } from './context.mts';
import { Stop } from './errors.mts';
import { isAlive, say, tryJson } from './io.mts';
import { isRecord } from '../lib/json.mts';

import type { HealthCheck } from './stage-table.mts';

export interface HealthResult {
  readonly name: string;
  readonly ok: boolean;
  readonly log: string;
}

export const runHealthChecks = (
  root: string,
  checks: readonly HealthCheck[],
  logDir: string
): HealthResult[] => {
  mkdirSync(logDir, { recursive: true });
  return checks.map(({ name, run: [command, ...args] }) => {
    const result = spawnSync(command, args, { cwd: root, encoding: 'utf8' });
    const log = join(logDir, `health-${name}.log`);
    writeFileSync(
      log,
      `$ ${[command, ...args].join(' ')}\n${result.stdout ?? ''}${
        result.stderr ?? ''
      }${result.error ? String(result.error) : ''}`
    );
    return { name, ok: result.status === 0, log };
  });
};

// Before anything is fetched, classified or spent: no model override, the hooks start, and a GitHub
// issue is open and claimed.
export const preflight = (
  root: string,
  id: string,
  issueFile: string | null
): string[] => {
  const problems: string[] = [];
  if (process.env.CLAUDE_CODE_SUBAGENT_MODEL !== undefined) {
    problems.push(
      'CLAUDE_CODE_SUBAGENT_MODEL is set: it overrides every stage model'
    );
  }
  const hooks = spawnSync(
    process.execPath,
    [join(root, 'agent-harness/hooks/check-hooks.mts')],
    { cwd: root, encoding: 'utf8' }
  );
  if (hooks.status !== 0) {
    problems.push(
      `check-hooks.mts failed (exit ${
        hooks.status
      }): ${`${hooks.stdout}${hooks.stderr}`.trim().split('\n').at(-1)}`
    );
  }
  if (!issueFile && /^\d+$/.test(id)) {
    const view = spawnSync(
      'gh',
      ['issue', 'view', id, '--json', 'state,labels,assignees'],
      { cwd: root, encoding: 'utf8' }
    );
    const user = spawnSync('gh', ['api', 'user', '--jq', '.login'], {
      cwd: root,
      encoding: 'utf8',
    }).stdout?.trim();
    if (view.status !== 0) {
      problems.push(`gh issue view ${id} failed: ${view.stderr.trim()}`);
    } else {
      const problem = readinessOf(id, JSON.parse(view.stdout), user);
      if (problem) problems.push(problem);
    }
  }
  return problems;
};

// The run file budget-guard reads. One per checkout; a dead process's file is stale.
export const checkActiveRun = (activePath: string, id: string): void => {
  if (!existsSync(activePath)) return;
  const active = tryJson(readFileSync(activePath, 'utf8'));
  const issue = isRecord(active) ? active.issue : undefined;
  const pid = isRecord(active) ? active.pid : undefined;
  if (!isRecord(active) || !isAlive(pid)) {
    rmSync(activePath, { force: true });
    say(
      `stale run file ${ACTIVE_RUN} (issue ${String(
        issue ?? '?'
      )}, pid ${String(pid ?? 'none')} not running): removed`
    );
    return;
  }
  if (String(issue) !== id) {
    throw new Stop(
      1,
      `another run is active (${ACTIVE_RUN}: issue ${String(
        issue
      )}, pid ${String(pid)}); finish or stop it first`
    );
  }
  throw new Stop(
    1,
    `issue ${id} is already running (pid ${String(
      pid
    )}); one terminal per issue`
  );
};
