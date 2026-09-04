# Decide how should be DT UI's release process

- Status: Accepted
- Author: Ana Pereira
- Deciders: Ana Pereira, António Freire, Diogo Costa, Joel Pereira, Leidson Cruz, Masoud Soleymani, Tiago Mendes
- Date: 22 August 2023

**Priority**: High

## Context and Problem Statement

As DT-UI transitions from the alpha version (API Management) to the beta version, it's essential to establish a clear release process. This decision will impact how we manage feature releases, bug fixes, and updates, ensuring a streamlined and efficient workflow for the entire team. We need to address the following questions:

- How often should we release new versions?
- What factors should influence the decision to release, such as completed features, bug fixes, or security patches?

## Considered Options

- **Fixed Time Intervals:** We could adopt a fixed release cadence, such as monthly or bi-weekly releases. This can also be set by type of release.
- **Feature-Driven Releases:** Releases could be triggered based on the completion of significant new features or enhancements. _The same would apply to bug fixes or security patches?!_
- **Continuous Deployment:** Opting for continuous deployment would involve automatically releasing any changes as soon as they are merged into the main branch.

## Pros and Cons of the Options

### Fixed Time Intervals

#### Pros

- Predictable release schedule for both the development team and users
- Encourages regular updates and engagement with the library

#### Cons

- May lead to rushed releases if features or fixes are not ready
  - How to mitigate this: do not merge the features or fixes to the main branch, if they are not ready or if we don't want to include them in the release
- Might result in unnecessary releases if there are no significant changes to deliver

### Feature-Driven Releases

#### Pros

- Allows flexibility in release timing, accommodating the completion of substantial features
- Releases align more closely with user-visible changes

#### Cons

- Potential for irregular release cadence, leading to uncertainty among users
- Delays might occur if complex features take longer to develop than anticipated

### Continuous Deployment

#### Pros

- Enables rapid delivery of changes to users
- Encourages smaller, more manageable updates
- Identifies issues earlier through ongoing testing
- Continuous models more likely break and fix small things in less risky ways along the way

#### Cons

- Requires robust automated testing and quality assurance processes
- Potential for more frequent user disruptions due to continuous updates

## Decision outcome

It was decided to move forward with **Continuous Deployment **strategy, given:

- it gives us speed on delivery
- push us to have a more robust automated testing and quality assurance processes

In the future, when we have a more mature design system, this release process will probably need to be reviewed since we might want to have more predictability on our deliveries as well as controlled breaking changes releases.

### Next steps:

- [x] Update Version & Release Management document
- [x] Add quality gates on pipeline (Blackduck, Coverity and Sonarqube)
- [x] Review deployment pipeline to include versioning and publishing based on the defined strategy
- [x] Define and document quality process

## References

- https://medium.com/eightshapes-llc/design-system-release-cadence-2e3e6694ba21
