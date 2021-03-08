import theme from '@theme';
import React, { ReactNode } from 'react';
import {
  TouchableWithoutFeedbackProps,
  TouchableWithoutFeedback,
  StyleProp,
  TextStyle,
} from 'react-native';
import { LinearGradientProps } from 'react-native-linear-gradient';

import {
  Container,
  StyledLinearGradient,
  ContentContainer,
  Title,
} from './styles';

export enum SizeButton {
  MEDIUM = 'medium',
  SMALL = 'small',
}

interface Props extends TouchableWithoutFeedbackProps {
  size?: SizeButton;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  bgColor?: string;
  gradient?: LinearGradientProps;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const HoloButton = ({
  size = SizeButton.MEDIUM,
  title,
  titleStyle,
  bgColor = theme.colors.primary,
  gradient,
  leftIcon,
  rightIcon,
  style,
  disabled,
  ...props
}: Props) => {
  return (
    <Container {...{ bgColor, style, size, disabled }}>
      <TouchableWithoutFeedback disabled={disabled} {...props}>
        {gradient && !disabled ? (
          <StyledLinearGradient {...gradient}>
            <ContentContainer>
              {leftIcon}
              <Title style={titleStyle}>{title}</Title>
              {rightIcon}
            </ContentContainer>
          </StyledLinearGradient>
        ) : (
          <ContentContainer>
            {leftIcon}
            <Title style={titleStyle}>{title}</Title>
            {rightIcon}
          </ContentContainer>
        )}
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default HoloButton;
