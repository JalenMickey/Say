import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { signIn } from '../services/auth'; // Ensure this is correctly implemented
import { useNavigation } from '@react-navigation/native';
import { SignInScreenNavigationProp } from '../types/navigation';

const SignInScreen: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert(t('signIn.errorTitle'), t('signIn.errorMissingFields'));
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert(t('signIn.errorTitle'), t('signIn.errorInvalidEmail'));
      return;
    }
    if (password.length < 6) {
      Alert.alert(t('signIn.errorTitle'), t('signIn.errorWeakPassword'));
      return;
    }

    try {
      await signIn(email, password);
      // Navigate to HomeScreen on successful sign-in
      navigation.reset({
        index: 0,
        routes: [{ name: 'Study' }],
      });
    } catch (error) {
      Alert.alert(t('signIn.errorTitle'), t('signIn.errorSignInFailed'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signIn.title')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('signIn.email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder={t('signIn.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={t('signIn.signInButton')} onPress={handleSignIn} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>{t('signIn.signUpLink')}</Text>
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

export default SignInScreen;
