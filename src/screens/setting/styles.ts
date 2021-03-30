import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Options = styled.View`
  flex: 1;
  padding: 0px 8px;
`;

export const Option = styled.View`
  flex-direction: row;
  margin: 4px 8px;
  padding: 16px 8px;
  align-items: center;
`;

export const Label = styled.Text`
  flex: 1;
  margin-left: 12px;
  font-family: 'Quicksand-Bold';
  font-size: 16px;
`;
