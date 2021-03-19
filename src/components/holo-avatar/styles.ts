import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Props } from './index';

export const Container = styled.View<Pick<Props, 'size'>>`
  border-radius: 999px;
  border-width: 1.5px;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-color: ${({ theme }) => theme.colors.lightGray};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const StyledText = styled.Text<Pick<Props, 'size'>>`
  font-family: 'Quicksand-Medium';
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ size }) => size * 0.4}px;
`;

export const Avatar = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 999px;
`;
