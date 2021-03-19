import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@store/store';
import CommonProfile from '@containers/common-profile';
import { getMyPhotos, IPhoto } from '@services/photo';
import { AxiosResponse } from 'axios';

const MyProfileScreen = () => {
  const user = useAppSelector(state => state.user.user);
  const [myPhotos, setMyPhotos] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsError(false);
        const response: AxiosResponse<IPhoto[]> = await getMyPhotos(1);
        setMyPhotos(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
    />
  );
};

export default MyProfileScreen;
