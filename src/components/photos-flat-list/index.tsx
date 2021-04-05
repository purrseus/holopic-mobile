import React, { forwardRef } from 'react';
import { IPhoto } from '@services/photo';
import { Bottom } from './styles';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import PhotoComponent from './photo';

interface Props extends Partial<FlatListProps<IPhoto>> {
  photos: IPhoto[];
  loading: boolean;
}

const PhotoList = (
  { photos, loading, ...props }: Props,
  ref: React.LegacyRef<FlatList<IPhoto>> | undefined,
) => {
  const _renderItem: ListRenderItem<IPhoto> = ({ item }) => {
    return <PhotoComponent photo={item} />;
  };

  return (
    <FlatList
      {...props}
      ref={ref}
      numColumns={3}
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
});

export default forwardRef(PhotoList);
