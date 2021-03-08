import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { SizeButton } from './index';

interface ContainerStyleProps {
  size?: SizeButton;
  disabled?: boolean | null;
  bgColor: string;
}

export const Container = styled.View<ContainerStyleProps>`
  height: ${({ size }) => (size === SizeButton.MEDIUM ? 50 : 40)}px;
  justify-content: center;
  border-radius: 999px;
  background-color: ${({ disabled, bgColor, theme }) =>
    disabled ? theme.colors.disabled : bgColor};
`;

export const StyledLinearGradient = styled(LinearGradient)`
  height: 100%;
  justify-content: center;
  border-radius: 999px;
`;

export const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: '';
  margin-horizontal: 10px;
`;
