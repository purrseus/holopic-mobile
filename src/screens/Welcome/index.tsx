import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppDispatch } from '@store/store';
import { authActions } from '@store/slices/auth';

const WelcomeScreen = () => {
  const dispatch = useAppDispatch();
  const { hideWelcomeScreen } = authActions;

  return (
    <View>
      <Text>WelcomeScreen</Text>
      <Button
        title="Login"
        onPress={() => {
          dispatch(hideWelcomeScreen());
        }}
      />
    </View>
  );
};

export default WelcomeScreen;
