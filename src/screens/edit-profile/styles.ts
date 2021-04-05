import HoloButton from '@components/holo-button';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledHoloButton = styled(HoloButton)`
  margin: 0px 12px;
  height: 36px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
  align-self: center;
  border-radius: 999px;
  border-width: 1px;
  margin: 16px;
  border-color: ${({ theme }) => theme.colors.lightBlue2};
`;

export const EditIcon = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 8px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.background};
`;

export const EditProfileForm = styled.View`
  flex: 1;
  margin: 0px 12px;
`;

export const Label = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 18px;
  margin: 0px 8px;
`;

export const StyledTextInput = styled.TextInput<{ error: any }>`
  font-family: 'Quicksand-Medium';
  border-radius: 16px;
  font-size: 15px;
  padding: 12px;
  margin: 8px 0px 20px;
  background-color: ${({ error, theme }) =>
    error ? theme.colors.red : theme.colors.lightGray};
  ${({ error }) => !!error && 'border-width: 1px; border-color: red;'}
`;
