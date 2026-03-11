import { useRef, useState } from 'react';

import { Dropdown } from '@dt-dds/react-dropdown';

import { ButtonStyled } from './Buffer.styled';
import { PAGINATION_BUTTON_SIZES } from '../../constants';

interface BufferProps {
  upperLimit: number;
  lowerLimit: number;
  onClick?: (page: number) => void;
}

export const Buffer = ({ upperLimit, lowerLimit, onClick }: BufferProps) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const bufferPages = Array.from(
    { length: upperLimit - lowerLimit - 1 },
    (_, i) => lowerLimit + i + 1
  );

  const pickPage = (page: number) => {
    onClick?.(page);
    setIsOpen(false);
  };

  return (
    <>
      <div ref={anchorRef}>
        <ButtonStyled
          data-testid='pagination-ellipsis'
          onClick={() => setIsOpen(true)}
          size='small'
          style={{ width: PAGINATION_BUTTON_SIZES }}
          variant='text'
        >
          ...
        </ButtonStyled>
      </div>
      <Dropdown
        anchorRef={anchorRef}
        as='div'
        isOpen={isOpen}
        matchWidth
        offsetX={0}
        offsetY={4}
        onClose={() => setIsOpen(false)}
        placement='bottom'
      >
        {bufferPages.map((page) => (
          <Dropdown.Option key={page} onClick={() => pickPage(page)}>
            {page}
          </Dropdown.Option>
        ))}
      </Dropdown>
    </>
  );
};
