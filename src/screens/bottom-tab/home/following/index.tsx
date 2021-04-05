import MainListView from '@containers/main-list-view';
import { useScrollToTop } from '@react-navigation/native';
import { followingPhotoActions } from '@store/slices/following-photo';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { useEffect, useRef } from 'react';
import { Container } from './styles';

const FollowingScreen = () => {
  const dispatch = useAppDispatch();
  const listRef = useRef(null);
  const { full, photos } = useAppSelector(state => state.followingPhoto);
  useScrollToTop(listRef);

  useEffect(() => {
    dispatch(followingPhotoActions.getFollowingPhotosRequest());
  }, [dispatch]);

  return (
    <Container>
      <MainListView
        ref={listRef}
        data={photos}
        loading={!full}
        reload={() => {
          dispatch(followingPhotoActions.getFollowingPhotosRequest());
        }}
        onEndReached={() => {
          if (full) {
            return;
          }
          dispatch(followingPhotoActions.getMoreFollowingPhotosRequest());
        }}
      />
    </Container>
  );
};

export default FollowingScreen;
