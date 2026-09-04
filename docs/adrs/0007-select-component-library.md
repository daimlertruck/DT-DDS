# Decide if we should use any external library to help in the construction of the select component

- Status: Accepted
- Author: Tiago Mendes
- Deciders: António Freire, Cátia Raminhos, Leidson Cruz, Diogo Costa, Mucahit Tutuncu, David Alecrim
- Date: 13 March 2024
- Decision due date: 22 March 2024

**Priority**: Medium

## Context and Problem Statement

As using the native select element Tag doesn't let us fully customize the UI we need to find another solution.

## Considered Options

- **No library**: Doing everything manually using css and javascript to handle accessibility, select state and functionality
- **Downshift**: Low-level tool that gives you more control over the rendering and logic of your Select, handles all the accessibility and provides hooks to manage the state of the select
- **React-select**: React Select helps you develop powerful select components that *just work* out of the box, without stopping you from customising the parts that are important to you
- **Radix-UI**: Radix UI provides a set of low-level UI primitives that you can use to build highly customizable components with accessibility built-in and provides a Select component.

## Pros and Cons of the Options

### No library

#### Pros

- Full control over UI and accessibility
- No learning curve

#### Cons

- A lot of boiler plate
- More error prone, mainly in accessibility

### Downshift

Select library that is still maintained that provides simplistic hooks to manage the select logic, allows multiselect, doesn't render any UI giving us total freedom with customisation. As it doesn't render any UI you can render your UI the way you want for example using styled components and then passing some util functions for the accessibility and functionality provided by their hooks.

#### Pros

- Highly-customisable solution, it doesn't  render any UI(JSX & CSS), provides us React hooks to build up our own components
- Built with accessibility in mind.
- Small bundle size
- Easy to combine with virtualization technique when the data set is too big(another library is needed)
- Works with multi selection but we need to handle the logic of the selected items(removing an item if we click in an item already selected)

#### Cons

- Has some learning curve
- You need to build more boilerplate
- The documentation is good but is complex as most of the stuff needs to be done manually

### React select

One of the most popular Select libraries, widely used, provides some UI already out of the box and allows customisation. Allows customisation by overriding their own components, providing a list of components that can be override(https://react-select.com/components), or using the styles prop(Suggested way)(https://react-select.com/styles).

#### Pros

- Highly-customisable solution, you can create your own components and pass them to react-select, there is also the option to pass no-styles which removes every css styles
- Has some UI already done if we want to use it
- Widely adopted in the community, it's one of the most popular select libraries
- Comes with some out-of-the-box features and some UI already done
- Allows virtualization with big data by overriding the MenuList component(another library is needed)
- Works well with multi selection

#### Cons

- Has some learning curve
- Less flexibility then Downshift
- Bigger bundle size then Downshift

### Radix-UI Select

Radix UI provides a set of low-level UI primitives that you can use to build highly customisable components with accessibility built-in. They include a Select component that is highly flexible and  provides accessible out of the box.

#### Pros

- Highly-customisable solution, and works with styled components
- There's no need to build the entire UI from scratch, it comes with essential structural code already in place
- Widely adopted in the community,
- Radix UI components are designed with accessibility in mind, following WAI-ARIA guidelines.

#### Cons

- Has some learning curve
- Less flexibility then Downshift
- Bigger bundle size then Downshift
- Doesn't support multiple selection which is really important for us (check issue in References)

### POC with Downshift and React-Select

https://git.t3.daimlertruck.com/MENDEST/select-POC

## Decision outcome

We decided to go with **Downshift** given it has less dependencies and gives us what we need that is accessibility using hooks.

### Next steps:

- [x] Implement select component

## References

- Github Downshift - https://github.com/downshift-js/downshift
- Downshift multiselect hooks - https://www.downshift-js.com/use-multiple-selection
- Building select with no library example - https://blog.logrocket.com/creating-custom-select-dropdown-css/
- All the components that you can pass to react-select - https://react-select.com/components
- Issue asking for Select Radix-UI to support multiple selection - https://github.com/radix-ui/primitives/issues/1270
- Virtualization with React-Select - https://www.botsplash.com/post/optimize-your-react-select-component-to-smoothly-render-10k-data
