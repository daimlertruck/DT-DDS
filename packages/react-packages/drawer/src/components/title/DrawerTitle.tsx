import { useTheme } from '@emotion/react';

import { Code } from '@dt-dds/icons';
import { Box } from '@dt-dds/react-box';
import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';

export interface DrawerTitleProps {
  title: string;
  icon?: Code;
}

export const DrawerTitle = ({ title, icon }: DrawerTitleProps) => {
  const theme = useTheme();

  return (
    <Box
      style={{
        flexDirection: 'row',
        gap: theme.spacing.spacing_20,
      }}
    >
      {icon && <Icon code={icon} />}

      <Typography color='content.dark' element='h4' fontStyles='h4Bold'>
        {title}
      </Typography>
    </Box>
  );
};
