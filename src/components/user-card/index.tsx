import HoloAvatar, { AvatarSize } from '@components/holo-avatar';
import { SizeButton } from '@components/holo-button';
import { followUser, unfollowUser } from '@services/user';
import { commonActions } from '@store/slices/common';
import { useAppDispatch, useAppSelector } from '@store/store';
import theme from '@theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewProps } from 'react-native';
import { Container, Username, FullName, Name, FollowButton } from './styles';

interface Props extends ViewProps {
  uid: string;
  fullName?: string;
  username?: string;
  avatarUrl?: string;
  following?: boolean;
}

const UserCard = ({
  uid,
  fullName,
  username,
  avatarUrl,
  following,
  style,
  ...props
}: Props) => {
  const dispatch = useAppDispatch();
  const userName: string | undefined = useAppSelector(
    state => state.user.user?.profile.username,
  );
  const { t } = useTranslation();
  const [follow, setFollow] = useState<boolean | undefined>(following);

  const _follow = async () => {
    if (follow) {
      try {
        setFollow(false);
        await unfollowUser(uid);
      } catch (error) {
        setFollow(true);
        dispatch(commonActions.showToast({ message: t('commonErrorMessage') }));
      }
      return;
    }

    try {
      setFollow(true);
      await followUser(uid);
    } catch (error) {
      setFollow(false);
      dispatch(commonActions.showToast({ message: t('commonErrorMessage') }));
    }
  };

  return (
    <>
      {!!username && !!userName && (
        <Container style={style} {...props}>
          {/* TODO: Add touchable navigate to user */}
          <HoloAvatar
            size={AvatarSize.SMALL}
            url={avatarUrl}
            fullName={fullName}
            username={username}
          />
          <Name>
            {fullName !== '' ? (
              <>
                <FullName numberOfLines={1} ellipsizeMode="tail">
                  {fullName}
                  {/* issue: fullName too long */}
                </FullName>
                <Username>{`@${username}`}</Username>
              </>
            ) : (
              <FullName>{`@${username}`}</FullName>
            )}
          </Name>

          {userName !== username && (
            // <TouchableWithoutFeedback onPress={_follow}>
            //   <FollowButton>{follow ? 'following' : 'follow'}</FollowButton>
            // </TouchableWithoutFeedback>
            <FollowButton
              size={SizeButton.SMALL}
              titleSize={16}
              titleBold
              title={follow ? 'following' : 'follow'}
              onPress={_follow}
              bgColor={theme.colors.lightBlue2}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default UserCard;
