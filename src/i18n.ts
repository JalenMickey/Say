import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';

// Import translation files
import enTranslations from './locales/en/translation.json';
import esTranslations from './locales/es/translation.json';
import frTranslations from './locales/fr/translation.json';
import deTranslations from './locales/de/translation.json';
import zhTranslations from './locales/zh/translation.json';
import jaTranslations from './locales/ja/translation.json';
import arTranslations from './locales/ar/translation.json';
import hiTranslations from './locales/hi/translation.json';

i18n
  
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: Platform.OS === 'ios' ? Localization.locale : NativeModules.I18nManager.localeIdentifier, // Set the language based on the device settings
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      de: { translation: deTranslations },
      zh: { translation: zhTranslations },
      ja: { translation: jaTranslations },
      ar: { translation: arTranslations },
      hi: { translation: hiTranslations },
    },
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
    compatibilityJSON: 'v3', // Ensures compatibility with react-i18next
  });

export default i18n;
