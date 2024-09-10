// App.tsx
import 'intl-pluralrules'
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator'; // Import the navigation setup

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
};

export default App;
