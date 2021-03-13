import { HoloScreen } from '@constants';
import { RouteProp, useRoute } from '@react-navigation/core';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { TAppStackParamsList } from '@navigators/app-stack';

type TUploadPhotoScreenRouteProp = RouteProp<
  TAppStackParamsList,
  HoloScreen.UPLOAD_PHOTO
>;

const UploadPhotoScreen = () => {
  const { params } = useRoute<TUploadPhotoScreenRouteProp>();

  return (
    <View>
      <Text>{params.fileName}</Text>
      <Text>{params.type}</Text>
      <Image source={{ uri: params.uri }} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default UploadPhotoScreen;
