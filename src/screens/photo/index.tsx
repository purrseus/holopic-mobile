import React, { useEffect, useState } from 'react';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TAppStackParamsList } from '@navigators/app-stack';
import { HoloScreen } from '@constants';
import { getUser, IUser } from '@services/user';
import { getPhoto, getUserPhotos, IPhoto, viewPhoto } from '@services/photo';
import {
  Container,
  OverlayHeader,
  Photo,
  StyledHeader,
  IconsRight,
  PhotoInfo,
  Info,
  StyledText,
  BoldText,
  Title,
  Tag,
  Tags,
  OverviewPhotos,
  OverviewPhoto,
  Bottom,
  Content,
  StyledUserCard,
} from './styles';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '@theme';
import moment from 'moment';
import numeral from 'numeral';
import CommonError from '@components/common-error';
import LikeButton from './like-button';

type PhotoScreenRouteProp = RouteProp<TAppStackParamsList, HoloScreen.PHOTO>;
const { width } = Dimensions.get('window');

const PhotoScreen = () => {
  const { params } = useRoute<PhotoScreenRouteProp>();
  const { goBack, dispatch, navigate } = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [mainPhoto, setMainPhoto] = useState<IPhoto | null>(null);
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await Promise.all([
          getPhoto(params.photo.publicId),
          getUser(params.photo.user),
          getUserPhotos(params.photo.user, 1),
          viewPhoto(params.photo.publicId),
        ]);
        setMainPhoto(res[0].data);
        setUser(res[1].data);
        setPhotos(res[2].data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.photo.user, params.photo.publicId]);

  return (
    <Container>
      <ScrollView stickyHeaderIndices={[0]}>
        <StyledHeader
          showBackButton={false}
          headerLeft={
            <TouchableWithoutFeedback onPress={() => goBack()}>
              <Icon
                name="left"
                size={24}
                color={theme.colors.white}
                style={styles.icon}
              />
            </TouchableWithoutFeedback>
          }
          headerRight={
            <IconsRight>
              <Icon
                name="sharealt"
                size={24}
                color={theme.colors.white}
                style={styles.icon}
              />
              <Icon
                name="ellipsis1"
                size={24}
                color={theme.colors.white}
                style={styles.icon}
              />
            </IconsRight>
          }
        />
        <OverlayHeader />
        <TouchableWithoutFeedback
          onPress={() => {
            navigate(HoloScreen.PHOTO_VIEWER, { url: params.photo.url });
          }}
        >
          <Photo
            source={{ uri: params.photo.url }}
            style={{
              aspectRatio:
                width / params.photo.height / (width / params.photo.width),
            }}
          />
        </TouchableWithoutFeedback>

        <PhotoInfo>
          <Content>
            <Info>
              <StyledText>
                {moment(params.photo.createdAt).fromNow()}
              </StyledText>
              <StyledText>
                <BoldText>{numeral(mainPhoto?.views).format('0a')} </BoldText>
                Views
              </StyledText>
              <StyledText>
                <BoldText>{numeral(mainPhoto?.likes).format('0a')} </BoldText>
                Likes
              </StyledText>
            </Info>

            {!!mainPhoto && <LikeButton photo={mainPhoto} />}
          </Content>

          <Title>{mainPhoto?.title}</Title>

          <Tags>
            {mainPhoto?.tags.map((tag, index) => (
              <Tag key={index}>#{tag}</Tag>
            ))}
          </Tags>
        </PhotoInfo>

        {isError && <CommonError />}

        {!loading && !isError && !!photos && !!user && (
          <>
            <StyledUserCard
              uid={user.uid}
              fullName={user?.profile.fullName}
              username={user?.profile.username}
              avatarUrl={user?.profile.avatar.url}
              following={user?.isFollowing}
            />

            <OverviewPhotos>
              {photos.slice(0, 3).map(photo => (
                <TouchableWithoutFeedback
                  key={photo._id}
                  onPress={() => {
                    dispatch(StackActions.push(HoloScreen.PHOTO, { photo }));
                  }}
                >
                  <OverviewPhoto source={{ uri: photo.url }} />
                </TouchableWithoutFeedback>
              ))}
            </OverviewPhotos>
          </>
        )}
        <Bottom />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 4,
    marginHorizontal: 4,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: theme.colors.darkGray,
    textShadowRadius: 1,
  },
});

export default PhotoScreen;
