import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABaZ8Yl-G-gBEPXLUgUlyHu9X2obZ1SzU",
  authDomain: "say-fe5eb.firebaseapp.com",
  projectId: "say-fe5eb",
  storageBucket: "say-fe5eb.appspot.com",
  messagingSenderId: "1083572195071",
  appId: "1:1083572195071:android:f89d7ebfbff531f553c6ca",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Function to add user details to Firestore
export const addUserToFirestore = async (userData: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: string; // Changed dob to a single string
  email: string;
}) => {
  if (!auth.currentUser) throw new Error('User not authenticated');

  const userRef = doc(db, 'users', auth.currentUser.uid);
  await setDoc(userRef, userData);
};

// Export the Firebase services you plan to use
export { auth, db, app };
