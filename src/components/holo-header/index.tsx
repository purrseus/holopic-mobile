import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  ViewProps,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container, BackButton } from './styles';
import Icon from 'react-native-vector-icons/Entypo';

interface Props extends ViewProps {
  headerTitle?: string;
  showBackButton?: boolean;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  style?: any;
}

const HoloHeader = ({
  headerTitle,
  showBackButton = true,
  headerTitleStyle,
  headerLeft,
  headerRight,
  style,
}: Props) => {
  const { goBack } = useNavigation();

  return (
    <Container style={style}>
      {showBackButton && (
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <BackButton>
            <Icon name="chevron-left" size={30} />
          </BackButton>
        </TouchableWithoutFeedback>
      )}
      {headerLeft}
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
