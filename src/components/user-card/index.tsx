import FollowButton from '@components/follow-button';
import HoloAvatar, { AvatarSize } from '@components/holo-avatar';
import { HoloScreen } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@store/store';
import React from 'react';
import { TouchableWithoutFeedback, ViewProps } from 'react-native';
import { Container, Username, FullName, Name } from './styles';

interface Props extends ViewProps {
  uid?: string;
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
  const { navigate } = useNavigation();
  const userName: string | undefined = useAppSelector(
    state => state.user.user?.profile.username,
  );

  return (
    <>
      {!!username && !!userName && (
        <TouchableWithoutFeedback
          onPress={() => {
            if (userName === username) {
              navigate(HoloScreen.TAB_BAR, {
                screen: HoloScreen.MY_PROFILE,
              });
              return;
            }
            navigate(HoloScreen.PROFILE, { uid });
          }}
        >
          <Container style={style} {...props}>
            <HoloAvatar
              size={AvatarSize.SMALL}
              url={avatarUrl}
              fullName={fullName}
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
                <FullName numberOfLines={1} ellipsizeMode="tail">
                  {`@${username}`}
                </FullName>
              )}
            </Name>

            {userName !== username && (
              <FollowButton following={following} uid={uid} />
            )}
          </Container>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default UserCard;
