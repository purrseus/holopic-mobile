// import { IAccount } from '@services/user';
import PhotoList from '@components/photos-flat-list';
import { getNewPhotos, IPhoto } from '@services/photo';
import { userActions } from '@store/slices/user';
import {
  useAppDispatch,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useAppSelector,
} from '@store/store';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  // const user: IAccount | undefined = useAppSelector(state => state.user.user);

  useEffect(() => {
    dispatch(userActions.getUserRequest());
    (async () => {
      try {
        const res = await getNewPhotos(Math.floor(photos.length / 20) + 1);
        setPhotos(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <PhotoList photos={photos} loading={true} />
    </View>
  );
};

export default HomeScreen;
