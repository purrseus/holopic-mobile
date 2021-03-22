import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { BACKGROUND_HEIGHT } from './index';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const AvatarBackground = styled.ImageBackground`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AnimatedBackground = Animated.createAnimatedComponent(
  AvatarBackground,
);

const Avatar = styled.View`
  align-self: center;
`;

export const AnimatedAvatar = Animated.createAnimatedComponent(Avatar);

const SmallAvatar = styled.View`
  flex-direction: row;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
`;

export const AnimatedSmallAvatar = Animated.createAnimatedComponent(
  SmallAvatar,
);

export const HeaderName = styled.Text`
  margin-left: 8px;
  font-family: 'Quicksand-Bold';
  font-size: 20px;
  margin-top: 4px;
`;

export const Profile = styled.View`
  padding-bottom: 20px;
  margin-top: ${BACKGROUND_HEIGHT}px;
`;

export const Content = styled.View`
  margin-top: 60px;
  align-items: center;
`;

export const FullName = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 28px;
  margin-top: 4px;
`;

export const UserName = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Location = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Bio = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  margin: 10px 60px 0px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Follow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Dot = styled.View`
  background-color: ${({ theme }) => theme.colors.black};
  width: 4px;
  height: 4px;
  margin: 0px 4px;
  border-radius: 999px;
`;

export const FollowButton = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  padding: 4px;
  margin-horizontal: 2px;
`;

export const PhotoListTitle = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledTitle = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 20px;
  flex-grow: 1;
`;

export const Photos = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 16px;
  line-height: 22px;
  margin-right: 4px;
  align-self: center;
`;

export const EmptyDescription = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;
