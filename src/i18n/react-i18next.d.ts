import enUS from './locales/en-US.json';

declare module 'react-i18next' {
  type DefaultResources = {
    translation: typeof enUS.translation;
  };
  interface Resources extends DefaultResources {}
}
