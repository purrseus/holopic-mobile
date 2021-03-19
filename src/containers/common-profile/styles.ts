import styled from 'styled-components/native';
import { BOTTOM_TAB_HEIGHT } from '@constants';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding-bottom: ${BOTTOM_TAB_HEIGHT + 80}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Profile = styled.View`
  padding-bottom: 20px;
`;

export const Content = styled.View`
  align-items: center;
`;

export const FullName = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 28px;
  margin-top: 4px;
`;

export const UserName = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Location = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Bio = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  margin: 10px 60px 0px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Follow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Dot = styled.View`
  background-color: ${({ theme }) => theme.colors.black};
  width: 4px;
  height: 4px;
  margin: 0px 4px;
  border-radius: 999px;
`;

export const FollowButton = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  padding: 4px;
  margin-horizontal: 2px;
`;

export const PhotoListTitle = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledTitle = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 20px;
  flex-grow: 1;
`;

export const Photos = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  line-height: 22px;
  margin-right: 4px;
  align-self: center;
`;

export const PhotoList = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export const Photo = styled(FastImage)`
  width: ${Dimensions.get('window').width / 3 - 8}px;
  height: ${Dimensions.get('window').width / 3 - 8}px;
  margin: 2px;
  border-radius: 12px;
`;

export const EmptyDescription = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const ErrorDescription = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;
