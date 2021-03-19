import HoloAvatar, { AvatarSize } from '@components/holo-avatar';
import { useAppSelector } from '@store/store';
import React from 'react';
import { TouchableWithoutFeedback, ViewProps } from 'react-native';
import { Container, Username, FullName, Name, FollowButton } from './styles';

interface Props extends ViewProps {
  fullName: string;
  username: string;
  avatarUrl: string;
  following?: boolean;
}

const UserCard = ({
  fullName,
  username,
  avatarUrl,
  following,
  style,
  ...props
}: Props) => {
  const userName: string | undefined = useAppSelector(
    state => state.user.user?.profile.username,
  );

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
            <TouchableWithoutFeedback>
              <FollowButton>Follow{following}</FollowButton>
            </TouchableWithoutFeedback>
          )}
        </Container>
      )}
    </>
  );
};

export default UserCard;
