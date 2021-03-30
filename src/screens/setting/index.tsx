import HoloHeader from '@components/holo-header';
import { HoloScreen } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { authActions } from '@store/slices/auth';
import { useAppDispatch } from '@store/store';
import React from 'react';
import { Container, Label, Option, Options } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '@theme';
import { TouchableWithoutFeedback } from 'react-native';

interface IOption {
  icon: string;
  label: string;
  onPress: () => void;
}

const SettingsScreen = () => {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();

  const options: IOption[] = [
    {
      icon: 'form',
      label: 'Edit Profile',
      onPress: () => {
        navigate(HoloScreen.EDIT_PROFILE);
      },
    },
    {
      icon: 'logout',
      label: 'Log Out',
      onPress: () => {
        dispatch(authActions.logoutRequest());
      },
    },
  ];
  return (
    <Container>
      <HoloHeader headerTitle="Settings" />

      <Options>
        {options.map((option, index) => (
          <TouchableWithoutFeedback key={index} onPress={option.onPress}>
            <Option>
              <Icon name={option.icon} size={24} color={theme.colors.black} />
              <Label>{option.label}</Label>
              <Icon name="right" size={20} color={theme.colors.darkGray} />
            </Option>
          </TouchableWithoutFeedback>
        ))}
      </Options>
    </Container>
  );
};

export default SettingsScreen;
