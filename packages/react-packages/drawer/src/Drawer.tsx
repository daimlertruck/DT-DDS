import React, { useCallback, useEffect, useState } from 'react';

import { Global } from '@emotion/react';

import { BaseProps } from '@dt-dds/react-core';

import { DrawerBody, DrawerHeader, DrawerTitle } from './components';
import { DrawerContextProvider } from './context/DrawerProvider';
import {
  DrawerStyled,
  GlobalStyle,
  MainContainerStyled,
  OverlayStyled,
} from './Drawer.styled';

export interface DrawerProps extends BaseProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer = ({
  isVisible,
  setIsVisible,
  children,
  dataTestId,
}: DrawerProps) => {
  const [isTransformed, setIsTransformed] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsTransformed(false);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (!isTransformed) {
      setIsVisible(false);
    }
  }, [isTransformed, setIsVisible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTransformed(isVisible);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, isVisible]);

  return (
    <DrawerContextProvider handleClose={handleClose}>
      <MainContainerStyled>
        {isVisible ? <Global styles={GlobalStyle} /> : null}

        <OverlayStyled
          data-testid='drawer-overlay'
          $isVisible={isTransformed}
          onClick={handleClose}
        />

        <DrawerStyled
          data-testid={dataTestId ?? 'drawer-content-container'}
          $isVisible={isTransformed}
          onTransitionEnd={handleTransitionEnd}
        >
          {children}
        </DrawerStyled>
      </MainContainerStyled>
    </DrawerContextProvider>
  );
};

Drawer.Title = DrawerTitle;
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;

export default Drawer;
