// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "nexus-social-8fbc4.firebaseapp.com",
  projectId: "nexus-social-8fbc4",
  storageBucket: "nexus-social-8fbc4.appspot.com",
  messagingSenderId: "831880382027",
  appId: "1:831880382027:web:..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
