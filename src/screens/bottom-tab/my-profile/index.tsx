import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import CommonProfile from '@containers/common-profile';
import { userActions } from '@store/slices/user';
import { photoActions } from '@store/slices/photo';
import { useScrollToTop } from '@react-navigation/native';

const MyProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const { photos, loading, error } = useAppSelector(
    state => state.photo.myPhotos,
  );
  const listRef = useRef(null);

  useScrollToTop(listRef);

  useEffect(() => {
    dispatch(photoActions.getMyPhotosRequest());
  }, [dispatch]);

  return (
    <CommonProfile
      ref={listRef}
      fullName={user?.profile?.fullName}
      username={user?.profile?.username}
      avatarUrl={user?.profile?.avatar.url}
      followers={user?.followers}
      following={user?.following}
      photos={user?.images}
      location={user?.profile.location}
      bio={user?.profile.bio}
      photoList={photos}
      loading={loading}
      error={error}
      reload={() => {
        dispatch(photoActions.getMyPhotosRequest());
        dispatch(userActions.getUserRequest());
      }}
      loadMore={() => {
        dispatch(photoActions.getMoreMyPhotosRequest());
      }}
    />
  );
};

export default MyProfileScreen;
