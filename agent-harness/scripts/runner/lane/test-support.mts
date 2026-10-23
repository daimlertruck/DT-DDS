import { fileURLToPath } from 'node:url';

import { type Issue } from './issue.mts';
import { loadTable } from '../stage-table.mts';

export const realRoot = fileURLToPath(new URL('../../../..', import.meta.url));
export const table = loadTable(realRoot);

interface IssueFields {
  readonly title?: string;
  readonly labels?: readonly string[];
  readonly body?: string;
}

export const issue = ({
  title = '[Bug]: x',
  labels = ['type:bug'],
  body = '',
}: IssueFields = {}): Issue => ({
  number: 9,
  title,
  labels: labels.map((name) => ({ name })),
  body,
});
