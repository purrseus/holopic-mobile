import HomeTopTab from '@navigators/home-top-tab';
import { userActions } from '@store/slices/user';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { useEffect } from 'react';
import { Welcome, MainContainer, NavBar, IconsRight, Avatar } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import HoloAvatar, { AvatarSize } from '@components/holo-avatar';
import { useNavigation } from '@react-navigation/native';
import { HoloScreen } from '@constants';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const { navigate } = useNavigation();

  useEffect(() => {
    dispatch(userActions.getUserRequest());
  }, [dispatch]);

  return (
    <MainContainer>
      <NavBar>
        <Welcome>Holopic</Welcome>
        <IconsRight>
          <TouchableWithoutFeedback
            onPress={() => {
              navigate(HoloScreen.SEARCH);
            }}
          >
            <Icon name="search1" size={24} style={styles.search} />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              navigate(HoloScreen.MY_PROFILE);
            }}
          >
            <Avatar>
              <HoloAvatar
                size={AvatarSize.SMALL - 12}
                url={user?.profile.avatar.url}
                fullName={user?.profile.fullName}
              />
            </Avatar>
          </TouchableWithoutFeedback>
        </IconsRight>
      </NavBar>

      <HomeTopTab />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  search: {
    padding: 10,
    marginHorizontal: 8,
  },
});

export default HomeScreen;
