import 'styled-components';

export type HexColor = string;

interface IHoloAppTheme {
  colors: {
    black: HexColor;
    white: HexColor;
    disabled: HexColor;
    lightGray: HexColor;
    lightBlue1: HexColor;
    lightBlue2: HexColor;
    primary: HexColor;
  };
}

const theme: IHoloAppTheme = {
  colors: {
    black: '#06060C',
    white: '#FFFFFF',
    disabled: '#979696',
    lightGray: '#eeeeee',
    lightBlue1: '#a1c4fd',
    lightBlue2: '#c2e9fb',
    primary: '#5692e2',
  },
};

declare module 'styled-components' {
  export interface DefaultTheme extends IHoloAppTheme {}
}

export default theme;
