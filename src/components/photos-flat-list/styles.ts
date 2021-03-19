import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const PhotoContainer = styled.View`
  flex: 0.5;
  margin: 3px;
  border-radius: 16px;
`;

export const Photo = styled(FastImage)`
  border-radius: 16px;
`;
