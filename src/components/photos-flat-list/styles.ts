import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { BOTTOM_TAB_HEIGHT } from '@constants';

export const PhotoContainer = styled.View`
  flex: 0.5;
  margin: 3px;
  border-radius: 16px;
`;

export const Photo = styled(FastImage)`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const Bottom = styled.View`
  height: ${BOTTOM_TAB_HEIGHT + 20}px;
`;
