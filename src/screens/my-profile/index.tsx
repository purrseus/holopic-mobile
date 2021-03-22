import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import CommonProfile from '@containers/common-profile';
import { getMyPhotos, IPhoto } from '@services/photo';
import { AxiosResponse } from 'axios';
import { userActions } from '@store/slices/user';

const MyProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const [myPhotos, setMyPhotos] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<IPhoto[]> = await getMyPhotos(1);
      dispatch(userActions.getUserRequest());
      setMyPhotos(response.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const fetchMorePhotos = async () => {
    if (myPhotos.length === user?.images) {
      return;
    }

    try {
      const res: AxiosResponse<IPhoto[]> = await getMyPhotos(
        Math.floor(myPhotos.length / 20) + 1,
      );
      setMyPhotos([...myPhotos, ...res.data]);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <CommonProfile
      fullName={user?.profile?.fullName}
      username={user?.profile?.username}
      avatarUrl={user?.profile?.avatar.url}
      followers={user?.followers}
      following={user?.following}
      photos={user?.images}
      location={user?.profile.location}
      bio={user?.profile.bio}
      photoList={myPhotos}
      loading={loading}
      error={isError}
      reload={fetchPhotos}
      loadMore={fetchMorePhotos}
    />
  );
};

export default MyProfileScreen;
