import { HoloScreen } from '@constants';
import { RouteProp, useRoute } from '@react-navigation/core';
import React from 'react';
import { TAppStackParamsList } from '@navigators/app-stack';
import PhotoForm from '@containers/photo-form';
import { useTranslation } from 'react-i18next';

type TUploadPhotoScreenRouteProp = RouteProp<
  TAppStackParamsList,
  HoloScreen.UPLOAD_PHOTO
>;

const UploadPhotoScreen = () => {
  const { params } = useRoute<TUploadPhotoScreenRouteProp>();
  const { t } = useTranslation();

  return (
    <PhotoForm
      headerTitle={t('uploadHeaderTitle')}
      photoUrl={params.uri}
      photo={params}
    />
  );
};

export default UploadPhotoScreen;
