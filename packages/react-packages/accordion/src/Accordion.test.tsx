import { render, screen, fireEvent } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { AccordionBaseProps } from './Accordion';

import { Accordion } from '.';

describe('<Accordion /> component', () => {
  const ProvidedAccordion = withProviders(Accordion);

  const renderComponent = (props?: Partial<AccordionBaseProps>) => {
    const { container } = render(
      <ProvidedAccordion {...props} headerContent='Header Content'>
        <div>Body Content</div>
      </ProvidedAccordion>
    );

    return {
      container,
      header: screen.getByTestId('accordion-header'),
      body: screen.getByTestId('accordion-body'),
    };
  };

  it('should toggle open/close when clicking/key pressing the header', () => {
    const { header, body } = renderComponent();

    expect(body).toHaveStyle({ gridTemplateRows: '0fr' });
    expect(body).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(header);

    expect(body).toHaveStyle({ gridTemplateRows: '1fr' });
    expect(body).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(header, { key: 'Enter' });

    expect(body).toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(header, { key: 'Space' });

    expect(body).toHaveAttribute('aria-expanded', 'false');
  });

  it('should not toggle when disabled', () => {
    const { header, body } = renderComponent({
      isDisabled: true,
    });
    expect(body).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(header);

    expect(body).toHaveAttribute('aria-expanded', 'false');
  });

  it.each`
    hasBackground | hasBorderBottom
    ${false}      | ${false}
    ${true}       | ${true}
  `(
    'should render with correct style when hasBackground is $hasBackground and hasBorderBottom is $hasBorderBottom',
    ({ hasBackground, hasBorderBottom }) => {
      const { container } = renderComponent({
        hasBackground,
        hasBorderBottom,
      });

      expect(container).toMatchSnapshot();
    }
  );
});
