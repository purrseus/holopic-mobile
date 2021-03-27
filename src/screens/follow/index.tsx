import HoloHeader from '@components/holo-header';
import { HoloScreen } from '@constants';
import { TAppStackParamsList } from '@navigators/app-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getFollowers, getFollowing, IUser } from '@services/user';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { Container, StyledUserCard, Center, EmptyDescription } from './styles';
import LottieView from 'lottie-react-native';
import CommonError from '@components/common-error';
import Void from '@assets/images/void.svg';

export enum ScreenName {
  FOLLOWING = 'Following',
  FOLLOWERS = 'Followers',
}

type FollowScreenRouteProp = RouteProp<TAppStackParamsList, HoloScreen.FOLLOW>;

interface IFollowState {
  list: IUser[];
  loading: boolean;
  error: boolean;
}

const FollowScreen = () => {
  const {
    params: { screenName, follow },
  } = useRoute<FollowScreenRouteProp>();
  const [followList, setFollowList] = useState<IFollowState>({
    list: [],
    loading: false,
    error: false,
  });

  const _fetchFollowList = useCallback(async () => {
    const getFollow =
      screenName === ScreenName.FOLLOWERS ? getFollowers : getFollowing;
    try {
      setFollowList(prevState => {
        return { ...prevState, loading: true };
      });

      const response = await getFollow(1);
      setFollowList(prevState => {
        return { ...prevState, list: response.data };
      });
    } catch (error) {
      setFollowList(prevState => {
        return { ...prevState, error: true };
      });
    } finally {
      setFollowList(prevState => {
        return { ...prevState, loading: false };
      });
    }
  }, [screenName]);

  const _fetchMoreFollowList = async () => {
    const getFollow =
      screenName === ScreenName.FOLLOWERS ? getFollowers : getFollowing;
    try {
      setFollowList(prevState => {
        return { ...prevState, loading: true };
      });

      const response = await getFollow(
        Math.floor(followList.list.length / 20) + 1,
      );
      setFollowList(prevState => {
        return { ...prevState, list: [...prevState.list, ...response.data] };
      });
    } catch (error) {
      setFollowList(prevState => {
        return { ...prevState, error: true };
      });
    } finally {
      setFollowList(prevState => {
        return { ...prevState, loading: false };
      });
    }
  };

  const _renderItem: ListRenderItem<IUser> = ({ item }) => {
    return (
      <StyledUserCard
        uid={item.uid}
        fullName={item.profile.fullName}
        username={item.profile.username}
        avatarUrl={item.profile.avatar.url}
        following={item.isFollowing}
      />
    );
  };

  useEffect(() => {
    _fetchFollowList();
  }, [_fetchFollowList]);

  return (
    <Container>
      <HoloHeader headerTitle={screenName} />

      {followList.error && (
        <Center>
          <CommonError />
        </Center>
      )}

      {!followList.loading && !followList.list.length && (
        <Center>
          <Void
            width={Dimensions.get('window').width * 0.5}
            height={Dimensions.get('window').width * 0.5}
            style={styles.empty}
          />
          <EmptyDescription>Nothing here</EmptyDescription>
        </Center>
      )}

      {!followList.error && !followList.loading && !!followList.list.length && (
        <FlatList
          data={followList.list}
          renderItem={_renderItem}
          keyExtractor={item => item.uid}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!followList.loading && followList.list.length < follow) {
              _fetchMoreFollowList();
            }
          }}
          ListFooterComponent={
            followList.loading ? (
              <LottieView
                source={require('@assets/animations/loading')}
                style={styles.loading}
                autoPlay
                loop
              />
            ) : null
          }
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  loading: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
  empty: {
    alignSelf: 'center',
    marginBottom: 32,
  },
});

export default FollowScreen;
