jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('firebase/auth', () => {
  return {
      ...jest.requireActual('firebase/auth'), // Keep other functions intact
      getReactNativePersistence: jest.fn().mockReturnValue(jest.fn()), // Mock to return a function
      initializeAuth: jest.fn(), // Mock initializeAuth
      createUserWithEmailAndPassword: jest.fn(), // Mock these functions as needed
      signInWithEmailAndPassword: jest.fn(),
      signOut: jest.fn(),
  };
});
