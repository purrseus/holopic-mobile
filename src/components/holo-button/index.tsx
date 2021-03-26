import React, { ReactNode } from 'react';
import {
  TouchableWithoutFeedbackProps,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradientProps } from 'react-native-linear-gradient';

import theme, { HexColor } from '@theme';
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
  colors: HexColor[];
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
  titleBold?: boolean;
  borderColor?: HexColor;
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
  titleBold,
  borderColor,
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
      <Container {...{ bgColor, borderColor, shadow, style, size, disabled }}>
        {gradient && !disabled ? (
          <StyledLinearGradient {...gradient}>
            <ContentContainer>
              {leftIcon}
              <Title {...{ titleColor, titleSize, titleBold }}>{title}</Title>
              {rightIcon}
            </ContentContainer>
          </StyledLinearGradient>
        ) : (
          <ContentContainer>
            {leftIcon}
            <Title {...{ titleColor, titleSize, titleBold }}>{title}</Title>
            {rightIcon}
          </ContentContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HoloButton;
