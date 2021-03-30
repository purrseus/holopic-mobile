import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import BottomTabBar from './tab-bar';
import { HoloScreen } from '@constants';
import UploadPhotoScreen from '@screens/upload-photo';
import ProfileScreen from '@screens/profile';
import PhotoScreen from '@screens/photo';
import { IPhoto } from '@services/photo';
import FollowScreen, { ScreenName } from '@screens/follow';
import PhotoViewerScreen from '@screens/photo-viewer';
import SettingsScreen from '@screens/setting';
import EditProfileScreen from '@screens/edit-profile';
import EditPhotoScreen from '@screens/edit-photo';

export interface IUploadPhotoParams {
  fileName: string;
  type: string;
  uri: string;
}

export type TAppStackParamsList = {
  [HoloScreen.TAB_BAR]: undefined;
  [HoloScreen.UPLOAD_PHOTO]: IUploadPhotoParams;
  [HoloScreen.PHOTO]: { photo: IPhoto };
  [HoloScreen.PROFILE]: { uid: string };
  [HoloScreen.FOLLOW]: { screenName: ScreenName; follow: number };
  [HoloScreen.PHOTO_VIEWER]: { url: string };
  [HoloScreen.SETTINGS]: undefined;
  [HoloScreen.EDIT_PROFILE]: undefined;
  [HoloScreen.EDIT_PHOTO]: Record<
    'title' | 'tags' | 'publicId' | 'photoUrl',
    string
  >;
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
      <Stack.Screen name={HoloScreen.PHOTO} component={PhotoScreen} />
      <Stack.Screen name={HoloScreen.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={HoloScreen.FOLLOW} component={FollowScreen} />
      <Stack.Screen
        name={HoloScreen.PHOTO_VIEWER}
        component={PhotoViewerScreen}
      />
      <Stack.Screen name={HoloScreen.SETTINGS} component={SettingsScreen} />
      <Stack.Screen
        name={HoloScreen.EDIT_PROFILE}
        component={EditProfileScreen}
      />
      <Stack.Screen name={HoloScreen.EDIT_PHOTO} component={EditPhotoScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
