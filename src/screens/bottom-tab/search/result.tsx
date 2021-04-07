import CommonEmpty from '@components/common/empty';
import UserCard from '@components/user-card';
import { HoloScreen } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@store/store';
import React from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  ResultContainer,
  ResultTitle,
  OverviewPhoto,
  OverviewPhotos,
  UsersContainer,
  BottomSpace,
} from './styles';

const Result = () => {
  const {
    users: { result: usersResult, error: usersError, loading: usersLoading },
    photos: {
      result: photosResult,
      error: photosError,
      loading: photosLoading,
    },
  } = useAppSelector(state => state.search);
  const { navigate } = useNavigation();

  if (usersLoading || photosLoading) {
    return (
      <ResultContainer>
        <LottieView
          source={require('@assets/animations/loading')}
          style={styles.loading}
          autoPlay
          loop
        />
      </ResultContainer>
    );
  }

  if (
    !usersResult.length &&
    !photosResult.length &&
    typeof usersError === 'undefined' &&
    typeof photosError === 'undefined'
  ) {
    return (
      <ResultContainer>
        <CommonEmpty description="Not Found." />
      </ResultContainer>
    );
  }

  return (
    <ScrollView>
      {!!photosResult.length && !photosLoading && (
        <ResultContainer>
          <ResultTitle>Photos</ResultTitle>
          <OverviewPhotos>
            {photosResult.slice(0, 6).map(photo => (
              <TouchableWithoutFeedback
                key={photo._id}
                onPress={() => {
                  navigate(HoloScreen.PHOTO, { photo });
                }}
              >
                <OverviewPhoto source={{ uri: photo.url }} />
              </TouchableWithoutFeedback>
            ))}
          </OverviewPhotos>
        </ResultContainer>
      )}

      {!!usersResult.length && !usersLoading && (
        <ResultContainer>
          <ResultTitle>Users</ResultTitle>
          <UsersContainer>
            {usersResult.slice(0, 6).map((user, index) => (
              <UserCard
                key={index}
                uid={user.uid}
                fullName={user.profile.fullName}
                username={user.profile.username}
                avatarUrl={user.profile.avatar.url}
                following={user.isFollowing}
              />
            ))}
          </UsersContainer>
        </ResultContainer>
      )}
      <BottomSpace />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading: { width: 60, height: 60, alignSelf: 'center' },
});

export default Result;
