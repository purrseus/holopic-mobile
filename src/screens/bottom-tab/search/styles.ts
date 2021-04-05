import styled from 'styled-components/native';

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

export const Description = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.darkGray};
  align-self: center;
`;

export const RecentSearches = styled.View`
  border-width: 1px;
  margin-top: 56px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;

export const KeywordContainer = styled.View``;

export const Keyword = styled.Text``;
