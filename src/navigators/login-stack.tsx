import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { HoloScreen } from '@constants';
import LoginScreen from '@screens/auth/login';
import CountriesDialCodeScreen from '@screens/auth/countries-dial-code';
import VerifyOTPScreen from '@screens/auth/verify-otp';

export type TLoginStackParamsList = {
  [HoloScreen.LOGIN]: undefined;
  [HoloScreen.COUNTRIES_DIAL_CODE]: undefined;
  [HoloScreen.VERIFY_OTP]: { phoneNumber: string };
};

const Stack = createStackNavigator<TLoginStackParamsList>();

const LoginStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}
    >
      <Stack.Screen name={HoloScreen.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={HoloScreen.COUNTRIES_DIAL_CODE}
        component={CountriesDialCodeScreen}
      />
      <Stack.Screen name={HoloScreen.VERIFY_OTP} component={VerifyOTPScreen} />
    </Stack.Navigator>
  );
};

export default LoginStack;
