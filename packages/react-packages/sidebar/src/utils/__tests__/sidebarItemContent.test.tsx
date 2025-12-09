import React, { ReactElement } from 'react';

import { render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import {
  createLinkStyledProps,
  createLinkWrapperProps,
  createWrapperProps,
  extractTextContent,
  partitionIconAndContent,
  wrapTextContent,
  wrapWithTooltip,
} from '../sidebarItemContent';

describe('sidebarItemContent', () => {
  describe('extractTextContent', () => {
    it('extracts direct string from children array', () => {
      const children = ['Dashboard', <Icon code='dashboard' key='1' />];
      const text = extractTextContent(children);
      expect(text).toBe('Dashboard');
    });

    it('extracts string from nested React element children', () => {
      const children = [
        <span key='1'>
          <Icon code='dashboard' />
          Dashboard
        </span>,
      ];
      const text = extractTextContent(children);
      expect(text).toBe('Dashboard');
    });

    it('returns undefined when no string is found', () => {
      const children = [<Icon code='dashboard' key='1' />, <span key='2' />];
      const text = extractTextContent(children);
      expect(text).toBeUndefined();
    });

    it('returns undefined for empty array', () => {
      const text = extractTextContent([]);
      expect(text).toBeUndefined();
    });
  });

  describe('partitionIconAndContent', () => {
    it('separates first icon from rest of content', () => {
      const children = [
        <Icon code='dashboard' key='1' />,
        <span key='2'>Dashboard</span>,
        <span key='3'>Text</span>,
      ];

      const { firstIcon, textContent } = partitionIconAndContent(children);

      expect(firstIcon).toBeTruthy();
      expect((firstIcon as ReactElement).props.code).toBe('dashboard');
      expect(textContent).toHaveLength(2);
    });

    it('returns null for firstIcon when no icon is present', () => {
      const children = [<span key='1'>Text</span>, <div key='2'>Content</div>];

      const { firstIcon, textContent } = partitionIconAndContent(children);

      expect(firstIcon).toBeNull();
      expect(textContent).toHaveLength(2);
    });

    it('handles icon in the middle of children', () => {
      const children = [
        <span key='1'>Before</span>,
        <Icon code='dashboard' key='2' />,
        <span key='3'>After</span>,
      ];

      const { firstIcon, textContent } = partitionIconAndContent(children);

      expect(firstIcon).toBeTruthy();
      expect((firstIcon as ReactElement).props.code).toBe('dashboard');
      expect(textContent).toHaveLength(2);
    });

    it('handles empty children', () => {
      const { firstIcon, textContent } = partitionIconAndContent([]);

      expect(firstIcon).toBeNull();
      expect(textContent).toEqual([]);
    });
  });

  describe('wrapTextContent', () => {
    it('wraps content in SidebarItemTextContent styled component', () => {
      const content = [<span key='1'>Text</span>];
      const wrapped = wrapTextContent(content, false);

      expect(wrapped).toBeTruthy();
      const { container } = render(<>{wrapped}</>);
      const textContent = container.querySelector('span');
      expect(textContent).toBeTruthy();
      expect(textContent).toHaveTextContent('Text');
    });

    it('applies hidden styles when isSidebarCollapsed is true', () => {
      const content = [<span key='1'>Text</span>];
      const wrapped = wrapTextContent(content, true);

      expect(wrapped).toBeTruthy();
      const { container } = render(<>{wrapped}</>);

      const textContentWrapper = container.firstChild;
      expect(textContentWrapper).toHaveStyle({
        opacity: '0',
        visibility: 'hidden',
      });
    });

    it('returns null for empty content', () => {
      expect(wrapTextContent([], false)).toBeNull();
    });
  });

  describe('wrapWithTooltip', () => {
    const ProvidedWrapper = withProviders(
      ({ children }: { children: React.ReactNode }) => <>{children}</>
    );

    it('wraps content in Tooltip when tooltipText is provided', () => {
      const content = <span>Content</span>;
      const wrapped = wrapWithTooltip(content, 'Tooltip text');

      expect(wrapped).toBeTruthy();
      const { container } = render(
        <ProvidedWrapper>{wrapped}</ProvidedWrapper>
      );
      expect(container).toHaveTextContent('Content');
      // Tooltip content is rendered but may not be immediately visible
      // We verify the structure exists by checking the content is wrapped
      expect(wrapped).not.toBe(content);
    });

    it('returns content as-is when tooltipText is not provided', () => {
      const content = <span>Content</span>;
      const wrapped = wrapWithTooltip(content);

      expect(wrapped).toBe(content);
    });

    it('returns content as-is when tooltipText is undefined', () => {
      const content = <span>Content</span>;
      const wrapped = wrapWithTooltip(content, undefined);

      expect(wrapped).toBe(content);
    });
  });

  describe('createWrapperProps', () => {
    it('creates props object with all parameters', () => {
      const props = createWrapperProps(true, true, true, 'header');

      expect(props).toEqual({
        isActive: true,
        isSidebarCollapsed: true,
        isNested: true,
        sectionVariant: 'header',
      });
    });

    it('handles undefined values', () => {
      const props = createWrapperProps(
        undefined,
        undefined,
        undefined,
        undefined
      );

      expect(props).toEqual({
        isActive: undefined,
        isSidebarCollapsed: undefined,
        isNested: undefined,
        sectionVariant: undefined,
      });
    });
  });

  describe('createLinkWrapperProps', () => {
    it('creates props object with isActive and isSidebarCollapsed', () => {
      const props = createLinkWrapperProps(true, true);

      expect(props).toEqual({
        isActive: true,
        isSidebarCollapsed: true,
        isNested: undefined,
        sectionVariant: undefined,
      });
    });

    it('handles undefined values', () => {
      const props = createLinkWrapperProps(undefined, undefined);

      expect(props).toEqual({
        isActive: undefined,
        isSidebarCollapsed: undefined,
        isNested: undefined,
        sectionVariant: undefined,
      });
    });
  });

  describe('createLinkStyledProps', () => {
    it('creates props object with href, isActive, and isSidebarCollapsed', () => {
      const props = createLinkStyledProps('/dashboard', true, false);

      expect(props).toEqual({
        'aria-current': 'page',
        href: '/dashboard',
        isActive: true,
        isSidebarCollapsed: false,
        isNested: undefined,
        sectionVariant: undefined,
      });
    });

    it('does not include aria-current when isActive is false', () => {
      const props = createLinkStyledProps('/dashboard', false, false);

      expect(props).toEqual({
        href: '/dashboard',
        isActive: false,
        isSidebarCollapsed: false,
        isNested: undefined,
        sectionVariant: undefined,
      });
    });

    it('does not include aria-current when href is undefined', () => {
      const props = createLinkStyledProps(undefined, true, false);

      expect(props).toEqual({
        href: undefined,
        isActive: true,
        isSidebarCollapsed: false,
        isNested: undefined,
        sectionVariant: undefined,
      });
    });

    it('handles undefined values', () => {
      const props = createLinkStyledProps(undefined, undefined, undefined);

      expect(props).toEqual({
        href: undefined,
        isActive: undefined,
        isSidebarCollapsed: undefined,
        isNested: undefined,
        sectionVariant: undefined,
      });
    });
  });
});
