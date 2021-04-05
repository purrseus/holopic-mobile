import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import React from 'react';
import { AnimatedDot, AnimatedLabel, Container, Tabs } from './styles';
import theme from '@theme';

const { width } = Dimensions.get('window');

const CustomHomeTopTab = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const inputRange = state.routes.map((_, i) => i);
  const translateX = Animated.interpolate(position, {
    inputRange,
    outputRange: inputRange.map(i => (i * width) / 2 + width / 4 - 2.5),
  });

  return (
    <Container>
      <Tabs>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const color = Animated.interpolateColors(position, {
            inputRange,
            outputColorRange: inputRange.map(i =>
              i === index ? theme.colors.lightBlue1 : theme.colors.disabled,
            ),
          });

          return (
            <TouchableWithoutFeedback key={index} onPress={onPress}>
              <AnimatedLabel style={{ color }}>{label}</AnimatedLabel>
            </TouchableWithoutFeedback>
          );
        })}
      </Tabs>
      <AnimatedDot style={{ transform: [{ translateX }] }} />
    </Container>
  );
};

export default CustomHomeTopTab;
