import React from 'react';
import { IPhoto } from '@services/photo';
import { Photo, PhotoContainer } from './styles';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

interface Props extends Partial<FlatListProps<IPhoto>> {
  photos: IPhoto[];
  loading: boolean;
}

const PhotoList = ({ photos, loading, ...props }: Props) => {
  const _renderItem: ListRenderItem<IPhoto> = ({ item }) => {
    return (
      <PhotoContainer>
        <Photo
          source={{ uri: item.url }}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            aspectRatio: 1 / 1,
          }}
        />
      </PhotoContainer>
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
        ) : null
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
});

export default PhotoList;
