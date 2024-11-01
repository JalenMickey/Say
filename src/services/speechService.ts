import * as Speech from 'expo-speech';
import i18n from '../i18n'; // Import i18n setup

interface SpeechOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  onDone?: () => void;
  onStart?: () => void;
  onError?: (error: Error) => void;
}

const translateAndSpeak = (key: string, options: SpeechOptions = {}) => {
  // Ensure the correct language is set for translation
  const selectedLanguage = options.language || i18n.language;

  // Translate the key using i18n for the correct language
  const translatedText = i18n.t(key, { lng: selectedLanguage });

  // Call the Speech API to speak the translated text in the selected language
  Speech.speak(translatedText, {
    language: selectedLanguage, // This sets the language for the speech
    pitch: options.pitch || 1.0,
    rate: options.rate || 1.0,
    onDone: options.onDone || (() => console.log('Speech finished')),
    onStart: options.onStart || (() => console.log('Speech started')),
    onError: options.onError || ((error) => console.log('Error with speech:', error)),
  });
};

const stopSpeaking = () => {
  Speech.stop();
};

const isSpeaking = async () => {
  return await Speech.isSpeakingAsync();
};

export default {
  translateAndSpeak,
  stopSpeaking,
  isSpeaking,
};
