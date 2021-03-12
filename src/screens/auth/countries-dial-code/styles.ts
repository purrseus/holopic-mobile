import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin: 10px 20px;
  padding: 0px 14px;
  border-radius: 999px;
`;

export const SearchCountry = styled.TextInput`
  flex-grow: 1;
  width: 85%;
`;

export const ClearButton = styled.View`
  padding: 4px;
  margin-left: 4px;
`;

export const Countries = styled.FlatList`
  padding: 0px 10px;
`;

export const CountryContainer = styled.View`
  flex-direction: row;
  margin: 10px 6px;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Flag = styled.Text`
  font-size: 34px;
`;

export const Name = styled.View`
  flex-grow: 1;
  width: 70%;
`;

export const CountryName = styled.Text`
  margin: 0px 10px;
  font-family: 'Quicksand-Bold';
  font-size: 16px;
`;

export const CountryCode = styled.Text`
  margin: 0px 10px;
  font-family: 'Quicksand-Medium';
  font-size: 14px;
`;

export const DialCode = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 16px;
`;
