import React, { createContext, useState, useContext, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQr86KKbbIPqeNE78-X-ODrNTnt6x7M80",
  authDomain: "test1-52d71.firebaseapp.com",
  databaseURL: "https://test1-52d71-default-rtdb.firebaseio.com",
  projectId: "test1-52d71",
  storageBucket: "test1-52d71.appspot.com",
  messagingSenderId: "451217300673",
  appId: "1:451217300673:web:5f7a881c132ce79738c840"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create the Auth context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user (UID)
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  // Function to log in the user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to send a password reset email
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email); // Firebase function to send reset email
  };

  const value = {
    currentUser, // The logged-in user's UID and info
    login,       // Expose the login function
    resetPassword, // Expose the resetPassword function
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
