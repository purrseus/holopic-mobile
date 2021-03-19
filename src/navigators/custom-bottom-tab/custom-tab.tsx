import { HexColor } from '@theme';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Tab } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  onPress: () => void;
  focused: boolean;
  activeTintColor: HexColor;
  inactiveTintColor: HexColor;
  iconName: string;
  iconSize?: number;
}

const CustomTab = ({
  onPress,
  focused,
  activeTintColor,
  inactiveTintColor,
  iconName,
  iconSize,
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Tab {...{ activeTintColor, inactiveTintColor }}>
        <Icon
          name={iconName}
          size={iconSize || 24}
          color={focused ? activeTintColor : inactiveTintColor}
        />
      </Tab>
    </TouchableWithoutFeedback>
  );
};

export default CustomTab;
