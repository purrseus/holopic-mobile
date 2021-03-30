import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 4px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BackButton = styled.View`
  padding: 12px 8px;
`;
