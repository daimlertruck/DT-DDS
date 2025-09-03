import { Box, Typography } from '@dt-dds/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import logo from '../../assets/images/logo.svg';

import { MobileNavigation } from '../MobileNavigation';

import {
  HeaderStyled,
  HeaderStyledLayout,
  LogoStyled,
  NavigationStyled,
  BrandStyled,
} from './Header.styled';

const pages = [
  { label: 'Table Lists', link: '/table-lists', namespace: 'TableLists' },
  { label: 'Forms', link: '/forms', namespace: 'Forms' },
];

export const Header = () => {
  const path = usePathname();

  return (
    <HeaderStyled>
      <HeaderStyledLayout>
        <Box
          style={{
            alignItems: 'flex-start',
            gap: '1rem',
            flexDirection: 'row',
            padding: '1.5rem 0',
          }}
        >
          <MobileNavigation items={pages as never} />

          <BrandStyled href='/'>
            <Typography element='h5' fontStyles='h5' color='grey_120'>
              Demo App
            </Typography>
          </BrandStyled>
        </Box>

        <LogoStyled>
          <Link href='/'>
            <Image
              src={logo}
              priority={true}
              alt='Daimler Truck'
              sizes='100vw'
              width={208}
              height={16}
            />
          </Link>
        </LogoStyled>

        <NavigationStyled>
          {pages.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              {...(path === item.link && { 'aria-current': 'page' })}
            >
              {item.label}
            </Link>
          ))}
        </NavigationStyled>
      </HeaderStyledLayout>
    </HeaderStyled>
  );
};
