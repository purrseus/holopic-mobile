import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import UserCard from '@components/user-card';
import HoloHeader from '@components/holo-header';
import HoloButton from '@components/holo-button';
import { BOTTOM_TAB_HEIGHT } from '@constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledHoloHeader = styled(HoloHeader)`
  margin: 0px 8px;
`;

export const StyledUserCard = styled(UserCard)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Image = styled(FastImage)`
  width: ${Dimensions.get('window').width - 20}px;
  height: ${Dimensions.get('window').width - 20}px;
  border-radius: 20px;
  align-self: center;
`;

export const Form = styled.View`
  margin: 16px 0px;
`;

export const StyledTextInput = styled.TextInput<{ error: any }>`
  border-radius: 16px;
  font-size: 15px;
  padding: 12px;
  margin: 12px 10px;
  background-color: ${({ error, theme }) =>
    error ? theme.colors.red : theme.colors.lightGray};
  ${({ error }) => !!error && 'border-width: 1px; border-color: red;'}
`;

export const UploadButton = styled(HoloButton)`
  margin: 0px 40px;
  margin-bottom: ${BOTTOM_TAB_HEIGHT / 2}px;
`;

export const RemoveButton = styled(HoloButton)`
  margin: 0px 60px;
  margin-bottom: ${BOTTOM_TAB_HEIGHT}px;
`;
