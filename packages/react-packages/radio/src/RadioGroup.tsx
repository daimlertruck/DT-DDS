import { Children, cloneElement, ReactElement, useMemo } from 'react';

import { useTheme } from '@emotion/react';

import { Box } from '@dt-dds/react-box';

import { RadioGroupProps } from './types';

export const RadioGroup = ({
  children,
  onChange,
  dataTestId,
  direction = 'row',
  size = 'large',
  name,
}: RadioGroupProps) => {
  const theme = useTheme();

  const clonedChildren = useMemo(
    () =>
      Children.map(children as ReactElement<RadioGroupProps>, (child) => {
        return (
          child &&
          cloneElement(child, {
            ...child.props,
            onChange,
            name,
            size,
          })
        );
      }),
    [children, onChange, name, size]
  );

  return (
    <Box
      data-testid={dataTestId ?? 'radio-group'}
      style={{
        flexDirection: direction,
        gap: theme.spacing.spacing_40,
        alignItems: direction === 'row' ? 'center' : 'flex-start',
      }}
    >
      {clonedChildren}
    </Box>
  );
};
