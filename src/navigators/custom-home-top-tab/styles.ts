import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 8px 0px;
`;

export const Tabs = styled.View`
  flex-direction: row;
`;

const Label = styled.Text`
  flex: 1;
  text-align: center;
  font-family: 'Quicksand-Bold';
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
`;

export const AnimatedLabel = Animated.createAnimatedComponent(Label);

const Dot = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 999px;
  margin-top: 4px;
  background-color: ${({ theme }) => theme.colors.lightBlue1};
`;

export const AnimatedDot = Animated.createAnimatedComponent(Dot);
