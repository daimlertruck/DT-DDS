// Gate input for a run in a terminal. On a terminal, lines typed while a stage ran are drained before
// the gate asks: they are mid-stage messages, recorded in the gate note and never taken as the
// decision (texts.mts → MID_STAGE_RULE). A multi-line paste at the prompt is one reply. Piped input
// (tests, scripted answers) is read as given, one line per reply.

import { createInterface } from 'node:readline';

// Lines of one terminal paste arrive within a few milliseconds; a human never types two lines that fast.
export const PASTE_MS = 100;

export interface GateInput {
  // Prints the prompt; resolves with the next reply, or null once the input has ended.
  (prompt: string): Promise<string | null>;
  // On a terminal, the lines typed since the last reply; [] for piped input.
  readonly drain: () => Promise<string[]>;
}

export interface LineSource extends NodeJS.ReadableStream {
  readonly isTTY?: boolean;
}

export const lineReader = (
  input: LineSource = process.stdin,
  output: NodeJS.WritableStream = process.stdout
): GateInput => {
  const queue: string[] = [];
  const waiting: ((line: string | null) => void)[] = [];
  let closed = false;
  let paste: string[] | null = null;
  const lines = createInterface({ input, terminal: false });
  lines.on('line', (line: string) => {
    if (paste) {
      paste.push(line);
      return;
    }
    const resolveLine = waiting.shift();
    if (!resolveLine) {
      queue.push(line);
      return;
    }
    if (!input.isTTY) {
      resolveLine(line);
      return;
    }
    const pasted = [line];
    paste = pasted;
    setTimeout(() => {
      paste = null;
      resolveLine(pasted.join('\n'));
    }, PASTE_MS);
  });
  lines.on('close', () => {
    closed = true;
    waiting.splice(0).forEach((resolveLine) => resolveLine(null));
  });
  const ask = (prompt: string): Promise<string | null> => {
    output.write(prompt);
    const queued = queue.shift();
    if (queued !== undefined) return Promise.resolve(queued);
    if (closed) return Promise.resolve(null);
    return new Promise((resolveLine) => waiting.push(resolveLine));
  };
  const drain = async (): Promise<string[]> => {
    if (!input.isTTY) return [];
    await new Promise((resolveLater) => setTimeout(resolveLater, 100));
    return queue.splice(0);
  };
  return Object.assign(ask, { drain });
};
