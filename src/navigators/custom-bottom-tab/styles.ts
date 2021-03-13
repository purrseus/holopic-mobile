import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: space-around;
  align-items: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const Tab = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
`;

const UploadImageButton = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const AnimatedUploadImageButton = Animated.createAnimatedComponent(
  UploadImageButton,
);

export const StyledLinearGradient = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
`;
