import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { defaultTheme as theme } from '@dt-dds/themes';

import {
  AccordionControlledProps,
  AccordionProps,
  AccordionUncontrolledProps,
} from './Accordion';

import { Accordion } from '.';

describe('<Accordion /> component', () => {
  const ProvidedAccordion = withProviders(
    Accordion
  ) as React.ComponentType<AccordionProps>;

  const renderAccordion = (props: AccordionProps) => {
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

  const renderControlledAccordion = (
    props?: Partial<AccordionControlledProps>
  ) => renderAccordion({ ...props } as AccordionControlledProps);

  const renderUncontrolledAccordion = (
    props?: Partial<AccordionUncontrolledProps>
  ) => renderAccordion({ ...props } as AccordionUncontrolledProps);

  describe('uncontrolled', () => {
    it('should toggle open/close when clicking/key pressing the header', () => {
      const { header, body } = renderUncontrolledAccordion();

      expect(body).toHaveStyle({ gridTemplateRows: '0fr' });
      expect(body).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(header);

      expect(body).toHaveStyle({ gridTemplateRows: '1fr' });
      expect(body).toHaveAttribute('aria-expanded', 'true');

      fireEvent.keyDown(header, { key: 'Enter' });

      expect(body).toHaveAttribute('aria-expanded', 'false');
    });

    it('should start open when defaultIsOpen is true', () => {
      const { body } = renderUncontrolledAccordion({ defaultIsOpen: true });

      expect(body).toHaveAttribute('aria-expanded', 'true');
    });

    it('should not toggle when disabled', () => {
      const { header, body } = renderUncontrolledAccordion({
        isDisabled: true,
      });
      expect(body).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(header);

      expect(body).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('controlled', () => {
    it('should reflect the isOpen prop', () => {
      const onToggle = jest.fn();
      const { body } = renderControlledAccordion({ isOpen: true, onToggle });

      expect(body).toHaveAttribute('aria-expanded', 'true');
    });

    it('should call onToggle but not update internally when clicked', () => {
      const onToggle = jest.fn();
      const { header, body } = renderControlledAccordion({
        isOpen: false,
        onToggle,
      });

      fireEvent.click(header);

      expect(onToggle).toHaveBeenCalledWith(true);
      expect(body).toHaveAttribute('aria-expanded', 'false');
    });

    it('should not call onToggle when disabled', () => {
      const onToggle = jest.fn();
      const { header } = renderControlledAccordion({
        isOpen: false,
        onToggle,
        isDisabled: true,
      });

      fireEvent.click(header);

      expect(onToggle).not.toHaveBeenCalled();
    });
  });

  describe('background', () => {
    it.each`
      background       | color
      ${'transparent'} | ${'transparent'}
      ${'light'}       | ${theme.palette.surface.light}
      ${'contrast'}    | ${theme.palette.surface.contrast}
    `(
      'should apply the correct background style when background is $background',
      ({ background, color }) => {
        const { container } = renderUncontrolledAccordion({ background });

        expect(container.firstChild).toHaveStyle({
          backgroundColor: color,
        });
      }
    );
  });

  describe('hasBorderBottom', () => {
    it('should render a bottom border when hasBorderBottom is true', () => {
      const { container } = renderUncontrolledAccordion({
        hasBorderBottom: true,
      });

      expect(container.firstChild).toHaveStyle({
        borderBottom: `1px solid ${theme.palette.border.default}`,
      });
    });

    it('should not render a bottom border when hasBorderBottom is false', () => {
      const { container } = renderUncontrolledAccordion({
        hasBorderBottom: false,
      });

      expect(container.firstChild).not.toHaveStyle({
        borderBottom: `1px solid ${theme.palette.border.default}`,
      });
    });
  });
});
