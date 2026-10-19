---
name: ds-resolve-pr-comments
description: "Use to address the unresolved review threads of an open DT-DDS PR: triage, a human-gated resolution plan, fixup! commits, and in-thread reply drafts for the human to post."
argument-hint: '<PR-NUMBER>'
---

# Resolve PR comments

Address a PR's unresolved review threads. **Trial mode:** the agent reads GitHub, changes code and
commits locally; the **human** pushes and posts replies. Reviewers resolve their own threads (ruleset:
thread resolution required; CONTRIBUTING: resolved "by the one that opened them").

## Input

A PR number `<n>` in `daimlertruck/DT-DDS`.

## Procedure

1. **Fetch unresolved threads** (read-only GraphQL query):
   ```bash
   gh api graphql -f query='
     query($owner:String!,$repo:String!,$pr:Int!){
       repository(owner:$owner,name:$repo){
         pullRequest(number:$pr){
           headRefName
           reviewThreads(first:100){
             nodes{ id isResolved isOutdated path line
               comments(first:30){ nodes{ databaseId author{login} body } } } } } } }' \
     -F owner=daimlertruck -F repo=DT-DDS -F pr=<n>
   ```
   Keep `isResolved == false`; record thread id, first comment `databaseId`, path, line, author, body.
   Check out the PR's head branch locally (`git switch <headRefName>`; `git pull` is a read).
2. **Triage** each thread: bot vs human; blocking vs suggestion; clear vs ambiguous (ambiguous →
   `NEEDS-CLARIFICATION` — never guess a fix).
3. **Write the plan** to `.local/agent-harness/work/PR-<n>/comment-resolution-plan.md`, grouped (bot, human,
   PR-level). Per thread: **Decision** (accept / push back, with reasoning) · **Action** (the code
   change, or "none — reply only") · **Reply** (draft: "Fixed: <what> (<sha>)" or "Kept as-is because
   <evidence>"; no performative agreement, no thanks). End with an **Execution log** checklist.
4. **STOP — gate.** Present the plan; wait for explicit human approval.
5. **On approval:**
   - Apply each accepted change, verifying the finding against the code first (see `ds-implement-plan`
     → Receiving code review). Wrong finding → reply with evidence instead of a cosmetic change.
   - Commit each fix as `git commit --fixup=<sha-of-the-commit-it-amends>` (`ds-commit-message`
     skill; no trailer, no `-s` — the husky hook adds the human sign-off), never as a
     `chore(PR-<n>)` commit; stage by explicit path.
   - Run the `ds-verify-changes` gates; hand over only when every gate is green.
   - Write `.local/agent-harness/work/PR-<n>/replies.md`: per thread, the final reply text plus the command for the
     human to post it in-thread:
     ```bash
     gh api --method POST repos/daimlertruck/DT-DDS/pulls/<n>/comments/<comment_databaseId>/replies \
       -f body='<reply text>'
     ```
   - Tick the execution log. Hand over: `git push` (fixups) and the replies are the human's to run.
     The human autosquashes later, before merge (AGENTS.md → Branch & commit policy).

## Output

`comment-resolution-plan.md`, local `fixup!` commits, and `replies.md` with commands — nothing
posted or pushed by the agent. Threads are never resolved by the agent.
