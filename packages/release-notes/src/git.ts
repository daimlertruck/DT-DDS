import { execFileSync } from 'child_process';

export interface CommitSubject {
  sha: string;
  subject: string;
}

const FIELD_SEPARATOR = '\x1f';

export const run = (command: string, args: string[]): string =>
  execFileSync(command, args, { encoding: 'utf8' }).trim();

export const parseLog = (output: string): CommitSubject[] =>
  output
    .split('\n')
    .filter((line) => line.includes(FIELD_SEPARATOR))
    .map((line) => {
      const [sha, subject] = line.split(FIELD_SEPARATOR);
      return { sha, subject };
    });

export const commitsInRange = (range: string): CommitSubject[] =>
  parseLog(run('git', ['log', '--format=%H%x1f%s', range]));

export const commitsSinceLastTag = (): CommitSubject[] => {
  const lastTag = run('git', ['describe', '--tags', '--abbrev=0', 'HEAD']);
  return commitsInRange(`${lastTag}..HEAD`);
};
