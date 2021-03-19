import React from 'react';
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
  PhotoList,
  Photo,
  EmptyDescription,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import HoloAvatar, { AvatarSize } from '@components/holo-avatar';
import numeral from 'numeral';
import { IPhoto } from '@services/photo';
import FastImage from 'react-native-fast-image';
import Empty from '@assets/images/empty.svg';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { HoloScreen } from '@constants';
import CommonError from '@components/common-error';

interface Props extends Partial<IProfile> {
  uid?: string;
  avatarUrl?: string;
  following?: boolean | number;
  followers?: number;
  photos?: number;
  photoList: IPhoto[];
  loading: boolean;
  error: boolean;
}

const CommonProfile = ({
  uid,
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
}: Props) => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <ScrollView>
        <Profile>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Icon name="ellipsis1" size={30} style={styles.iconHeader} />
          </TouchableWithoutFeedback>

          <Content>
            <HoloAvatar
              size={AvatarSize.LARGE}
              url={avatarUrl}
              fullName={fullName}
              username={username}
            />
            <FullName numberOfLines={1}>{fullName}</FullName>
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

        <TouchableWithoutFeedback
          onPress={() => {
            if (!photos) {
              return;
            }
            navigate(HoloScreen.PHOTOS, { uid, photos });
          }}
        >
          <PhotoListTitle>
            <StyledTitle>My photos</StyledTitle>
            <Photos>{numeral(photos).format('0a')}</Photos>
            <Icon name="right" size={20} />
          </PhotoListTitle>
        </TouchableWithoutFeedback>

        {loading && (
          <Content>
            <LottieView
              source={require('@assets/animations/loading')}
              style={styles.loading}
              autoPlay
              loop
            />
          </Content>
        )}

        {error && <CommonError />}

        {photoList.length > 0 && !loading && !error && (
          <PhotoList>
            {photoList.slice(0, 6).map((photo, index) => {
              return (
                <Photo
                  key={index}
                  source={{ uri: photo.url }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              );
            })}
          </PhotoList>
        )}

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
      </ScrollView>
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

export default CommonProfile;
