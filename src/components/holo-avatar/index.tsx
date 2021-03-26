import { useAppSelector } from '@store/store';
import React from 'react';
import { ViewProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Container, Avatar, StyledText } from './styles';
import { IProfile } from '@services/user';

export enum AvatarSize {
  LARGE = 120,
  SMALL = 50,
}

export interface Props extends ViewProps {
  size: AvatarSize;
  url?: string;
  fullName?: string;
}

const HoloAvatar = ({ size, url, fullName, style }: Props) => {
  const profile: IProfile | undefined = useAppSelector(
    state => state.user.user?.profile,
  );

  return (
    <Container size={size} style={style}>
      {fullName === '' || profile?.avatar.publicId !== '' ? (
        <Avatar
          source={{ uri: url }}
          resizeMode={FastImage.resizeMode.contain}
        />
      ) : (
        <StyledText size={size}>{fullName?.charAt(0).toUpperCase()}</StyledText>
      )}
    </Container>
  );
};

export default HoloAvatar;
