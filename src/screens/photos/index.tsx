import CommonError from '@components/common-error';
import HoloHeader from '@components/holo-header';
import PhotoList from '@components/photos-flat-list';
import { HoloScreen } from '@constants';
import { TAppStackParamsList } from '@navigators/app-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getUserPhotos, IPhoto } from '@services/photo';
import { useAppSelector } from '@store/store';
import React, { useEffect, useState } from 'react';
import { Container } from './styles';

type TPhotosScreenRouteProp = RouteProp<TAppStackParamsList, HoloScreen.PHOTOS>;

interface PhotosState {
  data: IPhoto[];
  loading: boolean;
  error: boolean;
}

const PhotosScreen = () => {
  const {
    params: { uid, photos: totalPhotos },
  } = useRoute<TPhotosScreenRouteProp>();
  const myUid: string | undefined = useAppSelector(
    state => state.user.user?.uid,
  );
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchMorePhotos = async () => {
    if (photos.length === totalPhotos) {
      return;
    }

    try {
      const res = await getUserPhotos(uid, Math.floor(photos.length / 20) + 1);
      setPhotos([...photos, ...res.data]);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserPhotos(uid, 1);
        setPhotos([...res.data]);
      } catch (error) {
        setIsError(true);
      }
    })();
  }, [uid]);

  return (
    <Container>
      <HoloHeader
        showBackButton
        headerTitle={uid === myUid ? 'My photos' : 'Photos'}
      />
      {isError ? (
        <CommonError />
      ) : (
        <PhotoList
          photos={photos}
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchMorePhotos()}
          loading={photos.length !== totalPhotos}
        />
      )}
    </Container>
  );
};

export default PhotosScreen;
