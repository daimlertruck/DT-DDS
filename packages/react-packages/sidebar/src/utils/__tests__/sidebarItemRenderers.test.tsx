import React from 'react';

import { render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import {
  renderCollapsed,
  renderContent,
  renderExpanded,
} from '../sidebarItemRenderers';

describe('sidebarItemRenderers', () => {
  describe('renderCollapsed', () => {
    const ProvidedWrapper = withProviders(
      ({ children }: { children: React.ReactNode }) => <>{children}</>
    );

    describe('with custom link element', () => {
      it('extracts icons from link children and renders wrapped link', () => {
        const MockLink = ({
          href,
          children,
        }: {
          href: string;
          children: React.ReactNode;
        }) => <a href={href}>{children}</a>;

        const linkElement = (
          <MockLink href='/dashboard'>
            <Icon code='dashboard' />
            <span>Dashboard</span>
          </MockLink>
        );

        const result = renderCollapsed(
          linkElement as React.ReactElement,
          undefined,
          false,
          true
        );

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        const link = container.querySelector('a[href="/dashboard"]');
        expect(link).toBeTruthy();
        // Should only contain icon, not text
        expect(link).not.toHaveTextContent('Dashboard');
      });

      it('returns null when link has no children', () => {
        const MockLink = ({ href }: { href: string }) => (
          <a aria-label='Dashboard link' href={href} />
        );

        const linkElement = <MockLink href='/dashboard' />;

        const result = renderCollapsed(
          linkElement as React.ReactElement,
          undefined,
          false,
          true
        );

        expect(result).toBeNull();
      });

      it('returns null when link has no icons', () => {
        const MockLink = ({
          href,
          children,
        }: {
          href: string;
          children: React.ReactNode;
        }) => <a href={href}>{children}</a>;

        const linkElement = (
          <MockLink href='/dashboard'>
            <span>Dashboard</span>
          </MockLink>
        );

        const result = renderCollapsed(
          linkElement as React.ReactElement,
          undefined,
          false,
          true
        );

        expect(result).toBeNull();
      });
    });

    describe('with href prop', () => {
      it('filters icons and renders styled link', () => {
        const children = [
          <Icon code='dashboard' key='1' />,
          <span key='2'>Dashboard</span>,
        ];

        const result = renderCollapsed(children, '/dashboard', false, true);

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        const link = container.querySelector('a[href="/dashboard"]');
        expect(link).toBeTruthy();
        // Should only contain icon
        expect(link).not.toHaveTextContent('Dashboard');
      });

      it('returns null when no icons are present', () => {
        const children = [<span key='1'>Dashboard</span>];

        const result = renderCollapsed(children, '/dashboard', false, true);

        expect(result).toBeNull();
      });
    });
  });

  describe('renderExpanded', () => {
    const ProvidedWrapper = withProviders(
      ({ children }: { children: React.ReactNode }) => <>{children}</>
    );

    describe('with custom link element', () => {
      it('partitions link children and renders with wrapper', () => {
        const MockLink = ({
          href,
          children,
        }: {
          href: string;
          children: React.ReactNode;
        }) => <a href={href}>{children}</a>;

        const content = (
          <>
            <MockLink href='/dashboard'>
              <Icon code='dashboard' />
              <span>Dashboard</span>
            </MockLink>
            <span key='1'>Extra</span>
          </>
        );

        const result = renderExpanded(content, undefined, false, false);

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        const link = container.querySelector('a[href="/dashboard"]');
        expect(link).toBeTruthy();
        // Should contain both icon and text
        expect(link).toHaveTextContent('Dashboard');
      });
    });

    describe('with href prop', () => {
      it('renders content with href wrapped in styled link', () => {
        const content = [
          <Icon code='dashboard' key='1' />,
          <span key='2'>Dashboard</span>,
        ];

        const result = renderExpanded(content, '/dashboard', false, false);

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        const link = container.querySelector('a[href="/dashboard"]');
        expect(link).toBeTruthy();
        expect(link).toHaveTextContent('Dashboard');
      });

      it('renders content without href when href is not provided', () => {
        const content = [
          <Icon code='dashboard' key='1' />,
          <span key='2'>Dashboard</span>,
        ];

        const result = renderExpanded(content, undefined, false, false);

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        // Should not have a link
        const link = container.querySelector('a');
        expect(link).toBeNull();
        // But should have content
        expect(container).toHaveTextContent('Dashboard');
      });
    });
  });

  describe('renderContent', () => {
    const ProvidedWrapper = withProviders(
      ({ children }: { children: React.ReactNode }) => <>{children}</>
    );

    describe('collapsed state', () => {
      it('renders collapsed with link child', () => {
        const MockLink = ({
          href,
          children,
        }: {
          href: string;
          children: React.ReactNode;
        }) => <a href={href}>{children}</a>;

        const content = (
          <MockLink href='/dashboard'>
            <Icon code='dashboard' />
            <span>Dashboard</span>
          </MockLink>
        );

        const result = renderContent(content, undefined, false, true);

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        const link = container.querySelector('a[href="/dashboard"]');
        expect(link).toBeTruthy();
        // Should only show icon
        expect(link).not.toHaveTextContent('Dashboard');
      });

      it('renders collapsed with href prop', () => {
        const content = [
          <Icon code='dashboard' key='1' />,
          <span key='2'>Dashboard</span>,
        ];

        const result = renderContent(content, '/dashboard', false, true);

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        const link = container.querySelector('a[href="/dashboard"]');
        expect(link).toBeTruthy();
      });

      it('returns null when collapsed and no icons present', () => {
        const content = <span>No Icon</span>;

        const result = renderContent(content, '/dashboard', false, true);

        expect(result).toBeNull();
      });
    });

    describe('expanded state', () => {
      it('renders expanded with link child', () => {
        const MockLink = ({
          href,
          children,
        }: {
          href: string;
          children: React.ReactNode;
        }) => <a href={href}>{children}</a>;

        const content = (
          <>
            <MockLink href='/dashboard'>
              <Icon code='dashboard' />
              <span>Dashboard</span>
            </MockLink>
            <span>Extra</span>
          </>
        );

        const result = renderContent(content, undefined, false, false);

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        const link = container.querySelector('a[href="/dashboard"]');
        expect(link).toBeTruthy();
        // Should show both icon and text
        expect(link).toHaveTextContent('Dashboard');
      });

      it('renders expanded with href prop', () => {
        const content = [
          <Icon code='dashboard' key='1' />,
          <span key='2'>Dashboard</span>,
        ];

        const result = renderContent(content, '/dashboard', false, false);

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        const link = container.querySelector('a[href="/dashboard"]');
        expect(link).toBeTruthy();
        expect(link).toHaveTextContent('Dashboard');
      });

      it('renders expanded without link when no href or link child', () => {
        const content = [
          <Icon code='dashboard' key='1' />,
          <span key='2'>Dashboard</span>,
        ];

        const result = renderContent(content, undefined, false, false);

        expect(result).toBeTruthy();
        const { container } = render(
          <ProvidedWrapper>{result}</ProvidedWrapper>
        );
        // Should not have a link
        const link = container.querySelector('a');
        expect(link).toBeNull();
        // But should have content
        expect(container).toHaveTextContent('Dashboard');
      });
    });
  });
});
