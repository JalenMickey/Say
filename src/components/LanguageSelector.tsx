import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
    const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('select_language')}</Text>
      <View style={styles.pickerContainer}>
        <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => onLanguageChange(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Français" value="fr" />
            <Picker.Item label="Deutsch" value="de" />
            <Picker.Item label="中文" value="zh" />
            <Picker.Item label="日本語" value="ja" />
            <Picker.Item label="العربية" value="ar" />
            <Picker.Item label="हिन्दी" value="hi" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      margin: 20,
      padding: 10,
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
    },
    pickerContainer: {

      borderRadius: 5,
      width: 200, // Fixed width for the container
      height: 200,
      overflow: 'hidden', // Ensure border is applied properly
    },
    picker: {
      height: 50,
      width: '100%', // Ensures picker takes the full width of the container
    },
  });

export default LanguageSelector;
