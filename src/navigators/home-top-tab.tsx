import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import NewestScreen from '@screens/bottom-tab/home/newest';
import FollowingScreen from '@screens/bottom-tab/home/following';
import CustomHomeTopTab from './custom-home-top-tab';
import { HoloScreen } from '@constants';

const TopTab = createMaterialTopTabNavigator();

const HomeTopTab = () => {
  return (
    <TopTab.Navigator
      tabBar={(props: MaterialTopTabBarProps) => (
        <CustomHomeTopTab {...props} />
      )}
    >
      <TopTab.Screen name={HoloScreen.NEWEST} component={NewestScreen} />
      <TopTab.Screen name={HoloScreen.FOLLOWING} component={FollowingScreen} />
    </TopTab.Navigator>
  );
};

export default HomeTopTab;
