---
name: ds-commit-message
description: 'Use whenever an agent commits in DT-DDS, fixup! and amend! commits included: write a Conventional Commit message that passes commitlint and the release automation.'
---

# Commit message

Write and create a commit that fits AGENTS.md → Branch & commit policy (atomic and green, tests in
the same commit, the header and body limits, DCO).

## Rules

- **Format:** `<type>(<scope>): <subject>` — imperative present tense ("change", not "changed").
  Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
  Scope optional (e.g. the package: `drawer`, `themes`); releases are derived from changed paths, not
  from the scope.
- **Body:** always one, after a blank line under the header: what changed and why.
- **Evidence in repo terms:** the body says what was run and what it showed, in words a teammate can
  repeat ("`turbo gen new-component-package` in a fresh clone: lint, test and build pass"). Leave out
  harness paths (`agent-harness/…`, `.agents/…`, `.local/…`; the work dirs are gitignored), probe or check IDs,
  gate names (G1–G7), pipeline stages and trial terms: the body describes the change, not the run
  that made it.
- **Release semantics** (the subject is parsed by `packages/changeset-conventional-commits` on `main`;
  the body and trailers are not):
  - the subject becomes the changelog line of every released package — write it for consumers;
  - `feat…` → "minor" section; any other type touching a package path → patch release of that
    package + dependents + umbrella; paths outside packages → no release;
  - `type!:` or `BREAKING CHANGE:` in the subject → major for **all 43 public packages** — only with
    recorded maintainer approval; a body-only `BREAKING CHANGE:` footer is ignored by the
    automation, so it misleads: leave it out;
  - `chore(release): …` is reserved for the release bot.
- **Fixes to committed work:** `git commit --fixup=<sha>` (subject is generated: `fixup! <original
  subject>`); when the message must change too, an `amend!` commit (step 6). When they are folded and
  pushed: AGENTS.md → Branch & commit policy. Every fix to committed work is a fixup or amend, never a
  `chore(PR-<n>)`-style commit.
- **DCO — only the human signs off:** the message is the header and the body, with no trailer (no
  `Co-Authored-By`, no `Signed-off-by`); never `-s` or `--no-verify`. The husky `commit-msg` hook
  appends the human committer's `Signed-off-by` as the only trailer.

## Steps

1. Inspect staged changes: `git diff --cached --stat` and `git diff --cached`. Stage by explicit
   path, never a path under `.local/` (work dirs and local run records).
2. Pick the type that matches the change's effect for consumers; choose the scope.
3. Write the header; count characters (≤ 50).
4. Write the body (≤ 72 per line): what changed and why; mention intended snapshot updates.
5. Check lengths: `awk 'NR==1 && length > 50 {print "HEADER TOO LONG"} NR>1 && length > 72 {print "LINE", NR, "TOO LONG"}' <msgfile>`.
6. Commit with `git commit -F <msgfile>`; a fix to committed work with `git commit --fixup=<sha>`.
   When the target's message must change too, write a message file whose first line is
   `amend! <original subject>`, then a blank line, then the full new message, and commit it with
   `git commit -F <msgfile>` (git's `--fixup=amend:` takes no `-F` or `-m`).
7. Confirm: `git log -1 --format='%(trailers:only,unfold)'` prints exactly one line, the human
   `Signed-off-by` (git `user.name`/`user.email`), and the hooks (commitlint, `check-pkg-deps`)
   passed.

## Output

A commit on the current local branch whose message passes commitlint, has the human's DCO
`Signed-off-by` as its only trailer, and whose subject describes the change correctly for the
changelog.
