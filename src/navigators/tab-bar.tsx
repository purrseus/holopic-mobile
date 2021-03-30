import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HoloScreen } from '@constants';
import HomeScreen from '@screens/bottom-tab/home';
import CustomBottomTab from './custom-bottom-tab';
import SearchScreen from '@screens/bottom-tab/search';
import MyProfileScreen from '@screens/bottom-tab/my-profile';
import LikesScreen from '@screens/bottom-tab/likes';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Screen name={HoloScreen.HOME} component={HomeScreen} />
      <Tab.Screen name={HoloScreen.SEARCH} component={SearchScreen} />
      <Tab.Screen name={HoloScreen.LIKES} component={LikesScreen} />
      <Tab.Screen name={HoloScreen.MY_PROFILE} component={MyProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
