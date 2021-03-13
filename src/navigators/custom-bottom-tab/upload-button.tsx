import theme from '@theme';
import React, { useRef } from 'react';
import { Pressable, Animated } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import Icon from 'react-native-vector-icons/Feather';
import { AnimatedUploadImageButton, StyledLinearGradient } from './styles';

const UploadImageButton = () => {
  const shadowOpt: any = {
    width: 46,
    height: 46,
    color: theme.colors.lightBlue1,
    border: 10,
    radius: 23,
    opacity: 0.4,
    x: 0,
    y: 5,
    style: {
      transform: [{ translateY: -20 }],
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  const scale = useRef(new Animated.Value(1)).current;

  const _onPressIn = () => {
    Animated.timing(scale, {
      toValue: 0.85,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const _onPressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const _onPress = () => {
    console.log('Upload Image');
  };

  return (
    <BoxShadow setting={shadowOpt}>
      <AnimatedUploadImageButton style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={_onPressIn}
          onPressOut={_onPressOut}
          onPress={_onPress}
        >
          <StyledLinearGradient
            colors={[theme.colors.lightBlue1, theme.colors.bluePurple]}
          >
            <Icon name="plus" size={28} color={theme.colors.white} />
          </StyledLinearGradient>
        </Pressable>
      </AnimatedUploadImageButton>
    </BoxShadow>
  );
};

export default UploadImageButton;
