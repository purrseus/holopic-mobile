import CommonEmpty from '@components/common/empty';
import CommonError from '@components/common/error';
import PhotoList from '@components/photos-flat-list';
import { useScrollToTop } from '@react-navigation/native';
import { photoActions } from '@store/slices/photo';
import { useAppDispatch, useAppSelector } from '@store/store';
import theme from '@theme';
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Container, ErrorContainer, Description, Heading } from './styles';
const LikesScreen = () => {
  const { photos, loading, error, full } = useAppSelector(
    state => state.photo.likedPhotos,
  );
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const listRef = useRef(null);

  useScrollToTop(listRef);

  useEffect(() => {
    dispatch(photoActions.getLikedPhotosRequest());
  }, [dispatch]);

  return (
    <Container>
      <Heading>Collection</Heading>
      <Description>Here you can see the photos you liked</Description>

      {!photos.length && typeof error !== 'boolean' && (
        <ErrorContainer>
          <CommonEmpty description="Could not find anything." />
        </ErrorContainer>
      )}

      {error && (
        <ErrorContainer>
          <CommonError />
        </ErrorContainer>
      )}

      {!error && !!photos.length && (
        <PhotoList
          ref={listRef}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.lightBlue1]}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                dispatch(photoActions.getLikedPhotosRequest());
                setRefreshing(false);
              }}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (full || !photos.length) {
              return;
            }
            if (photos.length >= 20) {
              dispatch(photoActions.getMoreLikedPhotosRequest());
            }
          }}
          photos={photos}
          loading={loading}
        />
      )}
    </Container>
  );
};

export default LikesScreen;
