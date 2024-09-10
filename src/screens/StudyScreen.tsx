import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StudyScreenNavigationProp } from '../types/navigation'
import styles from '../styles/StudyScreenStyles'

const StudyScreen: React.FC = () => {
  const navigation = useNavigation<StudyScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('select_scenario_title')}</Text>
      <Button
        title={t('hotel_check_in_button')}
        onPress={() => navigation.navigate('Hotel')}
      />
    </View>
  );
};

export default StudyScreen;
