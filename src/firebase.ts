// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAjVccO3gKY9YVHIP6hAZCVFv_9x-RV0Q",
  authDomain: "synergy-b1ef4.firebaseapp.com",
  projectId: "synergy-b1ef4",
  storageBucket: "synergy-b1ef4.firebasestorage.app",
  messagingSenderId: "764168640572",
  appId: "1:764168640572:web:052bf9101ee5f414050b39",
  measurementId: "G-ZMWRYJMCQJ",
  databaseURL: "https://synergy-b1ef4-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
let app;
let analytics;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');

  // Initialize Analytics (only in production and if supported)
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    analytics = getAnalytics(app);
    console.log('Firebase Analytics initialized');
  }

  auth = getAuth(app);
  console.log('Firebase Auth initialized');

  db = getDatabase(app);
  console.log('Realtime Database initialized');

} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { auth, db };