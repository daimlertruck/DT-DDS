import { render, screen, within, fireEvent } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { theme } from '@dt-dds/themes';

import { Avatar } from './Avatar';
import { AvatarType } from './constants';
import avatarExampleImage from './images/example-avatar-image.png';
import { AvatarSize } from './types';

describe('<Avatar /> component', () => {
  const ProvidedAvatar = withProviders(Avatar);

  const typeStyles: Record<AvatarType, string> = {
    [AvatarType.Letter]: `color: ${theme.palette.content.contrast};`,
    [AvatarType.Collapsed]: `color: ${theme.palette.content.medium};`,
    [AvatarType.Thumbnail]: `color: ${theme.palette.content.contrast};`,
    [AvatarType.Photo]: '',
  };

  it('renders avatar element with the correct content', () => {
    const { container } = render(
      <ProvidedAvatar customInitials='AAAAA' title='User Name' />
    );

    expect(container).toMatchSnapshot();
  });

  it.each`
    size        | expectedWidth
    ${'small'}  | ${'20px'}
    ${'medium'} | ${theme.spacing.spacing_60}
    ${'large'}  | ${theme.spacing.spacing_70}
  `(
    'should render avatar with correct size for $size',
    ({ size, expectedWidth }: { size: AvatarSize; expectedWidth: string }) => {
      const { getByTestId } = render(
        <ProvidedAvatar size={size} title='User Name' />
      );

      const avatar = getByTestId('avatar');
      expect(avatar).toHaveStyle({
        width: expectedWidth,
        height: expectedWidth,
      });
    }
  );

  it.each`
    type
    ${AvatarType.Letter}
    ${AvatarType.Collapsed}
    ${AvatarType.Thumbnail}
  `(
    'should render a avatar when type $type',
    ({ type }: { type: AvatarType }) => {
      const { getByTestId } = render(
        <ProvidedAvatar
          imageSrc={avatarExampleImage}
          title='User Name'
          type={type}
        />
      );

      expect(getByTestId('avatar')).toHaveStyle(typeStyles[type]);
    }
  );

  it('should fallback to thumbnail styling when photo fails to load', () => {
    const { getByTestId } = render(
      <ProvidedAvatar
        imageSrc={avatarExampleImage}
        title='User Name'
        type={AvatarType.Photo}
      />
    );

    const avatarElement = getByTestId('avatar');
    const imgElement = screen.getByAltText('User Name') as HTMLImageElement;

    fireEvent.error(imgElement);

    expect(avatarElement).toHaveStyle(typeStyles[AvatarType.Thumbnail]);
  });

  it('should render thumbnail styling when photo type has no imageSrc', () => {
    render(
      <ProvidedAvatar imageSrc='' title='User Name' type={AvatarType.Photo} />
    );

    const avatarElement = screen.getByTestId('avatar');
    expect(avatarElement).toHaveStyle(typeStyles[AvatarType.Thumbnail]);
  });

  it('renders successfully "avatarExampleImage" for photo type', () => {
    render(
      <ProvidedAvatar
        imageSrc={avatarExampleImage}
        title='User Name'
        type={AvatarType.Photo}
      />
    );

    const thumbnailImage: HTMLImageElement = screen.getByAltText('User Name');
    expect(thumbnailImage).toBeVisible();
    expect(thumbnailImage.src).toContain(avatarExampleImage);
  });

  it('renders avatar with custom initials', () => {
    const { rerender } = render(
      <ProvidedAvatar
        customInitials='AB'
        imageSrc={avatarExampleImage}
        title='User Name'
      />
    );

    expect(within(screen.getByTestId('avatar')).getByText('AB')).toBeVisible();

    rerender(
      <ProvidedAvatar
        customInitials='ABCCC'
        imageSrc={avatarExampleImage}
        title='User Name'
      />
    );

    expect(within(screen.getByTestId('avatar')).getByText('AB')).toBeVisible();
  });

  it('does not render avatar with tooltip by default', () => {
    render(<ProvidedAvatar size='medium' title='User Name' />);

    const avatarElement = screen.getByTestId('avatar');
    fireEvent.mouseEnter(avatarElement);

    const tooltipContainer = screen.queryByTestId('tooltip-container');
    expect(tooltipContainer).not.toBeInTheDocument();
  });

  it('render avatar with tooltip', () => {
    render(<ProvidedAvatar hasTooltip size='medium' title='User Name' />);

    const avatarElement = screen.getByTestId('avatar');
    fireEvent.mouseEnter(avatarElement);

    const tooltipContainer = screen.getByTestId('tooltip-container');
    expect(tooltipContainer).toBeVisible();
  });

  it('renders avatar with collapsed count', () => {
    const { rerender } = render(
      <ProvidedAvatar
        collapsedCount='+5'
        title='5 users'
        type={AvatarType.Collapsed}
      />
    );

    expect(within(screen.getByTestId('avatar')).getByText('+5')).toBeVisible();

    rerender(
      <ProvidedAvatar
        collapsedCount='+999'
        title='9999 users'
        type={AvatarType.Collapsed}
      />
    );

    expect(within(screen.getByTestId('avatar')).getByText('+99')).toBeVisible();
  });
});
