import React from 'react';
import 'react-i18next';
import { SvgProps } from 'react-native-svg';
import enUS from './i18n/locales/en-US.json';
declare module '*.svg' {
  const content: React.FC<SvgProps>;
  export default content;
}
declare module 'react-i18next' {
  type DefaultResources = {
    translation: typeof enUS.translation;
  };
  interface Resources extends DefaultResources {}
}
