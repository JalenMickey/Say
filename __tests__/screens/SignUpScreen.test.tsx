import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase'; // Update with your Firebase config path
import { addUserToFirestore } from '../../firebase'; // Import the Firestore function
import SignUpScreen from '../../src/screens/SignUpScreen';
import '@testing-library/jest-native/extend-expect';
import { useNavigation } from '@react-navigation/native';
import { SignUpScreenNavigationProp } from '../../src/types/navigation';

// Mock dependencies
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
}));
jest.mock('../../firebase', () => ({
  addUserToFirestore: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Simple translation mock
  }),
}));

describe('SignUpScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);
    expect(getByPlaceholderText('signUp.firstName')).toBeTruthy();
    expect(getByPlaceholderText('signUp.lastName')).toBeTruthy();
    expect(getByPlaceholderText('signUp.phoneNumber')).toBeTruthy();
    expect(getByPlaceholderText('signUp.dob')).toBeTruthy();
    expect(getByPlaceholderText('signUp.email')).toBeTruthy();
    expect(getByPlaceholderText('signUp.password')).toBeTruthy();
    expect(getByPlaceholderText('signUp.confirmPassword')).toBeTruthy();
    expect(getByText('signUp.signUpButton')).toBeTruthy();
    expect(getByText('signUp.signInLink')).toBeTruthy();
  });

  it('validates password and confirmation password match', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);
    const errorText = 'signUp.errorPasswordMismatch';

    fireEvent.changeText(getByPlaceholderText('signUp.password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('signUp.confirmPassword'), 'differentPassword');
    fireEvent.press(getByText('signUp.signUpButton'));

    await waitFor(() => {
      expect(getByText(errorText)).toBeTruthy();
    });
  });

  it('creates user and navigates on successful sign-up', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: 'user123' },
    });
    (sendEmailVerification as jest.Mock).mockResolvedValueOnce(undefined);
    (addUserToFirestore as jest.Mock).mockResolvedValueOnce(undefined);

    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

    fireEvent.changeText(getByPlaceholderText('signUp.firstName'), 'John');
    fireEvent.changeText(getByPlaceholderText('signUp.lastName'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('signUp.phoneNumber'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('signUp.dob'), '01/01/2000');
    fireEvent.changeText(getByPlaceholderText('signUp.email'), 'john.doe@example.com');
    fireEvent.changeText(getByPlaceholderText('signUp.password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('signUp.confirmPassword'), 'password123');
    fireEvent.press(getByText('signUp.signUpButton'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('SignIn');
    });
  });

  it('shows error on failed sign-up', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Sign-up failed'));

    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);
    const errorText = 'signUp.errorSignUpFailed';

    fireEvent.changeText(getByPlaceholderText('signUp.email'), 'john.doe@example.com');
    fireEvent.changeText(getByPlaceholderText('signUp.password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('signUp.confirmPassword'), 'password123');
    fireEvent.press(getByText('signUp.signUpButton'));

    await waitFor(() => {
      expect(getByText(errorText)).toBeTruthy();
    });
  });

  it('navigates to SignIn screen when clicking on sign-in link', () => {
    const { getByText } = render(<SignUpScreen />);
    fireEvent.press(getByText('signUp.signInLink'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SignIn');
  });
});
