import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistPartial } from 'redux-persist/es/persistReducer';

import { useAppSelector } from '@store/store';
import { IAuthState } from '@store/slices/auth';
import { AuthStatus } from '@constants';
import AppStack from './app-stack';
import WelcomeScreen from '@screens/Welcome';

const Stack = createStackNavigator();

const Login = () => (
  <View>
    <Text>Login</Text>
  </View>
);

const Loading = () => <View />;

const RootStack = () => {
  const authState: IAuthState & PersistPartial = useAppSelector(
    state => state.auth,
  );

  return (
    <Stack.Navigator headerMode="none">
      {authState.status === AuthStatus.VERIFYING && (
        <Stack.Screen name="Loading" component={Loading} />
      )}

      {authState.status === AuthStatus.FIST_TIME_LOGIN &&
        authState.showWelcomeScreen && (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        )}

      {authState.status === AuthStatus.UNAUTHORIZED && (
        <Stack.Screen name="Login" component={Login} />
      )}

      {authState.status === AuthStatus.LOGGED_IN && (
        <Stack.Screen name="AppStack" component={AppStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
