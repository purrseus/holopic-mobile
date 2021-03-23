import React, { useRef } from 'react';
import { IProfile } from '@services/user';
import {
  Container,
  Profile,
  Content,
  FullName,
  UserName,
  Follow,
  Dot,
  FollowButton,
  Location,
  Bio,
  PhotoListTitle,
  StyledTitle,
  Photos,
  EmptyDescription,
  AnimatedAvatar,
  AnimatedBackground,
  Header,
  HeaderName,
  AnimatedSmallAvatar,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Animated,
  Dimensions,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import HoloAvatar, { AvatarSize } from '@components/holo-avatar';
import numeral from 'numeral';
import { IPhoto } from '@services/photo';
import Empty from '@assets/images/empty.svg';
import CommonError from '@components/common-error';
import PhotoList from '@components/photos-flat-list';
import { useAppSelector } from '@store/store';

export const BACKGROUND_HEIGHT: number = AvatarSize.LARGE + 54;
const BACKGROUND_COLLAPSE_HEIGHT: number = 60;

interface Props extends Partial<IProfile> {
  avatarUrl?: string;
  following?: boolean | number;
  followers?: number;
  photos?: number;
  photoList: IPhoto[];
  loading: boolean;
  error: boolean;
  reload: () => void;
  loadMore: () => void;
}

const CommonProfile = ({
  fullName,
  username,
  avatarUrl,
  bio,
  location,
  followers,
  following,
  photos,
  photoList,
  loading,
  error,
  reload,
  loadMore,
}: Props) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const userName = useAppSelector(state => state.user.user?.profile.username);

  return (
    <Container>
      <AnimatedBackground
        source={{ uri: avatarUrl }}
        blurRadius={4}
        style={{
          height: scrollY.interpolate({
            inputRange: [0, BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT],
            outputRange: [BACKGROUND_HEIGHT, BACKGROUND_COLLAPSE_HEIGHT],
            extrapolate: 'clamp',
          }),
        }}
      >
        <Header>
          <AnimatedSmallAvatar
            style={{
              opacity: scrollY.interpolate({
                inputRange: [
                  0,
                  BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT - 8,
                  BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT,
                ],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp',
              }),
            }}
          >
            <HoloAvatar
              size={AvatarSize.SMALL}
              url={avatarUrl}
              fullName={fullName}
              username={username}
            />
            <HeaderName>{fullName}</HeaderName>
          </AnimatedSmallAvatar>
          {username !== userName ? (
            <Icon name="ellipsis1" size={30} style={styles.iconHeader} />
          ) : (
            <TouchableWithoutFeedback onPress={() => {}}>
              <Icon name="setting" size={28} style={styles.iconHeader} />
            </TouchableWithoutFeedback>
          )}
        </Header>

        <AnimatedAvatar
          style={{
            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [
                    0,
                    BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT,
                  ],
                  outputRange: [1, 0.3],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: scrollY.interpolate({
                  inputRange: [
                    0,
                    BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT,
                  ],
                  outputRange: [60, -60],
                  extrapolate: 'clamp',
                }),
              },
            ],
            opacity: scrollY.interpolate({
              inputRange: [
                0,
                BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT - 40,
              ],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          }}
        >
          <HoloAvatar
            size={AvatarSize.LARGE}
            url={avatarUrl}
            fullName={fullName}
            username={username}
          />
        </AnimatedAvatar>
      </AnimatedBackground>

      <PhotoList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }
        photos={!error ? photoList : []}
        loading={loading}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => loadMore()}
        ListHeaderComponent={
          <>
            <Profile>
              <Content>
                {!!fullName && (
                  <FullName numberOfLines={1}>{fullName}</FullName>
                )}
                <UserName>@{username}</UserName>

                {!!location && (
                  <Location>
                    <Icon name="enviroment" size={14} />
                    {location}
                  </Location>
                )}
                {!!bio && (
                  <TouchableWithoutFeedback>
                    <Bio ellipsizeMode="tail">{bio}</Bio>
                  </TouchableWithoutFeedback>
                )}
                <Follow>
                  <TouchableWithoutFeedback>
                    <FollowButton>
                      {numeral(followers).format('0a')} followers
                    </FollowButton>
                  </TouchableWithoutFeedback>
                  <Dot />
                  <TouchableWithoutFeedback>
                    <FollowButton>
                      {numeral(following).format('0a')} following
                    </FollowButton>
                  </TouchableWithoutFeedback>
                </Follow>
              </Content>
            </Profile>

            <PhotoListTitle>
              <StyledTitle>My photos</StyledTitle>
              <Photos>{numeral(photos).format('0a')}</Photos>
            </PhotoListTitle>

            {error && <CommonError />}

            {photoList.length === 0 && !loading && !error && (
              <>
                <Empty
                  width={Dimensions.get('window').width * 0.5}
                  height={Dimensions.get('window').width * 0.5}
                  style={styles.svg}
                />
                <EmptyDescription>
                  You have not uploaded any photos yet
                </EmptyDescription>
              </>
            )}
          </>
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  iconHeader: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  svg: {
    alignSelf: 'center',
    margin: 20,
  },
  loading: {
    width: 70,
    height: 70,
  },
});

export default React.memo(CommonProfile);
