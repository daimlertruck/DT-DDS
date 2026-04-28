import { render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { defaultTheme as theme } from '@dt-dds/themes';

import { Link } from '.';

describe('<Link /> component', () => {
  const ProvidedLink = withProviders(Link);

  it('should render an icon when icon prop is provided', () => {
    render(
      <ProvidedLink href='/' icon='10k'>
        Redirect To
      </ProvidedLink>
    );

    expect(screen.getByTestId('icon')).toHaveTextContent('10k');
  });

  describe('inline variant', () => {
    it('should render with underline text decoration', () => {
      render(
        <ProvidedLink href='/' variant='inline'>
          Redirect To
        </ProvidedLink>
      );

      expect(screen.getByTestId('link')).toHaveStyleRule(
        'text-decoration',
        'underline'
      );
    });

    it.each`
      state        | expectedColor                   | target
      ${'default'} | ${theme.palette.accent.default} | ${undefined}
      ${'hover'}   | ${theme.palette.accent.dark}    | ${':hover'}
      ${'active'}  | ${theme.palette.accent.medium}  | ${':active'}
    `(
      'should render with correct $state color',
      ({ expectedColor, target }) => {
        render(
          <ProvidedLink href='/' variant='inline'>
            Redirect To
          </ProvidedLink>
        );

        expect(screen.getByTestId('link')).toHaveStyleRule(
          'color',
          expectedColor,
          target ? { target } : undefined
        );
      }
    );

    it('should render disabled with correct color', () => {
      render(
        <ProvidedLink href='/' variant='inline' isDisabled>
          Redirect To
        </ProvidedLink>
      );

      expect(screen.getByTestId('link')).toHaveStyleRule(
        'color',
        theme.palette.content.light
      );
      expect(screen.getByTestId('link')).toHaveStyleRule(
        'cursor',
        'not-allowed'
      );
    });
  });

  describe('standalone variant', () => {
    it.each`
      color          | state        | expectedColor                      | target
      ${'primary'}   | ${'default'} | ${theme.palette.primary.default}   | ${undefined}
      ${'primary'}   | ${'hover'}   | ${theme.palette.accent.default}    | ${':hover'}
      ${'primary'}   | ${'active'}  | ${theme.palette.accent.default}    | ${':active'}
      ${'secondary'} | ${'default'} | ${theme.palette.secondary.default} | ${undefined}
      ${'secondary'} | ${'hover'}   | ${theme.palette.secondary.dark}    | ${':hover'}
      ${'secondary'} | ${'active'}  | ${theme.palette.secondary.medium}  | ${':active'}
    `(
      'should render $color color with correct $state color',
      ({ color, expectedColor, target }) => {
        render(
          <ProvidedLink href='/' variant='standalone' color={color}>
            Redirect To
          </ProvidedLink>
        );

        expect(screen.getByTestId('link')).toHaveStyleRule(
          'color',
          expectedColor,
          target ? { target } : undefined
        );
      }
    );

    it.each`
      color          | expectedColor
      ${'primary'}   | ${theme.palette.primary.light}
      ${'secondary'} | ${theme.palette.secondary.light}
    `(
      'should render $color disabled with correct color',
      ({ color, expectedColor }) => {
        render(
          <ProvidedLink href='/' variant='standalone' color={color} isDisabled>
            Redirect To
          </ProvidedLink>
        );

        expect(screen.getByTestId('link')).toHaveStyleRule(
          'color',
          expectedColor
        );
        expect(screen.getByTestId('link')).toHaveStyleRule(
          'cursor',
          'not-allowed'
        );
      }
    );
  });
});
