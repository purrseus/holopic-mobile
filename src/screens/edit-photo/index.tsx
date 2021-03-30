import { HoloScreen } from '@constants';
import PhotoForm from '@containers/photo-form';
import { TAppStackParamsList } from '@navigators/app-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import React from 'react';

type EditPhotoScreenRouteProp = RouteProp<
  TAppStackParamsList,
  HoloScreen.EDIT_PHOTO
>;

const EditPhotoScreen = () => {
  const {
    params: { title, tags, publicId, photoUrl },
  } = useRoute<EditPhotoScreenRouteProp>();

  return (
    <PhotoForm
      headerTitle="Edit photo"
      photoUrl={photoUrl}
      photoInfo={{ title, tags }}
      photoId={publicId}
    />
  );
};

export default EditPhotoScreen;
