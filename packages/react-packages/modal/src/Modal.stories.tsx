import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@dt-dds/react-button';

import { ModalHeaderProps, ModalContentProps } from './components';
import { useModal } from './hooks';
import { Modal, ModalProps, Overlay } from './Modal';

type ModalStoryProps = {
  hasHeaderBorder: boolean;
  hasHeaderBackgroundColor: boolean;
  hasFooterBorder: boolean;
  hasFooterBackgroundColor: boolean;
  actionTitle: string;
  content: string;
} & ModalProps &
  ModalHeaderProps &
  ModalContentProps;

const Template: StoryFn<ModalStoryProps> = ({
  actionTitle,
  content,
  title,
  subTitle,
  hasHeaderBorder,
  hasFooterBorder,
  hasFooterBackgroundColor,
  isLoading,
}) => {
  const { isModalOpen, toggleModal } = useModal();

  return (
    <>
      <button onClick={toggleModal} type='button'>
        Click me
      </button>
      <Overlay isOpen={isModalOpen}>
        <Modal onClickOutside={toggleModal}>
          <Modal.Header
            hasBorder={hasHeaderBorder}
            onClose={toggleModal}
            subTitle={subTitle}
            title={title}
          />
          {content ? (
            <Modal.Content isLoading={isLoading}>
              <p>{content}</p>
            </Modal.Content>
          ) : null}
          <Modal.Footer
            hasBackgroundColor={hasFooterBackgroundColor}
            hasBorder={hasFooterBorder}
          >
            <Button
              color='secondary'
              dataTestId='cancel'
              onClick={toggleModal}
              variant='outlined'
            >
              Cancel
            </Button>
            <Button
              dataTestId='action'
              isDisabled={isLoading}
              onClick={() => null}
            >
              {actionTitle}
            </Button>
          </Modal.Footer>
        </Modal>
      </Overlay>
    </>
  );
};

const meta: Meta<ModalStoryProps> = {
  title: 'Data Display/Modal',
  component: Modal,
  render: Template,
  argTypes: {
    hasHeaderBorder: {
      control: { type: 'boolean' },
      defaultValue: { summary: false },
      description: 'Add bottom border to Header',
    },
    hasHeaderBackgroundColor: {
      control: { type: 'boolean' },
      defaultValue: { summary: false },
      description: 'Add background color to Header',
    },
    hasFooterBorder: {
      control: { type: 'boolean' },
      defaultValue: { summary: false },
      description: 'Add top border to footer',
    },
    hasFooterBackgroundColor: {
      control: { type: 'boolean' },
      defaultValue: { summary: false },
      description: 'Add background color to Footer',
    },
    onClickOutside: {
      description: 'Enables click outside to trigger close an action',
    },
    isLoading: {
      control: { type: 'boolean' },
      defaultValue: { summary: false },
      description: 'Adds loading spinner and overlay',
    },
  },
};

export const Default = {
  args: {
    actionTitle: 'Action',
    content: 'Some content here',
    title: 'Title',
    subTitle: 'Some random Subtitle here',
    hasHeaderBorder: false,
    hasHeaderBackgroundColor: false,
    hasFooterBorder: false,
    hasFooterBackgroundColor: false,
    isLoading: false,
  },
};

export default meta;
