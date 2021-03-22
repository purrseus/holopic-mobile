import React, { useEffect, useRef, useState } from 'react';
import { IPhoto, likePhoto, unlikePhoto } from '@services/photo';
import { Bottom, Photo, PhotoContainer } from './styles';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

interface Props extends Partial<FlatListProps<IPhoto>> {
  photos: IPhoto[];
  loading: boolean;
}

const PhotoComponent = ({
  url,
  publicId,
  liked,
}: Pick<IPhoto, 'url' | 'publicId' | 'liked'>) => {
  const likeAnimation = useRef<any>();
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  const _onLike = async () => {
    if (!isLiked) {
      try {
        likeAnimation.current.play(0, 12);
        await likePhoto(publicId);
        setIsLiked(true);
      } catch (error) {
        likeAnimation.current.reset();
      }
      return;
    }

    try {
      likeAnimation.current.play(0, 0);
      await unlikePhoto(publicId);
      setIsLiked(false);
    } catch (error) {
      likeAnimation.current.play(0, 12);
    }
  };

  useEffect(() => {
    if (liked) {
      likeAnimation.current.play(12, 12);
    }
  }, [liked]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('a');
      }}
    >
      <PhotoContainer>
        <Photo
          source={{ uri: url }}
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

const PhotoList = ({ photos, loading, ...props }: Props) => {
  const _renderItem: ListRenderItem<IPhoto> = ({ item }) => {
    return (
      <PhotoComponent
        url={item.url}
        publicId={item.publicId}
        liked={item.liked}
      />
    );
  };

  return (
    <FlatList
      {...props}
      numColumns={2}
      data={photos}
      renderItem={_renderItem}
      keyExtractor={item => item._id}
      style={styles.flatList}
      ListFooterComponent={
        loading ? (
          <LottieView
            source={require('@assets/animations/loading')}
            style={styles.loading}
            autoPlay
            loop
          />
        ) : (
          <Bottom />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    padding: 4,
  },
  loading: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
  like: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    transform: [{ scale: 1.2 }],
  },
});

export default PhotoList;
