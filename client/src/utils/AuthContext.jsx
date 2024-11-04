import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider, firestore } from '../firebase'; // Adjust the path as necessary
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(firestore, firebaseUser.providerData[0].providerId === 'google.com' ? 'google_users' : 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.isActive === false) {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem('user');
          } else {
            const userState = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              isAdmin: userData.isAdmin || false,
              isActive: userData.isActive !== false,
              authMethod: firebaseUser.providerData[0].providerId === 'google.com' ? 'google' : 'email',
              ...userData
            };
            setUser(userState);
            localStorage.setItem('user', JSON.stringify(userState));
          }
        } 
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(firestore, 'users', userCredential.user.uid));
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
  
        if (userData.isActive === false) {
          await signOut(auth);
          throw new Error('Your account has been deactivated. Please contact the administrator.');
        }
  
        const user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          isAdmin: userData.isAdmin || false,
          isActive: true,
          ...userData
        };
  
        setUser(user);
        return user;
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userRef = doc(firestore, 'google_users', user.uid);
      const userSnap = await getDoc(userRef);
      
      let userData;
      if (!userSnap.exists()) {
        userData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          isAdmin: false,
          isActive: true,
          authMethod: 'google'
        };
        await setDoc(userRef, userData);
      } else {
        userData = userSnap.data();
        if (userData.isActive === false) {
          await signOut(auth);
          throw new Error('Your account has been deactivated. Please contact the administrator.');
        }
      }
      
      const userState = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: userData.isAdmin || false,
        isActive: true,
        authMethod: 'google',
        ...userData
      };
  
      setUser(userState);
      localStorage.setItem('user', JSON.stringify(userState));
  
      return userState;
    } catch (error) {
      console.error('Error in loginWithGoogle:', error);
      throw error;
    }
  };

  const register = async (email, password, additionalData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = {
        email: email,
        isAdmin: email === 'admin@arhub.com',
        isActive: true,
        authMethod: 'email',
        ...additionalData
      };
      await setDoc(doc(firestore, 'users', userCredential.user.uid), userData);
      const user = {
        uid: userCredential.user.uid,
        ...userData
      };
      setUser(user);
      return user;
    } catch (error) {
      console.error('Error in register:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error in logout:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};