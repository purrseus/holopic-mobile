import HoloAvatar from '@components/holo-avatar';
import { BOTTOM_TAB_HEIGHT } from '@constants';
import { IPhoto } from '@services/photo';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const StyledListView = styled(FlatList as new () => FlatList<IPhoto>)`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0px 4px;
`;

export const PostContainer = styled.View`
  padding: 0px 4px 12px;
  margin: 12px 4px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  elevation: 2;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 4px;
  align-self: flex-start;
`;

export const StyledAvatar = styled(HoloAvatar)`
  width: 40px;
  height: 40px;
`;

export const UserName = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 15px;
  margin-left: 8px;
`;

export const Photo = styled(FastImage)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 16px;
`;

export const ContentWrapper = styled.View`
  padding: 0px 4px;
`;

export const Icons = styled.View`
  padding: 8px 0px;
  flex-direction: row;
  align-items: center;
`;

export const PostInfo = styled.View`
  padding: 0px 4px;
  flex-direction: row;
  align-items: center;
`;

export const BoldText = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 8px;
`;

export const Title = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  margin-top: 4px;
  padding: 0px 4px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Tags = styled.View`
  flex-direction: row;
  margin: 4px 0px;
  flex-wrap: wrap;
`;

export const Tag = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  padding: 0px 4px;
  color: ${({ theme }) => theme.colors.lightBlue1};
`;

export const Moment = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 12px;
  padding: 0px 4px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Bottom = styled.View`
  height: ${BOTTOM_TAB_HEIGHT + 20}px;
`;
