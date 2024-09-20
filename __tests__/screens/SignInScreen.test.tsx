import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import SignInScreen from '../../src/screens/SignInScreen';
import { signIn } from '../../src/services/auth';
import '@testing-library/jest-native/extend-expect';

// Mock dependencies
jest.mock('../../src/services/auth');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Simple translation mock
  }),
}));

describe('SignInScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    reset: jest.fn(),
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    jest.clearAllMocks(); // Clear previous mock calls before each test
  });

  afterEach(() => {
    jest.resetAllMocks(); // Reset all mocks after each test
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignInScreen />);
    expect(getByPlaceholderText('signIn.email')).toBeTruthy();
    expect(getByPlaceholderText('signIn.password')).toBeTruthy();
    expect(getByText('signIn.signInButton')).toBeTruthy();
    expect(getByText('signIn.signUpLink')).toBeTruthy();
  });

  it('validates empty fields', async () => {
    const { getByText } = render(<SignInScreen />);
    jest.spyOn(Alert, 'alert');

    fireEvent.press(getByText('signIn.signInButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('signIn.errorTitle', 'signIn.errorMissingFields');
    });
  });

  it('validates email format', async () => {
    const { getByPlaceholderText, getByText } = render(<SignInScreen />);
    jest.spyOn(Alert, 'alert');

    fireEvent.changeText(getByPlaceholderText('signIn.email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('signIn.password'), 'password123');
    fireEvent.press(getByText('signIn.signInButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('signIn.errorTitle', 'signIn.errorInvalidEmail');
    });
  });

  it('validates password strength', async () => {
    const { getByPlaceholderText, getByText } = render(<SignInScreen />);
    jest.spyOn(Alert, 'alert');

    fireEvent.changeText(getByPlaceholderText('signIn.email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('signIn.password'), '123');
    fireEvent.press(getByText('signIn.signInButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('signIn.errorTitle', 'signIn.errorWeakPassword');
    });
  });

  it('navigates to "Study" screen on successful sign-in', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ user: { uid: '123', email: 'test@example.com' } });
    const { getByPlaceholderText, getByText } = render(<SignInScreen />);

    fireEvent.changeText(getByPlaceholderText('signIn.email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('signIn.password'), 'password123');
    fireEvent.press(getByText('signIn.signInButton'));

    await waitFor(() => {
      expect(mockNavigation.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'Study' }],
      });
    });
  });

  it('shows error on failed sign-in', async () => {
    (signIn as jest.Mock).mockRejectedValueOnce(new Error('Sign-in failed'));
    const { getByPlaceholderText, getByText } = render(<SignInScreen />);
    jest.spyOn(Alert, 'alert');

    fireEvent.changeText(getByPlaceholderText('signIn.email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('signIn.password'), 'password123');
    fireEvent.press(getByText('signIn.signInButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('signIn.errorTitle', 'signIn.errorSignInFailed');
    });
  });

  it('navigates to SignUp screen when clicking on sign-up link', () => {
    const { getByText } = render(<SignInScreen />);
    fireEvent.press(getByText('signIn.signUpLink'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SignUp');
  });
});
