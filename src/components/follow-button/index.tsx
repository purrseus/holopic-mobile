import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { commonActions } from '@store/slices/common';
import { gradientPreset, SizeButton } from '@components/holo-button';
import { Follow } from './styles';
import theme from '@theme';
import { useAppDispatch } from '@store/store';
import { followUser, unfollowUser } from '@services/user';

interface Props {
  following?: boolean;
  uid?: string;
}

const FollowButton = ({ following, uid }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [follow, setFollow] = useState<boolean | undefined>(following);

  const _follow = async () => {
    if (follow) {
      try {
        setFollow(false);
        await unfollowUser(uid as string);
      } catch (error) {
        setFollow(true);
        dispatch(commonActions.showToast({ message: t('commonErrorMessage') }));
      }
      return;
    }

    try {
      setFollow(true);
      await followUser(uid as string);
    } catch (error) {
      setFollow(false);
      dispatch(commonActions.showToast({ message: t('commonErrorMessage') }));
    }
  };

  return (
    <Follow
      size={SizeButton.SMALL}
      titleSize={16}
      titleBold={follow}
      title={follow ? ' following ' : ' follow '}
      titleColor={follow ? theme.colors.white : theme.colors.lightBlue1}
      onPress={_follow}
      bgColor={follow ? undefined : theme.colors.white}
      gradient={follow ? gradientPreset : undefined}
      borderColor={!follow ? theme.colors.lightBlue1 : undefined}
    />
  );
};

export default FollowButton;
