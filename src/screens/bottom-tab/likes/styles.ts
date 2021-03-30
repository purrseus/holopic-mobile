import { BOTTOM_TAB_HEIGHT } from '@constants';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-bottom: ${BOTTOM_TAB_HEIGHT}px;
`;

export const Heading = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 24px;
  margin: 16px 0px 12px;
  align-self: center;
`;

export const Description = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.darkGray};
  align-self: center;
`;
