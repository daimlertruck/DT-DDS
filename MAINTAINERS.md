# Maintainers

## Active Maintainers

<!-- Please keep this sorted alphabetically by github -->

| Name              | Github         | Role                             |
| ----------------- | -------------- | -------------------------------- |
| António Freire    | afreire-laptop | Principal Engineer / DT-DDS Lead |
| Bernardo Pedrosa  | bqpedrosa      | Frontend Engineer                |
| Cátia Raminhos    | catiaraminhos  | Frontend Engineer                |
| Diogo Costa       | diiogocosta    | Frontend Engineer                |
| Joel Pereira      | joelpereira15  | Frontend Engineer                |
| Liliana Rodrigues | lilirodri      | UX/UI Designer                   |
| Nádia Alexandre   | nd-lxndr       | UX/UI Designer / DT-DDS Lead     |

## Emeritus Maintainers

| Name | Github | Role |
| ---- | ------ | ---- |
|      |        |      |

## Agile Framework/Method

- **Kanban**
- **Kanban Board:** [DT-DDS GitHub Board](https://github.com/orgs/daimlertruck/projects/1)
  - This is the main board we use
- For visibility of work inside the teams and for tasks on the Design side (if needed), we can use [DT-DDS Jira board](https://daimlertruck-shared-cmk-8.atlassian.net/secure/RapidBoard.jspa?rapidView=8619)

### ⭐️ Internal practices (with Jira)

- Main backlog items: **Issues/Tasks**
  - May have sub-issues/tasks, but optional and depending on issue size
  - Are assigned to different Epics (or Milestones in GH) that deliver value each on their own
  - Topics that need to be further explored, will be started as **SPIKEs**
  - Backlog item workflow: Story Status Index

| Status                 | Description                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| New/Todo               | Task has been created and added to the backlog with a basic description                                         |
| Open/Ready             | Task has been refined and agreed on by the team in the Refinement and is ready to be worked on according to DoR |
| In progress            | Task has been picked up by someone in the team and is in progress (pressed "Start progress")                    |
| In Verification/Review | Task has been completed, but is pending technical review/approval within the team                               |
| Design Review          | Task was approved, technically, but is pending design review (to be done by designers, e.g. in Storybook)       |
| Done                   | Task is resolved according to DoD (pressed "Done")                                                              |

- **Bugs found during development**
  - If small and we know how to fix them: create a Bug ticket and directly expedite to the "Ready" status or even In progress
  - If bigger or we need to analyse them first: create a Bug ticket and expedite it only to "Todo" status

More information: [JIRA](https://daimlertruck-shared-cmk-8.atlassian.net/wiki/spaces/DTUI/pages/123109733/JIRA)

## Triage & Refinement process

To ensure high quality and clarity, every issue goes through a strict triage process before code is written.

### Phase 1: Initial Triage

**Location:** _Triage_

- **Questions:** If an issue is a `question`, Maintainers (or community members) answer it directly in the thread and close the issue. It does **not** continue in the board flow.
- **Invalid Bugs:** If a bug is actually a user error or a misunderstanding provide feedback and close the issue.
- **Features that needs RFC (Request for Comments)**: Add label `needs:rfc` to the issue
  - in case it's a request for a new component or a new feature inside a current component

**Validation:** If a Maintainer confirms the issue is a valid **Bug** or a desirable **Feature**, they manually move the card to the **Backlog** column.

### Phase 2: Refinement & Scoping

**Location:** _Backlog_

- **Timing:** This happens asynchronously or during the **DT-DDS Issue triage** meeting
- **Goal:** To move items from _Backlog_ to _Ready_.
- **Actions Required:**
  1. **Prioritization:** Is this high priority? Should we do it now? Example of priority matrix:
     1. p0 - critical: issues that are breaking the lib at some point.
     2. p1 -  high: bugs that impact the functionality, or features that is highly needed for a specific product and needs to be developed asap.
     3. p2 - medium: updates on the designs, tokens, features that are not being requested by any product.
     4. p3 - low: nice to have features / small improvements
  2. **Clarification:**
     - For **Bugs**: should have the following information:
       - Reproduction steps clear
       - Code to reproduce the bug.
       - Screenshot/video if applicable?
     - For **Features**:
       - Are the requirements defined?
       - Does the context given follows our Definition of Ready?
       - If the issue has the label `needs:rfc` :
         - Does the GitHub issue have information about the fields needed for the RFC?
         - If all the information needed is there, the maintainer opens a Pull Request with the RFC
           - See [RFC Template](./docs/rfcs/0000-template.md)
         - After the RFC is reviewed, approved and merged, it's linked or attached to the issue
  3. **Iterate:** If the scope is unclear, the Maintainer requests info from the author. The issue stays in Backlog if:
     1. There are still doubts
     2. Missing things from the DoR + RFC
     3. Not prioritized at the moment.

### Phase 3: Approval

Once an issue has clear requirements and, in case it's a feature, an approved RFC, a Maintainer moves it to **Ready**.

**Q: Who is going to approve and move to ready with the right priority?**

R: The maintainers group.  
Most of the issues will be cataloged and clarified async through the maintainers chat. Some members can take over the issue and clarify everything that's needed and just gather with the rest some feedback to approve it and move forward.  
For the issues that needs more discussions, we'll bring those to the triage meeting to align all together and then approve and prioritize within the group.

## Events/Meetings

Even though we are working with Kanban, we want to keep some regular time boxed events/meetings, so that there is a reserved space for them.
We still want to keep the flexibility though to skip or postpone them as needed or to still do things continuously on the fly outside of the events if this is needed.
The idea is to not schedule and have events/meetings just for the sake of it, but when they are needed.

| **Event**                   | **Description & ⭐️ Practices**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Time**                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **DT-DDS Maintainers sync** | This is the space for DT-DDS Maintainers to bring topics to align on the overall improvement of the Design System. <br/> **Agenda:** <br/> 1. Week Recap (\~10min.) <br/> - Quick update of blockers or urgent topics that need to be prioritized and may require immediate action <br/> 2. Code base issues review(\~5min.) <br/> - Overview of open issues <br/> - Prioritization and assignment of critical issues <br/> 3. Design review (\~20min.) <br/> - Overview of new components or updates to existing ones <br/> - Alignment on component specifications and API <br/> 4. Alignment on topics for DT-DDS (\~10min.) <br/> - Latest agreed-upon design specs and components API <br/> - Update on closed or ongoing code base issues <br/> - Review latest changes and contributions (features, bug fixes, optimizations, etc.) <br/> See meeting notes: [Maintainers Sync](https://daimlertruck-shared-cmk-8.atlassian.net/wiki/spaces/DTUI/pages/123109580/Maintainers+Sync) | Wednesday, 16:00 - 16:45                         |
| **DT-DDS Weekly Sync**      | Where engineering and design team will have the opportunity to exchange about ongoing tasks and next steps of the Design System. <br/> See meeting notes: [Meeting Notes](https://daimlertruck-shared-cmk-8.atlassian.net/wiki/spaces/DTUI/pages/123109677/Meeting+Notes)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Thursday, 14:00 - 15:00 \| on Request only       |
| **DT-DDS Issue Triage**     | Blocker for solving misaligned open issues if needed.99% of issues prioritization should occur async. It should be skipped if not needed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Every second Tuesday of the month, 15:00 - 15:30 |
