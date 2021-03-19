import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-easy-toast';

import OverlayLoading from '@components/overlay-loading';
import { HoloScreen } from '@constants';
import AuthStack from './auth-stack';
import { useAppDispatch, useAppSelector } from '@store/store';
import { commonActions } from '@store/slices/common';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const RootStack = () => {
  const toastRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const toast = useAppSelector(state => state.common.toast);

  useEffect(() => {
    if (toast.message !== '') {
      toastRef?.current?.show(toast.message, toast.duration || 2000);
      dispatch(commonActions.showToast({ message: '' }));
    }
  }, [dispatch, toast.duration, toast.message]);

  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={HoloScreen.AUTH_STACK} component={AuthStack} />
      </Stack.Navigator>
      <Toast
        ref={toastRef}
        positionValue={180}
        fadeInDuration={200}
        fadeOutDuration={200}
        opacity={0.8}
        //@ts-ignore
        style={styles.toastStyle}
        textStyle={styles.toastText}
      />
      <OverlayLoading />
    </>
  );
};

const styles = StyleSheet.create({
  toastStyle: {
    borderRadius: 99,
    paddingHorizontal: 18,
  },
  toastText: {
    fontFamily: 'Quicksand-Medium',
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
  },
});

export default RootStack;
