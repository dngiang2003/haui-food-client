import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import Cookies from 'js-cookie';

const languageDefault = Cookies.get('lang') || 'vi';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: languageDefault,
    interpolation: {
      escapeValue: false,
    },
  });
Cookies.set('lang', languageDefault);

export default i18n;
