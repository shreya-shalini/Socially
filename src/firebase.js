import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDOYAs4dTl6ljqulBjiFlsAEb6GaJyM_yw",
  authDomain: "socially2-9daac.firebaseapp.com",
  projectId: "socially2-9daac",
  storageBucket: "socially2-9daac.appspot.com",
  messagingSenderId: "966534345869",
  appId: "1:966534345869:web:6d89a6521f4686c2df5ec4",
  measurementId: "G-CDE1SW968Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const storage = getStorage();
export const db = getFirestore(app);
