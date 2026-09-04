# Decide how new components should be created

- Status: Accepted
- Author: Ana Pereira
- Deciders: Ana Pereira, António Freire, Cátia Raminhos, Diogo Costa, Joel Pereira, Leidson Cruz, Masoud Soleymani, Tiago Mendes
- Date: 7 August 2023

**Priority:** High

## Context and Problem Statement

This document addresses the key question of how to approach the development of new components, considering the use of external libraries, building from scratch, and adopting a reference guide. Factors such as development speed, code quality, maintainability, and overall consistency of the library should be taken into consideration during this ADR.

To make an informed decision, we must carefully weight the following:

1. **Time-to-Market:** We need to assess the time it takes to develop components using each approach.
2. **Customization and Flexibility:** Evaluate the level of customization and flexibility each approach allows. A balance must be struck between adhering to design standards and accommodating unique project requirements.
3. **Dependencies and Maintenance:** Examine the dependencies introduced by each approach. Relying heavily on external libraries might lead to increased maintenance overhead, version compatibility issues, and potential security vulnerabilities.
4. **Consistency and User Experience:** Ensuring a consistent and delightful user experience across projects is essential. Consider how each approach contributes to the consistency and smooth functioning of the DT-UI.
5. **Learning Curve:** Evaluate the learning curve for developers adopting each approach. Minimizing complexity can enhance productivity, while leveraging external libraries may require familiarization with their APIs and conventions.

**Considered Options**

- **External Library Utilization:** Is it beneficial to leverage an external library that provides generic solutions, such as responsiveness and other common UI functionalities? How do we strike a balance between using existing solutions and building custom components to meet our specific requirements? e.g. MUI or Chakra UI
- **External as a Guide:** Should we take inspiration from well-established UI libraries to inform our design decisions? What aspects of their implementation can we adopt, and how do we ensure our library maintains its distinct identity? e.g. shadcn/ui
- **Adopting pre-existing components/utils**: Should we take advantage of already-built components that are notoriously difficult to create from scratch? e.g. Reach UI
- **Building from Scratch:** What are the advantages and drawbacks of building components from scratch? How will this approach affect the library's uniqueness and alignment with our organization's design principles?

## Pros and Cons of the Options

### External Library

#### Pros

- Time and Effort Savings: can save significant development time and effort.
- Tested and proven solutions: track record of reliability and stability.
- A wide range of functionalities: might offer a variety of pre-built components and features.

#### Cons

- Limited customization: may not perfectly align with the specific requirements or design principles.
- Lack of ownership: there is a possibility that the project requirements may deviate from the functionalities offered by the external library, over time.
- Dependency management: introduces a dependency that needs to be managed and updated over time.

### External as a Guide

#### Pros

- Proven design patterns: can help improve the overall quality of the new library.
- Faster decision-making: development inspiration from existing libraries can speed up the development process.

#### Cons

- Risk of over-adoption: blindly copying solutions from other libraries can lead to a lack of originality and identity.

### Adopting pre-existing components/utils

#### Pros

- Time and Effort Savings: can save significant development time and effort.
- Tested and proven solutions: track record of reliability and stability.
- Advanced Features: selected components may offer functionalities that would be challenging or time-consuming to implement from scratch.

#### Cons

- Limited customization: may not perfectly align with the specific requirements or design principles.
- Dependency management: introduces a dependency that needs to be managed and updated over time

### Building from Scratch

#### Pros

- Customization: allows for full customization to meet design principles.
- Ownership: have complete control over the codebase and decision making.

#### Cons

- Longer development time: building custom components takes more time and resources.
- Potential for errors: introduces the possibility of introducing bugs or design flaws.

## Decision outcome

We have decided to adopt a **hybrid** approach that combines elements of _Building from Scratch_, _Adopting pre-existing Components/Utils_, and _External Library as a Guide_. This decision to adopt a mixed approach comes from recognizing that not all components have the same level of complexity and uniqueness. Some components might require a tailored approach to achieve the desired user experience and brand consistency. Simultaneously, other components with more standardized functionalities can benefit from the efficiency and reliability of existing solutions. By combining the strengths of these approaches, we aim to strike a balance between customizability, code maintainability, and development speed, ensuring the overall success and sustainability of DT-UI.
