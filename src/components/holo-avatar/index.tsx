import React from 'react';
import { ViewProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Container, Avatar, StyledText } from './styles';

export enum AvatarSize {
  LARGE = 120,
  SMALL = 50,
}

export interface Props extends ViewProps {
  size?: AvatarSize;
  url?: string;
  publicId?: string;
  fullName?: string;
  hideDefaultAvatar?: boolean;
}

const HoloAvatar = ({
  size = AvatarSize.SMALL,
  url,
  publicId,
  fullName,
  hideDefaultAvatar = false,
  style,
}: Props) => {
  return (
    <Container size={size} style={style}>
      {hideDefaultAvatar || fullName === '' || publicId !== '' ? (
        <Avatar source={{ uri: url }} resizeMode={FastImage.resizeMode.cover} />
      ) : (
        <StyledText size={size}>{fullName?.charAt(0).toUpperCase()}</StyledText>
      )}
    </Container>
  );
};

export default HoloAvatar;
