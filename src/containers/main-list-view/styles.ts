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
  padding: 20px 0px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGray};
  margin: 0px 12px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderPost = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 4px 8px;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledAvatar = styled(HoloAvatar)`
  width: 48px;
  height: 48px;
`;

export const Name = styled.View`
  margin-left: 8px;
  justify-content: center;
`;

export const FullName = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 16px;
`;

export const UserName = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Photo = styled(FastImage)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 16px;
`;

export const ContentWrapper = styled.View`
  padding: 0px 4px;
`;

export const Icon = styled.View`
  margin: 8px 8px 8px 0px;
  padding: 2px 8px;
  height: 30px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const PostInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BoldText = styled.Text`
  margin-right: 8px;
  font-family: 'Quicksand-Bold';
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledText = styled.Text`
  font-family: 'Quicksand-Medium';
  line-height: 18px;
  font-size: 14px;
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.black};
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
