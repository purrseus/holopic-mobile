import styled from 'styled-components/native';

export const ErrorDescription = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;
