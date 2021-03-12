import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  ViewProps,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container, LeftButton } from './styles';

interface Props extends ViewProps {
  headerTitle?: string;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  style?: any;
}

const HoloHeader = ({
  headerTitle,
  headerTitleStyle,
  headerLeft,
  headerRight,
  style,
}: Props) => {
  const { goBack } = useNavigation();

  return (
    <Container style={style}>
      <TouchableWithoutFeedback onPress={() => goBack()}>
        <LeftButton>{headerLeft}</LeftButton>
      </TouchableWithoutFeedback>
      <Text
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            fontFamily: 'Quicksand-Bold',
            fontSize: 20,
            lineHeight: 26,
            marginLeft: 5,
          },
          headerTitleStyle,
        ]}
      >
        {headerTitle}
      </Text>
      {headerRight}
    </Container>
  );
};

export default HoloHeader;