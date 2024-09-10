import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from '../styles/HotelScreenStyles'

const HotelScreen: React.FC = () => {
  const { t } = useTranslation();

  // Get translated phrases from the translation files
  const phrases: string[] = t('hotel_check_in', { returnObjects: true });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('hotel_check_in_title')}</Text>
      {phrases.map((phrase, index) => (
        <Text key={index} style={styles.phrase}>{phrase}</Text>
      ))}
    </View>
  );
};

export default HotelScreen;
