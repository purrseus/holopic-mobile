import { useAppDispatch, useAppSelector } from '@store/store';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  ContentContainer,
  Title,
  Heading,
  InputContainer,
  PhonePrefixButton,
  Flag,
  DialCode,
  PhoneNumberInput,
  SubmitPhoneNumberButton,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { HoloScreen } from '@constants';
import { authActions } from '@store/slices/auth';
import theme from '@theme';
import { gradientPreset } from '@components/holo-button';
import { useTranslation } from 'react-i18next';

const LoginScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const dispatch = useAppDispatch();
  const { flag, dialCode } = useAppSelector(state => state.auth.phonePrefix);

  const _onChangeText = (text: string) => {
    setPhoneNumber(text);
  };

  return (
    <Container>
      <ContentContainer>
        <Title>{t('welcome')}</Title>
        <Heading>{t('headingLoginScreen')}</Heading>
      </ContentContainer>
      <InputContainer>
        <TouchableWithoutFeedback
          onPress={() => navigate(HoloScreen.COUNTRIES_DIAL_CODE)}
        >
          <PhonePrefixButton>
            <Flag>{flag}</Flag>
            <DialCode>{dialCode}</DialCode>
          </PhonePrefixButton>
        </TouchableWithoutFeedback>

        <PhoneNumberInput
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ fontSize: 18, fontFamily: 'Quicksand-Bold' }}
          placeholder={t('phoneNumber')}
          selectionColor={theme.colors.primary}
          keyboardType="number-pad"
          onChangeText={_onChangeText}
          value={phoneNumber}
          maxLength={15}
          autoFocus
        />
      </InputContainer>
      <SubmitPhoneNumberButton
        title={t('next')}
        titleColor={phoneNumber.length > 0 ? theme.colors.white : undefined}
        gradient={{ ...gradientPreset }}
        rightIcon={
          <Icon
            name="arrowright"
            size={26}
            {...(phoneNumber.length > 0 && { color: theme.colors.white })}
          />
        }
        disabled={phoneNumber.length < 1}
        onPress={async () => {
          dispatch(
            authActions.verifyPhoneNumberRequest(
              phoneNumber.replace(/[^\d]+/g, ''),
            ),
          );
        }}
      />
    </Container>
  );
};

export default LoginScreen;
