import styled from 'styled-components/native';

export const MainContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const NavBar = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  height: 48px;
  margin: 0px 16px;
`;

export const Welcome = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 28px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 4px;
`;

export const IconsRight = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.View``;
