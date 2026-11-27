import { run } from './git';
import { repoSlug } from './links';

interface CommitPull {
  number: number;
  merged_at: string | null;
}

export const findPullRequest = (sha: string): number | null => {
  try {
    const pulls: CommitPull[] = JSON.parse(
      run('gh', ['api', `repos/${repoSlug()}/commits/${sha}/pulls`])
    );
    return pulls.find((pull) => pull.merged_at)?.number ?? null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`PR lookup failed for ${sha}: ${message}`);
    return null;
  }
};
