import { BOTTOM_TAB_HEIGHT } from '@constants';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const InputContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin: 8px 16px;
  border-radius: 999px;
  flex-direction: row;
  align-items: center;
  padding: 0px 12px;
`;

export const StyledTextInput = styled.TextInput`
  height: 40px;
  flex: 1;
  font-size: 15px;
  margin-left: 4px;
`;

export const SvgContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HeadingSvg = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  align-self: center;
`;

export const Description = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.darkGray};
  align-self: center;
`;

export const SearchBackground = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.darkGray};
`;

export const RecentSearches = styled.View`
  padding: 0px 0px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: ${BOTTOM_TAB_HEIGHT}px;
`;

export const HeaderRecentSearches = styled.View`
  padding: 8px 16px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderTitleRecentSearches = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 18px;
`;

export const ClearKeywordButton = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.lightBlue1};
`;

export const KeywordContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  margin: 4px 0px;
`;

export const Keyword = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  margin-left: 16px;
  flex: 1;
`;

export const ResultContainer = styled.View`
  padding: 8px;
`;

export const ResultTitle = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
`;

export const OverviewPhotos = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 8px 0px;
`;

export const OverviewPhoto = styled(FastImage)`
  width: ${width * 0.3}px;
  height: ${width * 0.3}px;
  margin: 2px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const UsersContainer = styled.View`
  margin: 8px 0px;
`;

export const BottomSpace = styled.View`
  height: ${BOTTOM_TAB_HEIGHT + 20}px;
`;
