import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();
// tab navigator, this file is app STACK
const AppStack = () => {
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

export default AppStack;
