import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
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
  padding: 0px 4px;
`;

export const IconsLeft = styled.View`
  flex-direction: row;
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
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
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
  margin-top: 174px;
`;

export const Content = styled.View`
  align-items: center;
  margin-top: 60px;
`;

export const FullName = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 24px;
  margin: 4px 8px 0px;
`;

export const UserName = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  margin: 0px 8px;
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
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 10px 60px 0px;
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

export const FollowButtons = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  padding: 4px;
  margin: 0px 2px 4px;
`;

export const BoldText = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 16px;
`;

export const PhotoListTitle = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
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
