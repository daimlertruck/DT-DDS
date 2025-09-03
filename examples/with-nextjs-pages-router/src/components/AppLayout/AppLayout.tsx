import { Toaster } from '@dt-dds/react';
import { Header } from './../Header';
import { MainStyled, ContainerStyled } from './AppLayout.styled';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <MainStyled>
        <ContainerStyled>{children}</ContainerStyled>
      </MainStyled>
      <footer>
        <p>Footer</p>
      </footer>
      <Toaster
        containerStyle={{
          zIndex: 10,
        }}
      />
    </>
  );
};
