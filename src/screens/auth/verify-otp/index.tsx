import { HoloScreen } from '@constants';
import { TLoginStackParamsList } from '@navigators/login-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {
  Container,
  BackButton,
  ContentContainer,
  Title,
  Heading,
  SubmitOTPCode,
  ResendOTPCode,
} from './styles';
import theme from '@theme';
import { gradientPreset, SizeButton } from '@components/holo-button';
import { useAppDispatch, useAppSelector } from '@store/store';
import { authActions } from '@store/slices/auth';
import { commonActions } from '@store/slices/common';

type TVerifyOTPScreenRouteProp = RouteProp<
  TLoginStackParamsList,
  HoloScreen.VERIFY_OTP
>;

const VerifyOTPScreen = () => {
  const { t } = useTranslation();
  const [OTPCode, setOTPCode] = useState<string>('');
  const [resendCount, setResendCount] = useState<number>(0);
  const { goBack } = useNavigation();
  const { params }: TVerifyOTPScreenRouteProp = useRoute();
  const { error, phonePrefix } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const _onChangeText = (code: string) => {
    setOTPCode(code);
  };

  const _onFullFill = () => {
    Keyboard.dismiss();
  };

  const _resendOTPCode = () => {
    if (resendCount !== 3) {
      dispatch(
        authActions.verifyPhoneNumberRequest(
          params.phoneNumber.slice(phonePrefix.dialCode.length),
        ),
      );
      dispatch(
        commonActions.showToast({
          message: 'Resending code...',
          duration: 3000,
        }),
      );
      setResendCount(resendCount + 1);
    }
    return;
  };

  const _onSubmitOTPCode = () => {
    dispatch(authActions.verifyOTPCodeRequest(OTPCode));
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => goBack()}>
        <BackButton>
          <Icon name="chevron-left" size={30} />
        </BackButton>
      </TouchableWithoutFeedback>

      <ContentContainer>
        <Title>{t('verification')}</Title>
        <Heading>{t('headingVerifyOTPScreen')}</Heading>
        <Title>{params.phoneNumber}</Title>
      </ContentContainer>

      <SmoothPinCodeInput
        containerStyle={styles.containerCellStyle}
        codeLength={6}
        cellStyle={error ? styles.cellStyleError : styles.cellStyle}
        cellStyleFocused={styles.cellStyleFocused}
        value={OTPCode}
        onTextChange={_onChangeText}
        onFulfill={_onFullFill}
      />

      <ResendOTPCode
        size={SizeButton.SMALL}
        {...(resendCount === 3 && { titleColor: theme.colors.disabled })}
        bgColor={theme.colors.background}
        title={t('resendOTPCodeButton')}
        titleSize={16}
        onPress={_resendOTPCode}
      />

      <SubmitOTPCode
        title={t('login')}
        titleColor={OTPCode.length === 6 ? theme.colors.white : undefined}
        gradient={{ ...gradientPreset }}
        disabled={OTPCode.length !== 6}
        onPress={_onSubmitOTPCode}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  containerCellStyle: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  cellStyleError: {
    borderBottomWidth: 2,
    borderColor: 'red',
  },
  cellStyle: {
    borderBottomWidth: 2,
    borderColor: theme.colors.darkGray,
  },
  cellStyleFocused: {
    borderColor: 'black',
  },
});

export default VerifyOTPScreen;
