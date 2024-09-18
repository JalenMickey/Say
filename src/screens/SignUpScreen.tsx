import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase'; // Update with your Firebase config path
import { useNavigation } from '@react-navigation/native';
import { SignUpScreenNavigationProp } from '../types/navigation';
import { addUserToFirestore } from '../../firebase'; // Import the Firestore function

const SignUpScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  // User input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setError(null); // Clear previous errors
    if (password !== confirmPassword) {
      setError(t('signUp.errorPasswordMismatch'));
      return;
    }

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Add user details to Firestore
      await addUserToFirestore({
        firstName,
        lastName,
        phoneNumber,
        dob,
        email
      });

      // Redirect to sign-in screen
      navigation.navigate('SignIn');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Sign up error:', err);
        setError(t('signUp.errorSignUpFailed'));
      }
    }
  };

  const formatDob = (input: string) => {
    let cleaned = ('' + input).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (match) {
      let formattedDob = match[1];
      if (match[2]) {
        formattedDob += '/' + match[2];
      }
      if (match[3]) {
        formattedDob += '/' + match[3];
      }
      return formattedDob;
    }
    return input;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signUp.title')}</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder={t('signUp.firstName')}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder={t('signUp.lastName')}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder={t('signUp.phoneNumber')}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder={t('signUp.dob')}
        value={dob}
        onChangeText={(text) => setDob(formatDob(text))}
        keyboardType="numeric"
      />
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
      <TextInput
        style={styles.input}
        placeholder={t('signUp.confirmPassword')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default SignUpScreen;
