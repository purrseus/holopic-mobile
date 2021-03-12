import 'styled-components';

export type HexColor = string;

interface IHoloAppTheme {
  colors: {
    black: HexColor;
    white: HexColor;
    disabled: HexColor;
    darkGray: HexColor;
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
    disabled: '#cac9c9',
    darkGray: '#666666',
    lightGray: '#efefef',
    lightBlue1: '#7fbfff',
    lightBlue2: '#a1c4fd',
    primary: '#7aa0fa',
  },
};

declare module 'styled-components' {
  export interface DefaultTheme extends IHoloAppTheme {}
}

export default theme;
