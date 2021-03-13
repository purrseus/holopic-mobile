import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import CustomTab from './custom-tab';
import { HoloScreen } from '@constants';
import theme from '@theme';
import { Container } from './styles';
import UploadImageButton from './upload-button';

const CustomBottomTab = ({
  state,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <Container>
      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.HOME)}
        focused={state.routeNames[state.index] === HoloScreen.HOME}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="home"
        iconSize={24}
      />

      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.SEARCH)}
        focused={state.routeNames[state.index] === HoloScreen.SEARCH}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="search1"
        iconSize={24}
      />

      <UploadImageButton />

      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.LIKES)}
        focused={state.routeNames[state.index] === HoloScreen.LIKES}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="hearto"
        iconSize={24}
      />

      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.PROFILE)}
        focused={state.routeNames[state.index] === HoloScreen.PROFILE}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="user"
        iconSize={24}
      />
    </Container>
  );
};

export default CustomBottomTab;
