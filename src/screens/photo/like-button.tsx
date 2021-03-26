import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import LottieView from 'lottie-react-native';
import { IPhoto, likePhoto, unlikePhoto } from '@services/photo';

const LikeButton = ({ photo }: { photo: IPhoto }) => {
  const likeAnimation = useRef<any>();
  const [isLiked, setIsLiked] = useState<boolean>(photo.liked);

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
    <TouchableWithoutFeedback onPress={_onLike}>
      <LottieView
        ref={likeAnimation}
        source={require('@assets/animations/like')}
        style={styles.like}
        loop={false}
        speed={1.5}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  like: {
    width: 40,
    height: 40,
    marginRight: 16,
    transform: [{ scale: 1.4 }],
  },
});

export default LikeButton;
