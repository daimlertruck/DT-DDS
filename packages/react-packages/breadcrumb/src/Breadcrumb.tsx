import { BaseProps } from '@dt-dds/react-core';
import { Tooltip } from '@dt-dds/react-tooltip';
import { Children, ReactNode, cloneElement, isValidElement } from 'react';

import { ArrowRightIcon } from '../../../dt-dds-react/core';

import {
  BreadcrumbStyled,
  ListStyled,
  ItemStyled,
  ItemContainerStyled,
} from './Breadcrumb.styled';
import { useCollapsedBreadcrumb } from './hooks/useCollapsedBreadcrumb';

const BREADCRUMB_CHARACTER_LIMIT = 30;

type BreadcrumbSeparator = 'slash' | 'arrow';

export interface BreadcrumbProps extends BaseProps {
  separator?: BreadcrumbSeparator;
}

export const Breadcrumb = ({
  children,
  separator = 'slash',
}: BreadcrumbProps) => {
  const { visibleChildren, breadcrumbRef, breadcrumbListRef } =
    useCollapsedBreadcrumb(children);

  return (
    <BreadcrumbStyled
      aria-label='Breadcrumb'
      data-testid='breadcrumb'
      ref={breadcrumbRef}
    >
      <ListStyled ref={breadcrumbListRef}>
        {withSeparator(visibleChildren, separator)}
      </ListStyled>
    </BreadcrumbStyled>
  );
};

const BreadcrumbItem = ({ children, style }: BaseProps) => {
  const { truncatedChildren, tooltip } = mapTruncateChildren(children);

  return (
    <ItemStyled style={style}>
      <Tooltip style={{ overflow: 'hidden' }}>
        <ItemContainerStyled>{truncatedChildren}</ItemContainerStyled>
        <Tooltip.Content>{tooltip}</Tooltip.Content>
      </Tooltip>
    </ItemStyled>
  );
};

const truncateText = (text: string) => {
  if (text.length >= BREADCRUMB_CHARACTER_LIMIT) {
    return `${text.substring(0, BREADCRUMB_CHARACTER_LIMIT)}...`;
  }
  return text;
};

const mapTruncateChildren = (
  children: ReactNode
): { tooltip: string; truncatedChildren: ReactNode } => {
  let tooltip = '';
  return {
    truncatedChildren: Children.map(children, (child) => {
      if (typeof child === 'string') {
        const truncatedText = truncateText(child);
        tooltip = truncatedText !== child ? child : '';

        return truncatedText;
      } else if (isValidElement(child)) {
        const { truncatedChildren, tooltip: childTooltip } =
          mapTruncateChildren(child.props.children);
        tooltip = childTooltip;

        return cloneElement(child, {
          ...child.props,
          children: truncatedChildren,
        });
      } else {
        return null;
      }
    }),
    tooltip,
  };
};

const withSeparator = (children: ReactNode, separator: BreadcrumbSeparator) => {
  const addSeparator = () =>
    ({
      slash: <span>/</span>,
      arrow: <ArrowRightIcon />,
    }[separator]);

  const isLastBreadcrumb = (index: number) =>
    Children.count(children) - 1 === index;

  return Children.map(children, (child, index) => (
    <>
      {child}
      {!isLastBreadcrumb(index) && addSeparator()}
    </>
  ));
};

Breadcrumb.Item = BreadcrumbItem;
