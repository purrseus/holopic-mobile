import { IPhoto } from '@services/photo';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Photo, PhotoContainer } from './styles';
import { useNavigation } from '@react-navigation/native';
import { HoloScreen } from '@constants';

const PhotoComponent = ({ photo }: { photo: IPhoto }) => {
  const { navigate } = useNavigation();

  const url = [...photo.url.split('/')];
  url.splice(-2, 0, 'q_60');

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigate(HoloScreen.PHOTO, { photo });
      }}
    >
      <PhotoContainer>
        <Photo
          source={{ uri: url.join('/') }}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            aspectRatio: 1 / 1,
          }}
        />
      </PhotoContainer>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(PhotoComponent);
