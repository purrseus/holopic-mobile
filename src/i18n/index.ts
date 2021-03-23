import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import 'moment/locale/vi';
import enUS from './locales/en-US.json';
import viVN from './locales/vi-VN.json';

i18n.use(initReactI18next).init({
  resources: {
    'en-US': enUS,
    'vi-VN': viVN,
  },
  lng: 'en-US',
  fallbackLng: 'en-US',
  defaultNS: 'translation',
});

export default i18n;
