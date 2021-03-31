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

export const DeleteButton = styled(HoloButton)`
  margin: 0px 60px;
  margin-bottom: ${BOTTOM_TAB_HEIGHT}px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const DeleteBottomSheetHeading = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 24px;
  text-align: center;
  margin-bottom: 12px;
`;

export const DeleteBottomSheetDescription = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  text-align: center;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const StyledHoloButton = styled(HoloButton)`
  margin: 0px 32px;
  padding: 0px 12px;
`;
