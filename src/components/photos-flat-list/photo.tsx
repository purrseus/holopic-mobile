import { IPhoto, likePhoto, unlikePhoto } from '@services/photo';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Photo, PhotoContainer } from './styles';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { HoloScreen } from '@constants';

const PhotoComponent = ({ photo }: { photo: IPhoto }) => {
  const likeAnimation = useRef<any>();
  const [isLiked, setIsLiked] = useState<boolean>(photo.liked);
  const { navigate } = useNavigation();

  const url = [...photo.url.split('/')];
  url.splice(-2, 0, 'q_60');

  const _onLike = async () => {
    if (!isLiked) {
      try {
        likeAnimation.current.play(0, 12);
        await likePhoto(photo.publicId);
        setIsLiked(true);
      } catch (error) {
        likeAnimation.current.reset();
      }
      return;
    }

    try {
      likeAnimation.current.play(0, 0);
      await unlikePhoto(photo.publicId);
      setIsLiked(false);
    } catch (error) {
      likeAnimation.current.play(0, 12);
    }
  };

  useEffect(() => {
    if (photo.liked) {
      likeAnimation.current.play(12, 12);
    }
  }, [photo.liked]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigate(HoloScreen.PHOTO, { photo, isLiked });
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
        <TouchableWithoutFeedback onPress={_onLike}>
          <LottieView
            ref={likeAnimation}
            source={require('@assets/animations/like')}
            style={styles.like}
            loop={false}
            speed={1.5}
          />
        </TouchableWithoutFeedback>
      </PhotoContainer>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  like: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    transform: [{ scale: 1.2 }],
  },
});

export default PhotoComponent;
