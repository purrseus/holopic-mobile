import { IPhoto } from '@services/photo';
import React, { forwardRef, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Post from './post';
import LottieView from 'lottie-react-native';
import { Bottom, StyledListView } from './styles';
import theme from '@theme';

interface Props<IPhoto> extends Omit<FlatListProps<IPhoto>, 'renderItem'> {
  data: IPhoto[];
  loading: boolean;
  reload: () => void;
}

function MainListView(
  { data, loading, reload, ...props }: Props<IPhoto>,
  ref: React.Ref<FlatList<IPhoto>> | undefined,
) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const _renderItem: ListRenderItem<IPhoto> = ({ item }) => {
    return <Post photo={item} />;
  };

  return (
    <StyledListView
      ref={ref}
      refreshControl={
        <RefreshControl
          colors={[theme.colors.lightBlue1]}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            reload();
            setRefreshing(false);
          }}
        />
      }
      {...props}
      data={data}
      renderItem={_renderItem}
      keyExtractor={item => item.publicId}
      onEndReachedThreshold={0.5}
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
}

const styles = StyleSheet.create({
  loading: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
});

export default forwardRef<FlatList<IPhoto> | null, Props<IPhoto>>(MainListView);
