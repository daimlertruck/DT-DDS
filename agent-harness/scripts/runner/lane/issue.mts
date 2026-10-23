import { isRecord } from '../../lib/json.mts';

// A label as `gh issue view --json labels` gives it, or its bare name.
export type IssueLabel = string | { readonly name: string };

// The issue fields the classifier reads.
export interface Issue {
  readonly number?: number | null;
  readonly title?: string;
  readonly body?: string;
  readonly labels?: readonly IssueLabel[];
}

export const labelName = (label: IssueLabel): string =>
  typeof label === 'string' ? label : label.name;

// The issue fields the classifier reads, from untrusted JSON; anything else is left out.
export const issueFrom = (value: unknown): Issue => {
  const issue = isRecord(value) ? value : {};
  const labels = Array.isArray(issue.labels) ? issue.labels : [];
  return {
    number: typeof issue.number === 'number' ? issue.number : null,
    title: typeof issue.title === 'string' ? issue.title : undefined,
    body: typeof issue.body === 'string' ? issue.body : undefined,
    labels: labels.flatMap((label: unknown): IssueLabel[] =>
      typeof label === 'string'
        ? [label]
        : isRecord(label) && typeof label.name === 'string'
        ? [label.name]
        : []
    ),
  };
};
