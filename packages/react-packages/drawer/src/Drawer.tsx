import React, { useCallback, useEffect, useState } from 'react';

import { useTheme, Global } from '@emotion/react';

import { DrawerTitle, DrawerHeader, DrawerBody } from './components';
import { DrawerContextProvider } from './context/DrawerProvider';
import {
  GlobalStyle,
  DrawerStyled,
  DrawerBaseProps,
  OverlayStyled,
  MainContainerStyled,
} from './Drawer.styled';

const animationToMiliseconds = (duration: string) =>
  parseFloat(duration.replace(/[^\d.]/g, '')) * 1000;

export interface DrawerProps extends DrawerBaseProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer = ({
  isVisible,
  setIsVisible,
  children,
  dataTestId,
}: DrawerProps) => {
  const [isTransformed, setIsTransformed] = useState<boolean>(false);
  const theme = useTheme();

  const handleClose = useCallback(() => {
    setIsTransformed(false);
    setTimeout(() => {
      setIsVisible(false);
    }, animationToMiliseconds(theme.animations.emphasizedDecelerate.timingFunction));
  }, [setIsVisible, theme.animations.emphasizedDecelerate.timingFunction]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

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
          isVisible={isTransformed}
          onClick={handleClose}
        />

        <DrawerStyled
          data-testid={dataTestId ?? 'drawer-content-container'}
          isVisible={isTransformed}
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
