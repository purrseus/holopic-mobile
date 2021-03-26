import styled from 'styled-components/native';
import UserCard from '@components/user-card';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledUserCard = styled(UserCard)`
  margin: 8px 12px;
`;

export const Center = styled.View`
  flex-grow: 1;
  justify-content: center;
`;

export const EmptyDescription = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;
