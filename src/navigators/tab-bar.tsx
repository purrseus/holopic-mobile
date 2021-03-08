import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();
const BottomTabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Test"
        component={() => (
          <View>
            <Text>Tab</Text>
          </View>
        )}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
