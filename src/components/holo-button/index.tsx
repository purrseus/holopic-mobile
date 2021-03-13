import theme, { HexColor } from '@theme';
import React, { ReactNode } from 'react';
import {
  TouchableWithoutFeedbackProps,
  TouchableWithoutFeedback,
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

interface IGradientPreset {
  colors: string[];
  start: Record<'x' | 'y', number>;
  end: Record<'x' | 'y', number>;
}

export const gradientPreset: IGradientPreset = {
  colors: [theme.colors.lightBlue1, theme.colors.lightBlue2],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};
export interface Props extends TouchableWithoutFeedbackProps {
  size?: SizeButton;
  title: string;
  titleColor?: HexColor;
  titleSize?: number;
  bgColor?: HexColor;
  gradient?: LinearGradientProps;
  shadow?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: any;
}

const HoloButton = ({
  size = SizeButton.MEDIUM,
  title,
  titleColor,
  titleSize,
  bgColor = theme.colors.primary,
  gradient,
  shadow,
  leftIcon,
  rightIcon,
  style,
  disabled,
  ...props
}: Props) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} {...props}>
      <Container {...{ bgColor, shadow, style, size, disabled }}>
        {gradient && !disabled ? (
          <StyledLinearGradient {...gradient}>
            <ContentContainer>
              {leftIcon}
              <Title {...{ titleColor, titleSize }}>{title}</Title>
              {rightIcon}
            </ContentContainer>
          </StyledLinearGradient>
        ) : (
          <ContentContainer>
            {leftIcon}
            <Title {...{ titleColor, titleSize }}>{title}</Title>
            {rightIcon}
          </ContentContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HoloButton;
