/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLZ-yv6AZZQoF0mdThXaeD8AidEEgJcxU",
  authDomain: "arhub-f7416.firebaseapp.com",
  projectId: "arhub-f7416",
  storageBucket: "arhub-f7416.appspot.com",
  messagingSenderId: "717820766644",
  appId: "1:717820766644:web:f33b3311e92f74813aaae1",
  measurementId: "G-B1CG7GH3X4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Export the services
export { auth, googleProvider, analytics, firestore , storage };