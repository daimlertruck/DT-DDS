import { FormEvent, ReactNode } from 'react';

import { BaseProps } from '@dt-dds/react-core';
import { OTooltipDirection, Tooltip } from '@dt-dds/react-tooltip';
import { Typography } from '@dt-dds/react-typography';

import {
  FormStyled,
  GroupItemsStyled,
  GroupStyled,
  LabelStyled,
} from './Form.styled';
import { InfoIcon } from '../../../dt-dds-react/core';

export interface GroupProps extends BaseProps {
  isDisabled?: boolean;
  title?: string;
  tooltip?: ReactNode;
}

export interface FormProps extends BaseProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const DEFAULT_ON_SUBMIT = (event: FormEvent<HTMLFormElement>) =>
  event.preventDefault();

export const Form = ({
  children,
  dataTestId,
  style,
  onSubmit = DEFAULT_ON_SUBMIT,
}: FormProps) => {
  const testId = dataTestId ?? 'test-form';

  return (
    <FormStyled data-testid={testId} onSubmit={onSubmit} style={style}>
      {children}
    </FormStyled>
  );
};

Form.Group = ({ children, isDisabled, title, tooltip }: GroupProps) => {
  return (
    <GroupStyled>
      {title ? (
        <LabelStyled>
          <Typography
            color='primary.default'
            fontStyles='h6'
            style={{ textTransform: 'uppercase' }}
          >
            {title}
          </Typography>
          {tooltip ? (
            <Tooltip>
              <InfoIcon height='16' width='16' />
              <Tooltip.Content
                direction={OTooltipDirection.Right}
                style={{ maxWidth: 250 }}
              >
                {tooltip}
              </Tooltip.Content>
            </Tooltip>
          ) : null}
        </LabelStyled>
      ) : null}

      <GroupItemsStyled disabled={isDisabled}>{children}</GroupItemsStyled>
    </GroupStyled>
  );
};
