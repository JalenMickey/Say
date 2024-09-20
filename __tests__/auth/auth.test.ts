import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust the path as necessary
import { signIn, signUp, logOut } from '../../src/services/auth'; // Your actual auth service functions

// Mock Firebase Auth methods
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  getReactNativePersistence: jest.fn().mockReturnValue(jest.fn()), // Mock persistence for tests
  initializeAuth: jest.fn(),
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock calls before each test
  });

  describe('signUp', () => {
    it('should sign up a user successfully', async () => {
      const mockUser = { user: { uid: '123', email: 'test@example.com' } };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUser);

      const result = await signUp('test@example.com', 'password123');

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
      expect(result).toEqual(mockUser.user);
    });

    it('should throw an error when sign-up fails', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Sign-up failed'));

      await expect(signUp('test@example.com', 'password123')).rejects.toThrow('Sign-up failed');
    });
  });

  describe('signIn', () => {
    it('should sign in a user successfully', async () => {
      const mockUser = { user: { uid: '123', email: 'test@example.com' } };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUser);

      const result = await signIn('test@example.com', 'password123');

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
      expect(result).toEqual(mockUser.user);
    });

    it('should throw an error when sign-in fails', async () => {
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Sign-in failed'));

      await expect(signIn('test@example.com', 'password123')).rejects.toThrow('Sign-in failed');
    });
  });

  describe('logOut', () => {
    it('should log out the user successfully', async () => {
      await logOut();

      expect(signOut).toHaveBeenCalledWith(auth);
    });

    it('should throw an error when log out fails', async () => {
      (signOut as jest.Mock).mockRejectedValueOnce(new Error('Logout failed'));

      await expect(logOut()).rejects.toThrow('Logout failed');
    });
  });
});
