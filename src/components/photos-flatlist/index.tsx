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

interface Props extends Partial<FlatListProps<IPhoto>> {
  photos: IPhoto[];
}

const PhotoList = ({ photos, ...props }: Props) => {
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
      keyExtractor={item => item.publicId}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    padding: 4,
  },
});

export default PhotoList;
