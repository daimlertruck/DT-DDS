import { withProviders } from '@dt-dds/react-core';
import { render, screen, within, fireEvent } from '@testing-library/react';

import Avatar from './Avatar';
import { AvatarType, AvatarSize } from './constants';
import avatarExampleImage from './images/example-avatar-image.png';

describe('<Avatar /> component', () => {
  const ProvidedAvatar = withProviders(Avatar);

  const sizeStyles: Record<AvatarSize, string> = {
    [AvatarSize.Large]:
      'width: 32px; height: 32px; font-size: 12px; line-height: 16px;',
    [AvatarSize.Medium]:
      'width: 24px; height: 24px; font-size: 10px; line-height: 14px;',
    [AvatarSize.Small]:
      'width: 16px; height: 16px; font-size: 8px; line-height: 10px;',
  };

  const typeStyles: Record<AvatarType, string> = {
    [AvatarType.Primary]: 'color: #FFFFFF;',
    [AvatarType.Secondary]: 'color: #FFFFFF;',
    [AvatarType.Tertiary]: 'color: #000000',
    [AvatarType.Profile]: 'padding: 0px',
  };

  it('renders span html element with the correct content', () => {
    const { container } = render(
      <ProvidedAvatar
        customInitials='AAAAA'
        size={AvatarSize.Medium}
        title='User Name'
        type={AvatarType.Primary}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it.each`
    size
    ${AvatarSize.Large}
    ${AvatarSize.Medium}
    ${AvatarSize.Small}
  `(
    'should render a avatar with image  when size $size',
    ({ size }: { size: AvatarSize }) => {
      const { getByTestId } = render(
        <ProvidedAvatar
          imageSrc={avatarExampleImage}
          size={size}
          title='User Name'
          type={AvatarType.Profile}
        />
      );

      expect(getByTestId('avatar')).toHaveStyle(sizeStyles[size]);
    }
  );

  it.each`
    type
    ${AvatarType.Primary}
    ${AvatarType.Secondary}
    ${AvatarType.Tertiary}
  `(
    'should render a avatar when type $type',
    ({ type }: { type: AvatarType }) => {
      const { getByTestId } = render(
        <ProvidedAvatar
          imageSrc={avatarExampleImage}
          size={AvatarSize.Medium}
          title='User Name'
          type={type}
        />
      );

      expect(getByTestId('avatar')).toHaveStyle(typeStyles[type]);
    }
  );

  it('renders thumbnail image for profile type when imageSrc fails to load', () => {
    render(
      <ProvidedAvatar
        imageSrc=''
        size={AvatarSize.Medium}
        title='User Name'
        type={AvatarType.Profile}
      />
    );

    const thumbnailImage: HTMLImageElement = screen.getByAltText('User Name');
    expect(thumbnailImage).toBeInTheDocument();
  });

  it('renders successfully "avatarExampleImage" for profile type', () => {
    render(
      <ProvidedAvatar
        imageSrc={avatarExampleImage}
        size={AvatarSize.Medium}
        title='User Name'
        type={AvatarType.Profile}
      />
    );

    const thumbnailImage: HTMLImageElement = screen.getByAltText('User Name');
    expect(thumbnailImage).toBeInTheDocument();
    expect(thumbnailImage.src).toContain(avatarExampleImage);
  });

  it('renders avatar with custom initials', () => {
    const { rerender } = render(
      <ProvidedAvatar
        customInitials='AB'
        imageSrc={avatarExampleImage}
        size={AvatarSize.Medium}
        title='User Name'
        type={AvatarType.Primary}
      />
    );

    expect(
      within(screen.getByTestId('avatar')).getByText('AB')
    ).toBeInTheDocument();

    rerender(
      <ProvidedAvatar
        customInitials='ABCCC'
        imageSrc={avatarExampleImage}
        size={AvatarSize.Medium}
        title='User Name'
        type={AvatarType.Primary}
      />
    );

    expect(
      within(screen.getByTestId('avatar')).getByText('AB')
    ).toBeInTheDocument();
  });

  it('renders avatar with tooltip by default', () => {
    render(
      <ProvidedAvatar
        size={AvatarSize.Medium}
        title='User Name'
        type={AvatarType.Primary}
      />
    );

    const avatarElement = screen.getByTestId('avatar');
    fireEvent.mouseEnter(avatarElement);

    const tooltipContainer = screen.getByTestId('tooltip-container');
    expect(tooltipContainer).toBeInTheDocument();
  });

  it('does not render a tooltip when hasTooltip is false', () => {
    render(
      <ProvidedAvatar
        hasTooltip={false}
        size={AvatarSize.Medium}
        title='User Name'
        type={AvatarType.Primary}
      />
    );

    const avatarElement = screen.getByTestId('avatar');
    fireEvent.mouseEnter(avatarElement);

    const tooltipContainer = screen.queryByTestId('tooltip-container');
    expect(tooltipContainer).not.toBeInTheDocument();
  });
});
