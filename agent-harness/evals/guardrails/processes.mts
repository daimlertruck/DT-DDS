// The runner's child processes and console output.

import { spawnSync } from 'node:child_process';

import type { Env } from './workspace.mts';

export interface ExecOptions {
  readonly cwd?: string;
  readonly env?: Env;
  readonly input?: string;
  readonly timeout?: number;
}

export interface ExecResult {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
  readonly error: Error | undefined;
}

export const say = (line: string): void => {
  process.stdout.write(`${line}\n`);
};

export const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

// A command that cannot start (ENOENT) has no output at all: normalised to empty strings here.
export const exec = (
  command: string,
  args: readonly string[],
  { cwd, env = process.env, input, timeout }: ExecOptions = {}
): ExecResult => {
  const run = spawnSync(command, args, {
    cwd,
    env,
    input,
    timeout,
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  return {
    status: run.status,
    stdout: run.stdout ?? '',
    stderr: run.stderr ?? '',
    error: run.error,
  };
};

export const must = (
  command: string,
  args: readonly string[],
  options?: ExecOptions
): string => {
  const run = exec(command, args, options);
  if (run.status !== 0) {
    const why = run.error
      ? run.error.message
      : (run.stderr || run.stdout).trim().slice(0, 400);
    throw new Error(
      `${command} ${args.join(' ')} → exit ${run.status}: ${why}`
    );
  }
  return run.stdout.trim();
};

export const git = (cwd: string, ...args: string[]): string =>
  must('git', args, { cwd });

export const which = (name: string): string =>
  exec('/usr/bin/which', [name]).stdout.trim();
