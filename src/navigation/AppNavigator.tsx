// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; // Import i18n configuration
import HomeScreen from '../screens/HomeScreen';
import StudyScreen from '../screens/StudyScreen';
import HotelScreen from '../screens/HotelScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

export type RootStackParamList = {
  Home: undefined;
  Study: undefined;
  Hotel: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
      <NavigationContainer>
        <I18nextProvider i18n={i18n}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Study" component={StudyScreen} />
            <Stack.Screen name="Hotel" component={HotelScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        </I18nextProvider>
      </NavigationContainer>
  );
};

export default AppNavigator;
