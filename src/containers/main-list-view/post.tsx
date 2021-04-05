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
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Icons,
  Photo,
  PostContainer,
  PostInfo,
  StyledAvatar,
  UserContainer,
  UserName,
  BoldText,
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
      <TouchableWithoutFeedback
        onPress={() => {
          if (userName === photo.userInfo[0].profile.username) {
            navigate(HoloScreen.TAB_BAR, {
              screen: HoloScreen.MY_PROFILE,
            });
            return;
          }
          navigate(HoloScreen.PROFILE, { user: photo.userInfo[0] });
        }}
      >
        <UserContainer>
          <StyledAvatar
            url={photo.userInfo[0].profile.avatar.url}
            fullName={photo.userInfo[0].profile.fullName}
          />
          <UserName>@{photo.userInfo[0].profile.username}</UserName>
        </UserContainer>
      </TouchableWithoutFeedback>

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
            aspectRatio: photo.width * 1.5 >= photo.height ? 1 / 1 : 3 / 4.2,
          }}
        />
      </TouchableWithoutFeedback>

      <ContentWrapper>
        <Icons>
          <LikeButton photo={photo} style={styles.like} />
          <Icon
            name="sharealt"
            size={24}
            color={theme.colors.darkGray + 'cc'}
          />
        </Icons>

        <PostInfo>
          <BoldText>{numeral(photo.likes).format('0a')} likes</BoldText>
          <BoldText>{numeral(photo.views).format('0a')} views</BoldText>
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
    width: 30,
    height: 30,
    marginRight: 16,
  },
});

export default React.memo(Post);
