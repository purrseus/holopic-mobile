import { HoloScreen } from '@constants';
import { useNavigation } from '@react-navigation/native';
import LikeButton from '@screens/photo/like-button';
import { IPhoto, viewPhoto } from '@services/photo';
import { useAppSelector } from '@store/store';
import theme from '@theme';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  Icon,
  Photo,
  PostContainer,
  PostInfo,
  HeaderPost,
  StyledAvatar,
  UserContainer,
  Name,
  FullName,
  UserName,
  BoldText,
  StyledText,
  ContentWrapper,
  Title,
  Tags,
  Tag,
  Moment,
} from './styles';

const Post = ({ photo }: { photo: IPhoto }) => {
  const { navigate } = useNavigation();
  const userName = useAppSelector(state => state.user.user?.profile.username);

  return (
    <PostContainer>
      <HeaderPost>
        <TouchableWithoutFeedback
          onPress={() => {
            if (userName === photo.userInfo[0].profile.username) {
              navigate(HoloScreen.TAB_BAR, {
                screen: HoloScreen.MY_PROFILE,
              });
              return;
            }
            navigate(HoloScreen.PROFILE, { uid: photo.userInfo[0].uid });
          }}
        >
          <UserContainer>
            <StyledAvatar
              url={photo.userInfo[0].profile.avatar.url}
              fullName={photo.userInfo[0].profile.fullName}
            />
            <Name>
              {!!photo.userInfo[0].profile.fullName && (
                <FullName>{photo.userInfo[0].profile.fullName}</FullName>
              )}
              <UserName>@{photo.userInfo[0].profile.username}</UserName>
            </Name>
          </UserContainer>
        </TouchableWithoutFeedback>

        <Octicons
          name="kebab-vertical"
          size={24}
          color={theme.colors.darkGray + 'cc'}
        />
      </HeaderPost>

      <TouchableWithoutFeedback
        onPress={async () => {
          navigate(HoloScreen.PHOTO_VIEWER, { url: photo.url });
          await viewPhoto(photo.publicId);
        }}
      >
        <Photo
          source={{ uri: photo.url }}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            aspectRatio:
              photo.width / 2 > photo.height
                ? 4.2 / 3
                : photo.width > photo.height
                ? photo.width / photo.height
                : 3 / 4.2,
          }}
        />
      </TouchableWithoutFeedback>

      <ContentWrapper>
        <PostInfo>
          <PostInfo>
            <Icon>
              <LikeButton
                photo={photo}
                style={styles.like}
                text={
                  <StyledText>{numeral(photo.likes).format('0a')}</StyledText>
                }
              />
            </Icon>

            <Icon>
              <AntIcons
                name="eye"
                size={16}
                color={theme.colors.darkGray + 'cc'}
              />
              <StyledText>{numeral(photo.views).format('0a')}</StyledText>
            </Icon>
          </PostInfo>
          <AntIcons
            name="sharealt"
            size={22}
            color={theme.colors.darkGray + 'cc'}
          />
        </PostInfo>

        <Title>
          <BoldText>@{`${photo.userInfo[0].profile.username}  `}</BoldText>
          {photo.title}
        </Title>

        <Tags>
          {photo.tags.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </Tags>

        <Moment>{moment(photo.createdAt).fromNow()}</Moment>
      </ContentWrapper>
    </PostContainer>
  );
};

const styles = StyleSheet.create({
  like: {
    width: 22,
    height: 22,
    marginRight: -1,
  },
});

export default React.memo(Post);
