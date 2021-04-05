import React, { useEffect, useState } from 'react';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TAppStackParamsList } from '@navigators/app-stack';
import { HoloScreen } from '@constants';
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
  Icons,
} from './styles';
import { ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '@theme';
import moment from 'moment';
import numeral from 'numeral';
import CommonError from '@components/common/error';
import LikeButton from './like-button';
import { useAppSelector } from '@store/store';

type PhotoScreenRouteProp = RouteProp<TAppStackParamsList, HoloScreen.PHOTO>;

const PhotoScreen = () => {
  const myUid = useAppSelector(state => state.user.user?.uid);
  const { params } = useRoute<PhotoScreenRouteProp>();
  const { goBack, dispatch, navigate } = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [mainPhoto, setMainPhoto] = useState<IPhoto | null>(null);
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await Promise.all([
          getPhoto(params.photo.publicId),
          getUserPhotos(params.photo.user, 1),
          viewPhoto(params.photo.publicId),
        ]);
        setMainPhoto(res[0].data);
        setPhotos(res[1].data);
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
              {myUid === params.photo.user ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigate(HoloScreen.EDIT_PHOTO, {
                      title: mainPhoto?.title,
                      tags: mainPhoto?.tags.join(' '),
                      publicId: mainPhoto?.publicId,
                      photoUrl: mainPhoto?.url,
                    });
                  }}
                >
                  <Icon
                    name="edit"
                    size={24}
                    color={theme.colors.white}
                    style={styles.icon}
                  />
                </TouchableWithoutFeedback>
              ) : (
                <Icon
                  name="ellipsis1"
                  size={24}
                  color={theme.colors.white}
                  style={styles.icon}
                />
              )}
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
              aspectRatio: params.photo.width / params.photo.height,
            }}
          />
        </TouchableWithoutFeedback>

        <PhotoInfo>
          <Content>
            {!!mainPhoto && (
              <Icons>
                <LikeButton photo={mainPhoto} />
                <Icon
                  name="sharealt"
                  size={24}
                  color={theme.colors.darkGray + 'cc'}
                />
              </Icons>
            )}
            <Info>
              <StyledText>
                <BoldText>{numeral(mainPhoto?.likes).format('0a')} </BoldText>
                Likes
              </StyledText>
              <StyledText>
                <BoldText>{numeral(mainPhoto?.views).format('0a')} </BoldText>
                Views
              </StyledText>
              <StyledText>
                {moment(params.photo.createdAt).fromNow()}
              </StyledText>
            </Info>
          </Content>

          <Title>{mainPhoto?.title}</Title>

          <Tags>
            {mainPhoto?.tags.map((tag, index) => (
              <Tag key={index}>#{tag}</Tag>
            ))}
          </Tags>
        </PhotoInfo>

        {isError && <CommonError />}

        {!loading && !isError && !!photos && (
          <>
            <StyledUserCard
              uid={mainPhoto?.userInfo[0].uid}
              fullName={mainPhoto?.userInfo[0].profile.fullName}
              username={mainPhoto?.userInfo[0].profile.username}
              avatarUrl={mainPhoto?.userInfo[0].profile.avatar.url}
              following={mainPhoto?.userInfo[0].isFollowing}
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
