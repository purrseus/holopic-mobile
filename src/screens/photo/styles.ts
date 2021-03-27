import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import HoloHeader from '@components/holo-header';
import { Dimensions } from 'react-native';
import UserCard from '@components/user-card';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledHeader = styled(HoloHeader)`
  background-color: transparent;
  margin: 12px 8px;
  justify-content: space-between;
`;

export const OverlayHeader = styled.View`
  margin-top: -56px;
`;

export const Photo = styled(FastImage)`
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const IconsRight = styled.View`
  flex-direction: row;
`;

export const PhotoInfo = styled.View`
  padding: 16px 8px;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
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
  font-size: 16px;
  margin-top: 4px;
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
  color: ${({ theme }) => theme.colors.lightBlue1};
`;

export const OverviewPhotos = styled.View`
  flex-direction: row;
  margin: 0px 4px;
  justify-content: space-around;
`;

export const OverviewPhoto = styled(FastImage)`
  width: ${width * 0.31}px;
  height: ${width * 0.31}px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const Bottom = styled.View`
  height: 60px;
`;

export const StyledUserCard = styled(UserCard)`
  background-color: ${({ theme }) => theme.colors.background};
`;
