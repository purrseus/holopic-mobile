import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { SizeButton } from './index';
import { Props } from './index';

export const Container = styled.View<Partial<Props>>`
  height: ${({ size }) => (size === SizeButton.MEDIUM ? 50 : 40)}px;
  justify-content: center;
  border-radius: 999px;
  background-color: ${({ disabled, bgColor, theme }) =>
    disabled ? theme.colors.disabled : bgColor};
  ${({ shadow }) => shadow && 'elevation: 2;'}
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

export const Title = styled.Text<Partial<Props>>`
  font-family: ${({ titleBold }) =>
    titleBold ? 'Quicksand-Bold' : 'Quicksand-Medium'};
  margin-horizontal: 10px;
  color: ${({ titleColor, theme }) => titleColor || theme.colors.black};
  font-size: ${({ titleSize }) => titleSize || 20}px;
  line-height: 26px;
`;
