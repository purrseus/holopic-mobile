import React, { useEffect, useRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { IPhoto, likePhoto, unlikePhoto } from '@services/photo';
import { useAppDispatch } from '@store/store';
import { photoActions } from '@store/slices/photo';

const LikeButton = ({
  photo,
  style,
  text,
  callback,
}: {
  photo: IPhoto;
  style?: StyleProp<ViewStyle>;
  text?: React.ReactNode;
  callback?: () => void;
}) => {
  const likeAnimation = useRef<any>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const _onLike = async () => {
    setDisabled(true);
    if (!isLiked) {
      likeAnimation.current.play(0, 12);
      dispatch(photoActions.likeAPhoto(photo));
      !!callback && callback();
      try {
        await likePhoto(photo.publicId);
        setIsLiked(true);
      } catch (error) {
        likeAnimation.current.reset();
        dispatch(photoActions.unlikeAPhoto(photo));
      }
      setDisabled(false);
      return;
    }

    try {
      likeAnimation.current.play(0, 0);
      dispatch(photoActions.unlikeAPhoto(photo));
      !!callback && callback();
      await unlikePhoto(photo.publicId);
      setIsLiked(false);
    } catch (error) {
      likeAnimation.current.play(0, 12);
      dispatch(photoActions.likeAPhoto(photo));
    }
    setDisabled(false);
  };

  useEffect(() => {
    if (photo.liked) {
      likeAnimation.current.play(12, 12);
    } else {
      likeAnimation.current.play(0, 0);
    }
    setIsLiked(photo.liked);
  }, [photo.liked]);

  return (
    <TouchableWithoutFeedback onPress={_onLike} disabled={disabled}>
      <View style={styles.container}>
        <LottieView
          ref={likeAnimation}
          source={require('@assets/animations/like')}
          style={[styles.like, style]}
          loop={false}
          speed={1.5}
        />
        {text}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  like: {
    width: 32,
    height: 32,
    marginRight: 8,
    transform: [{ scale: 1.4 }],
  },
});

export default LikeButton;
