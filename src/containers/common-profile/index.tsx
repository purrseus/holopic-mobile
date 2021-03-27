import React, { useRef, useState } from 'react';
import { IProfile } from '@services/user';
import {
  Container,
  Profile,
  Content,
  FullName,
  UserName,
  Follow,
  Dot,
  FollowButtons,
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
  IconsLeft,
  BoldText,
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
import { useNavigation } from '@react-navigation/native';
import FollowButton from '@components/follow-button';
import { HoloScreen } from '@constants';
import { ScreenName } from '@screens/follow';

export const BACKGROUND_HEIGHT: number = AvatarSize.LARGE + 54;
const BACKGROUND_COLLAPSE_HEIGHT: number = 56;

interface Props extends Partial<IProfile> {
  avatarUrl?: string;
  following?: boolean | number;
  followers?: number;
  photos?: number;
  photoList: IPhoto[];
  loading: boolean;
  error?: boolean;
  reload: () => void;
  loadMore: () => void;
  uid?: string;
  follow?: boolean;
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
  follow,
  uid,
}: Props) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { goBack, navigate } = useNavigation();
  const userName = useAppSelector(state => state.user.user?.profile.username);
  const [refresh, setRefresh] = useState<boolean>(false);

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
          <IconsLeft>
            {username !== userName && (
              <TouchableWithoutFeedback
                onPress={() => {
                  goBack();
                }}
              >
                <Icon name="left" size={28} style={styles.back} />
              </TouchableWithoutFeedback>
            )}
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
              />
              <HeaderName>{fullName}</HeaderName>
            </AnimatedSmallAvatar>
          </IconsLeft>

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
          />
        </AnimatedAvatar>
      </AnimatedBackground>

      <PhotoList
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              reload();
              setRefresh(false);
            }}
          />
        }
        photos={!error ? photoList : []}
        loading={loading}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!loading && photoList.length !== photos) {
            loadMore();
          }
        }}
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
                {!!bio && <Bio ellipsizeMode="tail">{bio}</Bio>}
                <Follow>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (username !== userName) {
                        return;
                      }
                      navigate(HoloScreen.FOLLOW, {
                        screenName: ScreenName.FOLLOWERS,
                        follow: followers,
                      });
                    }}
                  >
                    <FollowButtons>
                      <BoldText>{numeral(followers).format('0a')} </BoldText>
                      followers
                    </FollowButtons>
                  </TouchableWithoutFeedback>
                  <Dot />
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (username !== userName) {
                        return;
                      }
                      navigate(HoloScreen.FOLLOW, {
                        screenName: ScreenName.FOLLOWING,
                        follow: following,
                      });
                    }}
                  >
                    <FollowButtons>
                      <BoldText>{numeral(following).format('0a')} </BoldText>
                      following
                    </FollowButtons>
                  </TouchableWithoutFeedback>
                </Follow>

                {typeof follow === 'boolean' && (
                  <FollowButton following={follow} uid={uid} />
                )}
              </Content>
            </Profile>

            <PhotoListTitle>
              <StyledTitle>
                {username === userName ? 'My photos' : 'Photos'}
              </StyledTitle>
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
  back: {
    paddingLeft: 12,
  },
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
