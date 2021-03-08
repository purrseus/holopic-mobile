import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabBar from './tab-bar';
import { HoloScreen } from '@constants';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HoloScreen.TAB_BAR} component={BottomTabBar} />
    </Stack.Navigator>
  );
};

export default AppStack;
