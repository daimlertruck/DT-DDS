import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '@dt-dds/react-button';
import { Provider, withProviders } from '@dt-dds/react-core';

import { Modal, Overlay } from './Modal';

describe('<Modal/> Component', () => {
  const ProvidedOverlay = withProviders(Overlay);

  const handleClick = jest.fn();

  describe('handle modal actions', () => {
    beforeEach(() => {
      render(
        <ProvidedOverlay dataTestId='modal-overlay' isOpen>
          <Modal onClickOutside={handleClick}>
            <Modal.Header
              onClose={handleClick}
              subTitle='Sub Title'
              title='Title'
            />
            <Modal.Content>Some text here</Modal.Content>
            <Modal.Footer>
              <Button
                color='secondary'
                dataTestId='cancel'
                onClick={handleClick}
                variant='outlined'
              >
                Cancel
              </Button>
              <Button dataTestId='action' onClick={handleClick}>
                Action
              </Button>
            </Modal.Footer>
          </Modal>
        </ProvidedOverlay>
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders modal correctly', () => {
      expect(screen.getByTestId('modal-overlay')).toMatchSnapshot();
    });

    it('fires the mock close function when clicking on the x', () => {
      const closeBtn = screen.getByTestId('close-button');
      fireEvent.click(closeBtn);

      expect(handleClick).toBeCalledTimes(1);
    });

    it('fires the mock close function when clicking on cancel', () => {
      const cancelBtn = screen.getByTestId('cancel-button');
      fireEvent.click(cancelBtn);

      expect(handleClick).toBeCalledTimes(1);
    });

    it('fires the mock action function when clicking on action', () => {
      const actionBtn = screen.getByTestId('action-button');
      fireEvent.click(actionBtn);

      expect(handleClick).toBeCalledTimes(1);
    });
  });

  describe('handle close outside modal', () => {
    beforeEach(() => {
      jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: document.createElement('button') });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should fire handle close function when clicking outside', () => {
      render(
        <>
          <ProvidedOverlay dataTestId='modal-overlay' isOpen>
            <Modal onClickOutside={handleClick}>Content</Modal>
          </ProvidedOverlay>
          <div>outside</div>
        </>
      );

      fireEvent.mouseDown(screen.getAllByText('outside')[0]);

      expect(handleClick).toBeCalledTimes(1);
    });

    it('should not fire handle close function when clicking outside', () => {
      render(
        <>
          <ProvidedOverlay dataTestId='modal-overlay' isOpen>
            <Modal>Content</Modal>
          </ProvidedOverlay>
          <div>outside</div>
        </>
      );

      fireEvent.mouseDown(screen.getAllByText('outside')[0]);

      expect(handleClick).toBeCalledTimes(0);
    });
  });

  it('forwards ref correctly', () => {
    const modalRef = React.createRef<HTMLDivElement>();
    render(
      <Provider>
        <Overlay isOpen ref={modalRef}>
          <Modal>Content</Modal>
        </Overlay>
      </Provider>
    );

    expect(modalRef.current).not.toBeNull();
  });

  describe('handle loading state', () => {
    beforeEach(() => {
      render(
        <>
          <ProvidedOverlay dataTestId='modal-overlay' isOpen>
            <Modal onClickOutside={handleClick}>
              <Modal.Header onClose={handleClick} title='Title' />
              <Modal.Content isLoading>Some text here</Modal.Content>
            </Modal>
          </ProvidedOverlay>
          <div>outside</div>
        </>
      );
    });

    it('renders modal with loading overlay correctly', () => {
      expect(screen.getByTestId('modal-overlay')).toMatchSnapshot();
    });

    it('should fire handle close function when clicking outside', () => {
      fireEvent.mouseDown(screen.getAllByText('outside')[0]);

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
