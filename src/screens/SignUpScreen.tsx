import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { signUp } from '../services/auth'; // Adjust path if necessary
import { useNavigation } from '@react-navigation/native';
import { SignUpScreenNavigationProp } from '../types/navigation';

const SignUpScreen: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const handleSignUp = async () => {
    await signUp(email, password);
    // Optionally, redirect to SignInScreen or home screen
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signUp.title')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('signUp.email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder={t('signUp.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={t('signUp.signUpButton')} onPress={handleSignUp} />
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.link}>{t('signUp.signInLink')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  link: {
    color: 'blue',
    marginTop: 16,
  },
});

export default SignUpScreen;
