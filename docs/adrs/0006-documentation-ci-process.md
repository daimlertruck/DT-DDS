# Decide on how to setup CI for Documentation

- Status: Accepted
- Author: Ana Pereira
- Deciders: Ana Pereira, António Freire, Cátia Raminhos, Diogo Costa, Leidson Cruz, Masoud Soleymani, Joel Pereira
- Date: 31 August 2023

**Priority**: High

## Context and Problem Statement

DT-UI needs an efficient strategy to deploy its documentation. Our goal is to have the documentation deployed on a production environment for the main branch, while also having a preview environment for each pull request (PR) that will be automatically created and deleted as needed. This will allow designers and other developers to have a way of testing the new features seamlessly.

## Considered Options

- **GitHub Pages**: this involves deploying the documentation to a specific repository branch or folder and having it accessible through a GitHub Pages URL.
- **Azure Static Web Apps**: this platform allows for simple deployment of static websites with preview features.
- **Kubernetes**: deploy the documentation using Kubernetes, which provides advanced container orchestration capabilities. This would involve containerizing the documentation and managing deployment, scaling, and deletion of preview environments.

Temporary testing repository: https://git.t3.daimlertruck.com/DT-Design-System/documentation-deploy-test

## Pros and Cons of the Options

### Github Pages

#### Pros

- **Easy Setup**: Setting up GitHub Pages is straightforward, especially for simple static websites.
- **Included Auth**: DT authentication layer is there by default.

#### Cons

- **Limited Automation**: preview environments for each PR requires additional scripting and complexity.
- **Limited Control**: GitHub Pages offers limited control over advanced deployment configurations.

### Azure Web Apps

#### Pros

- **Built-in Previews**: Azure Static Web Apps offers built-in support for preview environments.
- **Scalability**: Azure services generally provide good scalability, when needed.
- **Medium Setup**: Requires some configuration but good documentation is provided.

#### Cons

- **Dependencies**: We need the support from runtime team to configure Azure and terraform files.
- **Custom Authentication**: This solutions requires custom authentication which is only available in **paid **tiers.
- **Limited Automation**: Only GitHub Actions deployments support all preview features - e.g. deleting preview environments requires additional scripting .

### Kubernetes

#### Pros

- **Full Control**: Kubernetes offers complete control over deployment workflows, enabling tailored automation for preview environments and production deployments.
- **Scalability**: Kubernetes can handle scalability effectively.

#### Cons

- **Dependencies**: We need the support from runtime team to configure Azure and terraform files.
- **Complex Setup**: Kubernetes has a steeper learning curve and requires a significant initial setup effort.
- **Maintenance Overhead**: Managing Kubernetes clusters and resources might introduce ongoing maintenance overhead compared to other options.

## Decision outcome

The decision to choose **GitHub Pages** as the deployment platform for DT-UI's documentation was driven by several key factors, primarily focusing on simplicity, self-sufficiency, and ease of setup. This choice empowers the team to start the development now and already have the preview environments for review available.

### Next steps:

- [x] Implement preview environments on github pages:

## References

- Azure Web Apps Quotas - https://learn.microsoft.com/en-us/azure/static-web-apps/quotas
- Github Pages Limits - https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#limits-on-use-of-github-pages
