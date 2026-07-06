// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA8P5NXWYLLnn7zTaaTHo2EmZMgKg0hxM",
  authDomain: "nexus-social-88cd4.firebaseapp.com",
  projectId: "nexus-social-88cd4",
  storageBucket: "nexus-social-88cd4.firebasestorage.app",
  messagingSenderId: "831880382027",
  appId: "1:831880382027:web:a6375a8023dc9d972eafce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
