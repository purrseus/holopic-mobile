import MainListView from '@containers/main-list-view';
import { useScrollToTop } from '@react-navigation/native';
import { newestPhotoActions } from '@store/slices/newest-photo';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { useEffect, useRef } from 'react';
import { Container } from './styles';

const NewestScreen = () => {
  const dispatch = useAppDispatch();
  const listRef = useRef(null);
  const { full, photos } = useAppSelector(state => state.newestPhoto);
  useScrollToTop(listRef);

  useEffect(() => {
    dispatch(newestPhotoActions.getNewestPhotosRequest());
  }, [dispatch]);

  return (
    <Container>
      <MainListView
        ref={listRef}
        data={photos}
        loading={!full}
        reload={() => {
          dispatch(newestPhotoActions.getNewestPhotosRequest());
        }}
        onEndReached={() => {
          if (full) {
            return;
          }
          dispatch(newestPhotoActions.getMoreNewestPhotosRequest());
        }}
      />
    </Container>
  );
};

export default NewestScreen;
