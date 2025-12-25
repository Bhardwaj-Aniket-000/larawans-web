import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB-K8QHkOmlBfYr2Lk7gY5hPGQ0GAi8lAg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "larawans-6c8c2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "larawans-6c8c2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "larawans-6c8c2.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "63700272760",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:63700272760:web:f772691f1f18edeef34f8d",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-047K0EY6XE"
};

let app;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log('Firebase Auth persistence enabled');
    })
    .catch((error) => {
      console.error('Error setting persistence:', error);
    });
  
  db = getFirestore(app);
  storage = getStorage(app);
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
  
  console.log('Firebase initialized successfully');
  console.log('Firestore instance:', db ? 'Connected' : 'Not connected');
} catch (error) {
  console.error('Firebase initialization failed:', error);
  console.warn('Using demo mode');
}

export { auth, db, storage, analytics };
export default app;
