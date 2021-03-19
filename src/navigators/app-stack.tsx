import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import BottomTabBar from './tab-bar';
import { HoloScreen } from '@constants';
import UploadPhotoScreen from '@screens/upload-photo';
import PhotosScreen from '@screens/photos';

export interface IUploadPhotoParams {
  fileName: string;
  type: string;
  uri: string;
}

export type TAppStackParamsList = {
  [HoloScreen.TAB_BAR]: undefined;
  [HoloScreen.UPLOAD_PHOTO]: IUploadPhotoParams;
  [HoloScreen.PHOTOS]: { uid: string; photos: number };
};

const Stack = createStackNavigator<TAppStackParamsList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}
    >
      <Stack.Screen name={HoloScreen.TAB_BAR} component={BottomTabBar} />
      <Stack.Screen
        name={HoloScreen.UPLOAD_PHOTO}
        component={UploadPhotoScreen}
      />
      <Stack.Screen name={HoloScreen.PHOTOS} component={PhotosScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
