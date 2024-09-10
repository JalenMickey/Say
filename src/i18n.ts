import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import enTranslations from './locales/en/translation.json';
import esTranslations from './locales/es/translation.json';
import frTranslations from './locales/fr/translation.json';
import deTranslations from './locales/de/translation.json';
import zhTranslations from './locales/zh/translation.json';
import jaTranslations from './locales/ja/translation.json';
import arTranslations from './locales/ar/translation.json';
import hiTranslations from './locales/hi/translation.json';

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  zh: { translation: zhTranslations },
  ja: { translation: jaTranslations },
  ar: { translation: arTranslations },
  hi: { translation: hiTranslations },
};

const initI18n = async () => {
  // Retrieve saved language or default to device language
  const savedLanguage = await AsyncStorage.getItem('language');
  const locales = Localization.getLocales();
  const initialLanguage = savedLanguage || (locales.length > 0 ? locales[0].languageCode : 'en');

  // Ensure 'initialLanguage' is a string
  if (!initialLanguage) {
    throw new Error('Initial language must be a valid string');
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLanguage as string, // Cast to string
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      react: { useSuspense: false }
    } as any); // Cast to any to bypass TypeScript errors
};

initI18n();

export default i18n;
