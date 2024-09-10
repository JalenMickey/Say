import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation'; // Import navigation types
import LanguageSelector from '../components/LanguageSelector'; // Ensure the correct path
import styles from '../styles/HomeScreenStyles'

const HomeScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLanguageChange = async (language: string) => {
    i18n.changeLanguage(language);
    await AsyncStorage.setItem('language', language);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcome}>{t('welcome')}</Text>
        <LanguageSelector
          selectedLanguage={i18n.language}
          onLanguageChange={handleLanguageChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={t('start')} onPress={() => navigation.navigate('Study')} />
      </View>
    </View>
  );
};

export default HomeScreen;
