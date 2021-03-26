import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
`;

export const Name = styled.View`
  margin-left: 12px;
  flex-grow: 1;
  justify-content: center;
`;

export const FullName = styled.Text`
  font-family: 'Quicksand-Bold';
  line-height: 19px;
  font-size: 16px;
`;

export const Username = styled.Text`
  font-family: 'Quicksand-Medium';
  line-height: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
`;
