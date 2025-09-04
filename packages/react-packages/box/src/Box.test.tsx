import { render, screen } from '@testing-library/react';

import { Box } from '.';

describe('<Box /> component', () => {
  it('should render with default div element and children', () => {
    const { container } = render(
      <Box>
        <p>Some Content</p>
        <p>More Content</p>
      </Box>
    );

    const boxElement = container.firstChild as HTMLElement;
    expect(boxElement.tagName).toBe('DIV');
    expect(boxElement).toHaveTextContent('Some Content');
    expect(container).toMatchSnapshot();
  });

  it('should render with custom element type', () => {
    const { container } = render(
      <Box element='section'>
        <h1>Section Content</h1>
      </Box>
    );

    const boxElement = container.firstChild as HTMLElement;
    expect(boxElement.tagName).toBe('SECTION');
    expect(boxElement).toHaveTextContent('Section Content');
  });

  it('should render without children', () => {
    const { container } = render(<Box />);

    const boxElement = container.firstChild as HTMLElement;
    expect(boxElement.tagName).toBe('DIV');
    expect(boxElement).toBeEmptyDOMElement();
  });

  it('should render with data-testid attribute when dataTestId prop is provided', () => {
    render(
      <Box dataTestId='test-box'>
        <span>Test content</span>
      </Box>
    );

    const boxElement = screen.getByTestId('test-box');
    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveTextContent('Test content');
  });

  it('should apply custom styles when style prop is provided', () => {
    const customStyle = {
      backgroundColor: 'red',
      padding: '10px',
      margin: '5px',
    };

    const { container } = render(
      <Box style={customStyle}>
        <span>Styled content</span>
      </Box>
    );

    const boxElement = container.firstChild as HTMLElement;
    expect(boxElement).toHaveStyle({
      backgroundColor: 'red',
      padding: '10px',
      margin: '5px',
    });
  });
});
