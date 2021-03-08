import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container } from './styles';

const HoloTextInput = () => {
  const handleOnPress = () => {
    console.log('pressed');
  };

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <Container />
    </TouchableWithoutFeedback>
  );
};

export default HoloTextInput;
