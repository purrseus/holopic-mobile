import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import HoloHeader from '@components/holo-header';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledHeader = styled(HoloHeader)`
  background-color: transparent;
  margin: 12px 8px;
  justify-content: space-between;
`;

export const OverlayHeader = styled.View`
  margin-top: -60px;
`;

export const Photo = styled(FastImage)`
  border-radius: 16px;
`;

export const IconsRight = styled.View`
  flex-direction: row;
`;

export const PhotoInfo = styled.View`
  padding: 16px 8px;
`;

export const Info = styled.View`
  flex-direction: row;
`;

export const StyledText = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  padding: 0px 8px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const BoldText = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Title = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 20px;
  margin-top: 12px;
  padding: 0px 8px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Tags = styled.View`
  flex-direction: row;
  margin: 4px;
  flex-wrap: wrap;
`;

export const Tag = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  padding: 0px 4px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const OverviewPhotos = styled.View`
  flex-direction: row;
  padding: 8px;
  justify-content: center;
`;

export const OverviewPhoto = styled(FastImage)`
  width: ${width * 0.31}px;
  height: ${width * 0.31}px;
  margin: 0px 2px;
  border-radius: 12px;
`;

export const Bottom = styled.View`
  height: 60px;
`;
