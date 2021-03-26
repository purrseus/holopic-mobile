import React, { useCallback, useEffect, useState } from 'react';
import CommonProfile from '@containers/common-profile';
import { getUserPhotos, IPhoto } from '@services/photo';
import { AxiosResponse } from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TAppStackParamsList } from '@navigators/app-stack';
import { HoloScreen } from '@constants';
import { getUser, IUser } from '@services/user';

type ProfileScreenRouteProp = RouteProp<
  TAppStackParamsList,
  HoloScreen.PROFILE
>;

const ProfileScreen = () => {
  const {
    params: { uid },
  } = useRoute<ProfileScreenRouteProp>();
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchPhotos = useCallback(async () => {
    try {
      const response = await Promise.all([getUserPhotos(uid, 1), getUser(uid)]);
      setPhotos(response[0].data);
      setUser(response[1].data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, [uid]);

  const fetchMorePhotos = async () => {
    if (photos.length === user?.images) {
      return;
    }

    try {
      if (photos.length < 20) {
        return;
      }

      const res: AxiosResponse<IPhoto[]> = await getUserPhotos(
        uid,
        Math.floor(photos.length / 20) + 1,
      );
      setPhotos([...photos, ...res.data]);
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
      photoList={photos}
      loading={loading}
      error={isError}
      reload={fetchPhotos}
      loadMore={fetchMorePhotos}
      uid={user?.uid}
      follow={user?.isFollowing}
    />
  );
};

export default ProfileScreen;
