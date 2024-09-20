// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import HomeScreen from '../screens/HomeScreen';
import StudyScreen from '../screens/StudyScreen';
import HotelScreen from '../screens/HotelScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Header from '../components/Header'; // Your custom header component

export type RootStackParamList = {
  Home: undefined;
  Study: undefined;
  Hotel: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const resetToStudyScreen = (navigation: any) => {
    navigation.reset({
      index: 0, // Makes "Study" the only screen in the stack
      routes: [{ name: 'Study' }],
    });
  };

  const showCustomHeader = (routeName: string) => {
    return !['Home', 'SignIn', 'SignUp'].includes(routeName);
  };

  return (
    <NavigationContainer>
      <I18nextProvider i18n={i18n}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: true, title: 'Home' }}
          />
          <Stack.Screen
            name="Study"
            component={StudyScreen}
            options={({ navigation }) => ({
              title: 'Study',
              headerRight: () => <Header />, // Show sign-out button on Study screen
              headerLeft: () => null, // Disable back button
              // Ensures that users cannot go back to any previous screen
              gestureEnabled: false, // Disable swipe back gesture (iOS)
            })}
          />
          <Stack.Screen
            name="Hotel"
            component={HotelScreen}
            options={({ route }) => ({
              headerRight: () => (showCustomHeader(route.name) ? <Header /> : null),
              title: 'Hotel',
            })}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: true, title: 'Sign In' }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: true, title: 'Sign Up' }}
          />
        </Stack.Navigator>
      </I18nextProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
