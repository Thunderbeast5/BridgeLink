import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAFMBU5ItDCvEz_sE0vGrg1cUJ4admi-gs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bridgelink-677b8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bridgelink-677b8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bridgelink-677b8.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "322497037155",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:322497037155:web:your-app-id"
};

// Initialize Firebase
let app;
let auth;
let db;
let functions;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  functions = getFunctions(app);
} catch (error) {
  console.warn('Firebase initialization failed:', error);
  // Create mock objects for development
  app = null;
  auth = null;
  db = null;
  functions = null;
}

export { auth, db, functions };
export default app;
